import { features } from '../../../../../js/data.js'

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Будет использоваться для генерации временных географических координат в следующем задании. Пример использования функции:
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)))
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)))
  const result = Math.random() * (upper - lower + 1) + lower
  return Math.floor(result)
}
// функция(от, до, количество_знаков_после_запятой); // Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b))
  const upper = Math.max(Math.abs(a), Math.abs(b))
  const result = Math.random() * (upper - lower) + lower
  return +result.toFixed(digits)
}
// массив чисел  от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
function getAuthorAvatar () {
  const ArrAvatars = new Set()
  let str = ''
  do {
    str = getRandomPositiveInteger(1, 10)
    str = str < 10 ? `0${str}` : String(str)
    ArrAvatars.add(str)
  } while (ArrAvatars.size < 10)

  return [...ArrAvatars]
}
//  функция генерация рандомного индекса для массива
function getRandomValue (arr) {
  return arr[getRandomPositiveInteger(0, arr.length - 1)]
}

function getRandomFeatures (features) {
  const setFeatures = new Set()
  do {
    const feature = getRandomValue(features)
    setFeatures.add(feature)
  } while (setFeatures.size < getRandomPositiveInteger(1, features.length - 1))
  return [...setFeatures]
}

// генерация адреса фотографии
function getRandomPhotos (photos) {
  let photo
  const index = getRandomPositiveInteger(1, 10)
  const array = []
  do {
    photo = getRandomValue(photos)
    array.push(photo)
  } while (array.length < index)
  return array
}

function getEndingRooms (amount) {
  switch (amount) {
    case 1:
      return 'комната'
    case 2:
      return 'комнаты'
    case 3 :
      return 'комнаты'
    case 4 :
      return 'комнаты'
    default:
      return 'комнат'
  }
}
function getEndingGuests (amount) {
  switch (amount) {
    case 1:
      return 'гостя'
    default:
      return 'гостей'
  }
}

function getType (type) {
  switch (type) {
    case 'flat':
      return 'Квартира'
    case 'bungalow':
      return 'Бунгало'
    case 'house':
      return 'Дом'
    case 'palace':
      return 'Дворец'
    case 'hotel':
      return 'Отель'
  }
}

function getFeaturesList (features, listNodes) {
  const modifiers = features.map(feature => 'popup__feature--' + feature)

  listNodes.forEach(item => {
    const modifier = item.classList[1]
    if (!modifiers.includes(modifier)) {
      item.remove()
    }
  })
}
 const isEscapeKey = (evt) => evt.key === 'Escape'
 

//функция открытия попапа успешной отправки данных формы
function showSuccess(){
  const templateSuccess =document.querySelector('#success').content;
  const successElement =templateSuccess.cloneNode(true);
  document.body.append(successElement);
}
//хэндлер закрытия попапа успеха на esc
document.addEventListener('keydown',onRemovePopupSuccessEscKeydown);
//функция закрытия попапа успеха по esc
function onRemovePopupSuccessEscKeydown(evt){
  if(document.querySelector('.success') && isEscapeKey(evt)){
    onRemovePopupSuccess();
  }
}
//функция закрытия попапа успеха по нажатию любой клавиши
function onRemovePopupSuccessAnyClick(evt){
  if(evt.target.classList.contains('success') ||evt.target.classList.contains('success__message')){
    onRemovePopupSuccess();
  }
}
// функция закрытия попапа успеха на любой клик мыши
document.addEventListener('click', onRemovePopupSuccessAnyClick);
//функция закрытия попапа успеха
function onRemovePopupSuccess(){
  const successPopup =document.querySelector('.success');
  successPopup.remove();
}
// функция показа попапа ошибки загрузки формы
function showErrorPopup(){
  const errorTemplate =document.querySelector('#error').content;
  const errorElementPopup =errorTemplate.cloneNode(true);
  document.body.append(errorElementPopup);
  document.querySelector('.error__button').addEventListener('click', onRemovePopupError);
}
//функция закрытия попапа ошибки по кнопке
function onRemovePopupError(){
  document.querySelector('.error').remove();
}
//функция закрытия окна ошибки по нажатию любой клавиши
function onRemovePopupErrorAnyClick(evt){
  
  if(evt.target.classList.contains('error') ||evt.target.classList.contains('error__message')){
    onRemovePopupError();
  }
}
//хэндлер закрытия попапа ошибки на любой клик мыши
document.addEventListener('click', onRemovePopupErrorAnyClick);

//хэндлер закрытия попапа ошибки на esc
document.addEventListener('keydown',onRemovePopupErrorEscKeydown);
//функция закрытия попапа ошибки по esc
function onRemovePopupErrorEscKeydown(evt){
  if(document.querySelector('.error') && isEscapeKey(evt)){
    onRemovePopupError();
  }
}
//фунция показа ошибки при получении данных с сервера
const ALERT_SHOW_TIME = 5000;
function showAlert(message){
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}
//функции для getData()
let dataArray =[]
function onSuccess(data){
  dataArray = data

}
function onError(err){
  console.log(err);
}

//функция проверки загруженного файла на нужный тип
const FILE__TYPES =['jpg', 'jpeg', 'png', 'gif'];
function isValidateTypeFile(file){
  return FILE__TYPES.some((it)=>file.endsWith(it));
}

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest)=>{
    clearTimeout(timeoutId);
    timeoutId =setTimeout(()=>callback.apply(this, rest), timeoutDelay)
  }
}
export {debounce}
export {isValidateTypeFile}
export {showSuccess, showErrorPopup, showAlert}
export {onSuccess, onError, dataArray}
// импортируем в generat.js
export { getRandomPositiveInteger }
export { getRandomPositiveFloat }
export { getAuthorAvatar }
export { getRandomValue }
export { getRandomFeatures }
export { getRandomPhotos }

// импортируем в render.js
export { getEndingRooms }
export { getEndingGuests }
export { getType }
export { getFeaturesList }
