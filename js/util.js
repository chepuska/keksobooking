import { features } from '/js/data.js'
console.log('util');
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
  const ind = getRandomPositiveInteger(1, 10)
  const array = []
  do {
    photo = getRandomValue(photos)
    array.push(photo)
  } while (array.length < ind)
  return array
}

function getEndingRooms (amount) {
  switch (amount) {
    case 1:
      return 'комната'
    case 2, 3, 4 :
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
  console.log(modifiers);
  listNodes.forEach(item => {
    const modifier = item.classList[1]
    if (!modifiers.includes(modifier)) {
      item.remove()
    }
  })
}

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
