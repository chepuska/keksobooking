import { sendData } from "./api.js"
import {setStartCoordinats} from './map.js'
import { initSlider, resetValueSlider} from './range.js';
import './upload.js'
import { showSuccess, showErrorPopup, showAlert } from "./util.js"
//валидирование полей формы, инициация Pristine. Начало
const defaultConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'ad-form__element',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'has-danger'
}

const adForm = document.querySelector('.ad-form')

const pristineAdForm = new Pristine(adForm, defaultConfig)

const price = adForm.querySelector('input[name="price"]')
const typeHosting = adForm.querySelector('select[name="type"]')
const timein = adForm.querySelector('select[name="timein"]')
const timeout = adForm.querySelector('select[name="timeout"]')
// features__checkbox
const rooms = adForm.querySelector('[name="rooms"]')
const capacity = adForm.querySelector('[name="capacity"]')
const featuresCheckbox =adForm.querySelectorAll('input[name="feature"]')
// изменение типа жилья приводит к изменению плэйсхолдера мин-прайс
typeHosting.addEventListener('change', (evt) => {

  complianceHostingPrice.filter(i => {
    if (typeHosting.value === i[0]) {
      price.placeholder = i[2]
      price.min = i[2]
      pristineAdForm.validate()
    }
  })
})
// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
const complianceHostingPrice = [
  ['palace', 'дворца', 10000],
  ['flat', 'квартиры', 1000],
  ['house', 'дома', 5000],
  ['bungalow', 'бунгало', 0],
  ['hotel', 'отеля', 3000]
]

function validateComplianceTypeHostMinPrice (value) {
  const typeHosting = document.querySelector('#type').value
  let flag = true
  complianceHostingPrice.filter(i => {
    if (typeHosting === i[0] && value < i[2]) {
      flag = false
    }
  })
  return flag
}
function getErrorComplainceHostPrice () {
  const typeHosting = document.querySelector('#type').value
  let message = ''
  complianceHostingPrice.filter(i => {
    if (typeHosting === i[0]) {
      message = `Минимальная стоимость ${i[1]} не меньше ${i[2]}`
    }
  })
  return message
}

pristineAdForm.addValidator(
  price,
  validateComplianceTypeHostMinPrice,
  getErrorComplainceHostPrice,
  1,
  false)

// валидация поля price
function validateFieldPrice (value) {
  return value <= 100000
}
pristineAdForm.addValidator(price, validateFieldPrice, 'цена должна быть меньше 100000 рублей', 3, false)

// валидация price на тип число
function validateFieldPriceTypeNumber (value) {
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
//  Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;guests
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей». под ограничениями подразумевается валидация.

const guestsRoomRatioOption = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
}
function getGuestsRoomRatio () {
  return guestsRoomRatioOption[rooms.value].includes(capacity.value)
}

function getRoomCapacityRatioErrorMessage () {
  let str = ''
  guestsRoomRatioOption[rooms.value].filter(i => {
    if (i != capacity.value) {
      if (capacity.value == 1) {
        console.log(i)
        str = 'невозможно забронировать для 1 гостя'
      }
      if (capacity.value == 2 || capacity.value == 3) {
        str = `невозможно забронировать для ${capacity.value} гостей`
      }
      if(capacity.value!==0 && rooms.value!==100){
        str=`не бронируется для гостей`
      }  
    }else{
      str=''
    }
    return str
  })

  return str
}

rooms.addEventListener('change', () => {
  getRoomCapacityRatioErrorMessage
  pristineAdForm.validate()
})

pristineAdForm.addValidator(rooms, getGuestsRoomRatio, '', 2, false)
pristineAdForm.addValidator(capacity, getGuestsRoomRatio, getRoomCapacityRatioErrorMessage, 1, false)
//валидирование полей формы, инициация Pristine. Конец

//функции блокировки кнопки при отправке
const submitButton =document.querySelector('.ad-form__submit');
function onBlockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
}

function onUnblockSubmitButton (){
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

//функция отправки формы
function setUploadFormSubmit (success) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    
    const isValidate = pristineAdForm.validate()
    const formdata = new FormData(evt.target)
    if (isValidate) {
      onBlockSubmitButton()
      console.log('валидация прошла ' + isValidate)
      //собираем данные в форму и отправляем на сервер
      sendData(
        () => {
          success()
          showSuccess()
          onUnblockSubmitButton()
          //сброс всех значений формы и карты
          setStartCoordinats()
          resetValueSlider()
          resetValuesInForm()
        },
        () => {
          showErrorPopup()
          onUnblockSubmitButton()
        },
        formdata)
    }else{
      showErrorPopup()
    }
  })
}

setUploadFormSubmit(setStartCoordinats)



// функция сброса значений полей формы до начальных значений. Начало.


const resetButton =document.querySelector('.ad-form__reset')
console.log(resetButton);
//хэндлер для сброса данных формы
resetButton.addEventListener('click', () =>{
  //сброс координат на исходные
  setStartCoordinats()
  //обнуление слайдера
  resetValueSlider()
  //сброс на исходные всех инпутов формы
  resetValuesInForm()
})

function resetValuesInForm(){
  // 35.68950, 139.69200
  //сброс значения поля заголовка заголовка
  const titleArticle =adForm.querySelector('input[name="title"]')
  titleArticle.value = ''
  typeHosting.value = 'flat'
  price.value = 0
  //сброс значений features
  featuresCheckbox.forEach(i=>{
    if(i.checked === true){
      i.checked =false
    }
  })
 
  
  
  // сброс на исходное timein
  const timeinOption =timein.querySelectorAll('option')

  timeinOption.forEach(option=>{
    if(option.value!=12 && option.selected){
      option.selected = false
    }
  })
  // timeout
  const timeoutOption =timeout.querySelectorAll('option')
  timeoutOption.forEach(option=>{
    if(option.value!=12 && option.selected){
      option.selected = false
    }
  })

//находим элементы загрузки аватара и фото
  const avatar = document.querySelector('.ad-form-header__preview img')
  const photoPreview = document.querySelector('.ad-form__photo img')
  const uploadAvatarElement = document.querySelector('.ad-form-header__input')
  const uploadImgElement =document.querySelector('.ad-form__input')
  // очищаем поля загрузки файлов и превью картинок
  uploadAvatarElement.value =''
  avatar.src = 'img/muffin-grey.svg'
  uploadImgElement.value =''
  if(photoPreview){
    photoPreview.remove()
  }
  

  // rooms
  const roomsOption  =rooms.querySelectorAll('option')
  roomsOption.forEach(option=>{
    if(option.selected && option.value!=1){
      option.selected = false
    }
  })
  // capacity
  const capacityOption =capacity.querySelectorAll('option')
  capacityOption.forEach(option=>{
    if(option.selected && option.value!==3){
      option.selected = false
    }
  })
  //description
  const description =adForm.querySelector('textarea[name="description"]')
  description.value =''
}

// функция сброса значений полей формы до начальных значений. Конец.


initSlider(pristineAdForm.validate)