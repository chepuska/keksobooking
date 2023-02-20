import {types} from "/js/data.js"
import {title} from "/js/data.js"
import {check} from "/js/data.js"
import {photos} from "/js/data.js"
import {features} from "/js/data.js"
import {description} from "/js/data.js"

import {getRandomPositiveInteger} from "/js/util.js"
import {getRandomPositiveFloat} from "/js/util.js"
import {getAuthorAvatar} from "/js/util.js"
import {getRandomValue} from "/js/util.js"
import {getRandomFeatures} from "/js/util.js"
import {getRandomPhotos} from "/js/util.js"

function createObject(id){
  let obj =new Object();
  let location = {
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
      rooms: getRandomPositiveInteger(1,10),
      guests: getRandomPositiveInteger(1,25),
      checkin: getRandomValue(check),
      checkout: getRandomValue(check),
      features: getRandomFeatures(features),
      description: getRandomValue(description),
      photos: getRandomPhotos(photos)
    }
  }
  return obj;
}
const createData = getAuthorAvatar().map(createObject)

export {createData}