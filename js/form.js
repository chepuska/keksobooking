import { sendData } from './api.js'
import { setStartCoordinats } from './map.js'
import { initSlider, resetValueSlider } from './range.js'
import './upload.js'
import { showSuccess, showErrorPopup } from './util.js'

// сброс всех значений из полей формы НАЧАЛО
const resetValuesInForm = () => {
  // сброс значения поля заголовка заголовка
  const titleArticle = adForm.querySelector('input[name="title"]')
  titleArticle.value = ''
  typeHosting.value = 'flat'
  price.value = 0
  // сброс значений features
  featuresCheckbox.forEach(i => {
    if (i.checked === true) {
      i.checked = false
    }
  })
  // сброс на исходное timein
  const timeinOption = timein.querySelectorAll('option')

  timeinOption.forEach(option => {
    if (option.value !== 12 && option.selected) {
      option.selected = false
    }
  })
  // timeout
  const timeoutOption = timeout.querySelectorAll('option')
  timeoutOption.forEach(option => {
    if (option.value !== 12 && option.selected) {
      option.selected = false
    }
  })
  // находим элементы загрузки аватара и фото
  const avatar = document.querySelector('.ad-form-header__preview img')
  const photoPreview = document.querySelector('.ad-form__photo img')
  const uploadAvatarElement = document.querySelector('.ad-form-header__input')
  const uploadImgElement = document.querySelector('.ad-form__input')
  // очищаем поля загрузки файлов и превью картинок
  uploadAvatarElement.value = ''
  avatar.src = 'img/muffin-grey.svg'
  uploadImgElement.value = ''
  if (photoPreview) {
    photoPreview.remove()
  }
  // rooms
  const roomsOption = rooms.querySelectorAll('option')
  roomsOption.forEach(option => {
    if (option.selected && option.value !== 1) {
      option.selected = false
    }
  })
  // capacity
  const capacityOption = capacity.querySelectorAll('option')
  capacityOption.forEach(option => {
    if (option.selected && option.value !== 3) {
      option.selected = false
    }
  })
  // description
  const description = adForm.querySelector('textarea[name="description"]')
  description.value = ''
}
// сброс всех значений из полей формы КОНЕЦ

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
  ['palace', 'дворца', 10000],
  ['flat', 'квартиры', 1000],
  ['house', 'дома', 5000],
  ['bungalow', 'бунгало', 0],
  ['hotel', 'отеля', 3000]
]
const guestsRoomRatioOption = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
}
const adForm = document.querySelector('.ad-form')
const pristineAdForm = new Pristine(adForm, defaultConfig)
const price = adForm.querySelector('input[name="price"]')
const typeHosting = adForm.querySelector('select[name="type"]')
const timein = adForm.querySelector('select[name="timein"]')
const timeout = adForm.querySelector('select[name="timeout"]')
const rooms = adForm.querySelector('[name="rooms"]')
const capacity = adForm.querySelector('[name="capacity"]')
const featuresCheckbox = adForm.querySelectorAll('input[name="feature"]')

// изменение типа жилья приводит к изменению плэйсхолдера мин-прайс
const getSelectedHousingType = _ => complianceHostingPrice.find(i => typeHosting.value === i[0])

typeHosting.addEventListener('change', () => {
  const housingPrice = getSelectedHousingType()
  if (housingPrice !== undefined) {
    price.placeholder = housingPrice[2]
    price.min = housingPrice[2]
    pristineAdForm.validate()
  }
})
// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:

const validateComplianceTypeHostMinPrice = (value) => {
  const housingType = getSelectedHousingType()
  return housingType !== undefined && value >= housingType[2]
}

// функция получения сообщения об ошибке по типу жилья
const getErrorComplainceHostPrice = () => {
  const housingType = getSelectedHousingType()
  if (housingType !== undefined) {
    return `Минимальная стоимость ${housingType[1]} не меньше ${housingType[2]}`
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
  return value <= 100000
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
  guestsRoomRatioOption[rooms.value].filter(i => {
    if (i !== capacity.value) {
      if (capacity.value === 1) {
        str = 'невозможно забронировать для 1 гостя'
      }
      if (capacity.value === 2 || capacity.value === 3) {
        str = `невозможно забронировать для ${capacity.value} гостей`
      }
      if (capacity.value !== 0 && rooms.value !== 100) {
        str = 'не бронируется для гостей'
      }
    } else {
      str = ''
    }
    return str
  })

  return str
}

rooms.addEventListener('change', () => {
  getRoomCapacityRatioErrorMessage()
  pristineAdForm.validate()
})

pristineAdForm.addValidator(rooms, getGuestsRoomRatio, '', 2, false)
pristineAdForm.addValidator(capacity, getGuestsRoomRatio, getRoomCapacityRatioErrorMessage, 1, false)
// валидирование полей формы, инициация Pristine. КОНЕЦ

// функции блокировки И разблокировки кнопки при отправке
const submitButton = document.querySelector('.ad-form__submit')
const onBlockSubmitButton = () => {
  submitButton.disabled = true
  submitButton.textContent = 'Сохраняю...'
}

const onUnblockSubmitButton = () => {
  submitButton.disabled = false
  submitButton.textContent = 'Опубликовать'
}

// функция отправки формы
const setUploadFormSubmit = (success) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const isValidate = pristineAdForm.validate()
    const formdata = new FormData(evt.target)

    if (isValidate) {
      onBlockSubmitButton()
      // собираем данные в форму и отправляем на сервер
      sendData(
        () => {
          success()
          showSuccess()
          onUnblockSubmitButton()
          // сброс всех значений формы и карты
          resetValueSlider()
          resetValuesInForm()
        },
        () => {
          showErrorPopup()
          onUnblockSubmitButton()
        },
        formdata)
    } else {
      evt.preventDefault()
      pristineAdForm.validate()
    }
  })
}

const resetButton = document.querySelector('.ad-form__reset')

// хэндлер для сброса данных формы
resetButton.addEventListener('click', () => {
  // сброс координат на исходные
  setStartCoordinats()
  // обнуление слайдера
  resetValueSlider()
  // сброс на исходные всех инпутов формы
  resetValuesInForm()
})
// setUploadFormSubmit(setStartCoordinats);
initSlider(pristineAdForm.validate)

export { setUploadFormSubmit }
