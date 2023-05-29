import { sendData, dataObjects } from './api.js'
import { MAX_PRICE, MIN_PRICE, START_ADDRESS_AVATAR } from './constants.js'
import { setStartCoordinats, removeMarkerPopup, addMarkersToMaps } from './map.js'
import { initSlider, resetValueSlider } from './range.js'
import './upload.js'
import { showSuccess, showErrorPopup } from './util.js'
import { filterData } from './filters.js'
// сброс превью формы НАЧАЛО
const cleanPreview = () => {
  // находим элементы загрузки аватара и фото
  const avatar = document.querySelector('.ad-form-header__preview img')
  const photoPreview = document.querySelector('.ad-form__photo img')
  // очищаем  превью картинок
  avatar.src = START_ADDRESS_AVATAR
  if (photoPreview) {
    photoPreview.remove()
  }
}
// сброс превью формы КОНЕЦ

// валидирование полей формы, инициация Pristine. НАЧАЛО
const defaultConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'message-error',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'message-error',
  // type of element to create for the error text
  errorTextTag: 'div'
}

const complianceHostingPrice = [
  ['palace', MAX_PRICE],
  ['flat', MIN_PRICE],
  ['house', 5000],
  ['bungalow', 0],
  ['hotel', 3000]
]
const guestsRoomRatioOption = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
}
const messagesCapacity = {
  0: 'не бронируется для гостей',
  1: 'невозможно забронировать для 1 гостя',
  2: 'невозможно забронировать для 2 гостей',
  3: 'невозможно забронировать для 3 гостей',
  100: 'не бронируется для гостей'
}
const adForm = document.querySelector('.ad-form')
const mapFiltersForm = document.querySelector('.map__filters')
const pristineAdForm = new Pristine(adForm, defaultConfig)
const price = adForm.querySelector('input[name="price"]')
const typeHosting = adForm.querySelector('select[name="type"]')
const timein = adForm.querySelector('select[name="timein"]')
const timeout = adForm.querySelector('select[name="timeout"]')
const rooms = adForm.querySelector('[name="rooms"]')
const capacity = adForm.querySelector('[name="capacity"]')

// изменение типа жилья приводит к изменению плэйсхолдера мин-прайс
const getSelectedHousingType = _ => complianceHostingPrice.find(i => typeHosting.value === i[0])

typeHosting.addEventListener('change', () => {
  const housingPrice = getSelectedHousingType()
  if (housingPrice !== undefined) {
    price.placeholder = housingPrice[1]
    pristineAdForm.validate(price)
  }
})
// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:

const validateComplianceTypeHostMinPrice = (value) => {
  const housingType = getSelectedHousingType()
  return housingType !== undefined && value >= housingType[1]
}

// функция получения сообщения об ошибке по типу жилья
const getErrorComplainceHostPrice = () => {
  const housingType = getSelectedHousingType()
  if (housingType !== undefined) {
    return `Минимальная стоимость не меньше ${housingType[1]}`
  } else {
    return 'Неизвестный тип жилья' // Не должны попасть сюда никогда
  }
}

pristineAdForm.addValidator(
  price,
  validateComplianceTypeHostMinPrice,
  getErrorComplainceHostPrice,
  1,
  false)

// валидация поля price
const validateFieldPrice = (value) => {
  return value <= MAX_PRICE
}
pristineAdForm.addValidator(price, validateFieldPrice, 'цена должна быть меньше 100000 рублей', 3, false)

// валидация price на тип число
const validateFieldPriceTypeNumber = (value) => {
  const arr = value.split('')
  const flag = arr.every(i => /^(0|[1-9]\d*)$/.test(i))

  return flag
}
pristineAdForm.addValidator(price, validateFieldPriceTypeNumber, 'это должно быть целое число', 2, false)

// Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля во втором выделяется соответствующее ему значение.
timein.addEventListener('change', () => {
  timeout.value = timein.value
})
timeout.addEventListener('change', () => {
  timein.value = timeout.value
})
//  Поле «Количество комнат» синхронизировано с полем «Количество мест»
const getGuestsRoomRatio = () => {
  return guestsRoomRatioOption[rooms.value].includes(capacity.value)
}

// функция получения текста ошибки по соответствию количества комнат и гостей

const getRoomCapacityRatioErrorMessage = () => {
  let str = ''
  guestsRoomRatioOption[rooms.value].forEach(() => {
    if (!getGuestsRoomRatio()) {
      str = messagesCapacity[capacity.value]
    }
  })
  return str
}

rooms.addEventListener('change', () => {
  getRoomCapacityRatioErrorMessage()
  pristineAdForm.validate(capacity)
})

pristineAdForm.addValidator(rooms, getGuestsRoomRatio, '', 2, false)
pristineAdForm.addValidator(capacity, getGuestsRoomRatio, getRoomCapacityRatioErrorMessage, 1, false)
// валидирование полей формы, инициация Pristine. КОНЕЦ

// функции блокировки И разблокировки кнопки при отправке
const submitButton = document.querySelector('.ad-form__submit')
const blockSubmitButton = () => {
  submitButton.disabled = true
  submitButton.textContent = 'Сохраняю...'
}

const unblockSubmitButton = () => {
  submitButton.disabled = false
  submitButton.textContent = 'Опубликовать'
}

// функция отправки формы
const setUploadFormSubmit = (success) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const isValid = pristineAdForm.validate()
    const formdata = new FormData(evt.target)

    if (isValid) {
      blockSubmitButton()
      // собираем данные в форму и отправляем на сервер
      sendData(
        () => {
          success()
          showSuccess()
          unblockSubmitButton()
        },
        () => {
          showErrorPopup()
          unblockSubmitButton()
        },
        formdata)
      // очистка полей формы, слайдера, превью, координат, закрытие балуна, очистка формы фильтров и перерисовка меток
      adForm.reset()
      mapFiltersForm.reset()
      addMarkersToMaps(filterData(dataObjects))
      setStartCoordinats()
      cleanPreview()
      resetValueSlider()
      removeMarkerPopup()
      pristineAdForm.reset()
      //
    } else {
      evt.preventDefault()
    }
  })
}

const resetButton = document.querySelector('.ad-form__reset')

// хэндлер для сброса данных формы
resetButton.addEventListener('click', () => {
  mapFiltersForm.reset()
  addMarkersToMaps(filterData(dataObjects))
  setStartCoordinats()
  cleanPreview()
  resetValueSlider()
  removeMarkerPopup()
  pristineAdForm.reset()
})

// setUploadFormSubmit(setStartCoordinats);
initSlider(_ => pristineAdForm.validate(price))

export { setUploadFormSubmit }
