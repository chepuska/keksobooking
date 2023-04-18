import { creatingActiveState } from './state.js';
import { getType, getEndingGuests, getEndingRooms, getFeaturesList } from './util.js';

// activeState()
// activate deactivate
console.log('DO MAP');
const map = new L.map('map-canvas');
map.on('load', () => {
    creatingActiveState();
  })
  .setView({
    lat: 35.6895,
    lng: 139.692
  }, 12);


// активируем тайлы для отображения определенных карт
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(map)
// создаем иконку для маркера
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
})
// ставим маркер в центр Токио
const mainPinMarker = L.marker({
  lat: 35.6895,
  lng: 139.692
},
{
  draggable: true,
  icon: mainPinIcon
})

mainPinMarker.addTo(map)

// запись локации Токио - как главной метки при загрузке
const coordinats = mainPinMarker.getLatLng();
const { lat, lng } = coordinats;
let stringCoordinats = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
document.querySelector('[name=\'address\']').value = stringCoordinats;
// при перемещении главной метки координаты передаются в инпут для отправки формы на сервер
mainPinMarker.on('moveend', (evt) => {
  const currentCoordinats = evt.target.getLatLng()
  stringCoordinats = `${currentCoordinats.lat.toFixed(5)}, ${currentCoordinats.lng.toFixed(5)}`
  document.querySelector('input[name="address"]').value = stringCoordinats 

})

// создать слой и добавить его на карту
const markerGroup = L.layerGroup().addTo(map)
// создание всех маркеров-меток нагенерированных ранее
// создаем иконку
const usualPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})
// функция создания кастомного балуна
const createCustomPopup = ({ author, location, offer }) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup')
  const popupElement = balloonTemplate.cloneNode(true)

  popupElement.querySelector('.popup__avatar').src = author.avatar
 
  popupElement.querySelector('.popup__title').textContent = offer.title

  popupElement.querySelector('.popup__text--address').textContent = offer.address

  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`

  popupElement.querySelector('.popup__type').textContent = getType(offer.type)

  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getEndingRooms(offer.rooms)}  для ${offer.guests} ${getEndingGuests(offer.guests)} `

  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`

  const featuresItems = popupElement.querySelectorAll('.popup__feature')
  if (!offer.features) {
    popupElement.querySelector('.popup__features').classList.add('hidden')
  } else {
    getFeaturesList(offer.features, featuresItems)
  }

  const description = popupElement.querySelector('.popup__description')
  if (!offer.description) {
    description.classList.add('hidden')
  } else {
    description.textContent = offer.description
  }

  const photosList = popupElement.querySelector('.popup__photos')
  photosList.innerHTML = ''
  if (!offer.photos) {
    photosList.classList.add('hidden')
  } else {
    offer.photos.forEach(src => {
      photosList.innerHTML += `<img src="${src}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
      return photosList
    })
  }

  return popupElement
}

function setStartCoordinats () {
  mainPinMarker.setLatLng({
    lat: 35.6895,
    lng: 139.692
  })
  map.setView({
    lat: 35.6895,
    lng: 139.692
  }, 12)
  console.log();
  const { lat, lng } = coordinats
  let stringCoordinats = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  document.querySelector('input[name="address"]').value =stringCoordinats
}

export { setStartCoordinats }

// markerGroup.clearLayers();
//функция добавления маркеров и балунов из даты с сервера
function addMarkersToMaps(data){
  data.forEach((point) => {
    const { author,location, offer } = point
   
    const usualPinMarker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng
      },
      {
        icon: usualPinIcon
      })
      //добавление группы маркеров и создание балунов к ним
    usualPinMarker
      .addTo(markerGroup)
      .bindPopup(createCustomPopup(point))
  })
}
export {addMarkersToMaps}


