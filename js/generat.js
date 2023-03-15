import { types, title, check, photos, features, description } from '/js/data.js'

import { getRandomPositiveInteger, getRandomPositiveFloat, getAuthorAvatar, getRandomValue, getRandomFeatures, getRandomPhotos } from '/js/util.js'
//создание объекта
function createObject (id) {
  let obj = {}
  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5)
  }
  obj = {
    author: {
      avatar: `img/avatars/user${id}.png`
    },
    offer: {
      title: getRandomValue(title),
      location,
      price: getRandomPositiveInteger(500, 100000),
      address: `${location.lat}, ${location.lng}`,
      type: getRandomValue(types),
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 25),
      checkin: getRandomValue(check),
      checkout: getRandomValue(check),
      features: getRandomFeatures(features),
      description: getRandomValue(description),
      photos: getRandomPhotos(photos)
    }
  }
  return obj
}
//создание массива объектов (данных для объявлений)
const createData = getAuthorAvatar().map(createObject)

export { createData }
