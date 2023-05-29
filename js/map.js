import { activateAdForm, activateMapFilters } from './state.js'
import { getData } from './api.js'
import { initFilters, filterData } from './filters.js'
import { OFFERS_COUNT, RERENDER_DELAY } from './constants.js'
import { getType, getEndingGuests, getEndingRooms, getFeaturesList, showAlert, debounce } from './util.js'

const START_ZOOM = 12
const START_LAT_COORDINAT = 35.68950
const START_LNG_COORDINATS = 139.69200
const map = L.map('map-canvas')
const addressElement = document.querySelector('input[name="address"]')

map.on('load', () => {
  activateAdForm()

  getData((data) => {
    const offers = data.slice(0, OFFERS_COUNT)
    addMarkersToMaps(offers)
    activateMapFilters()
    initFilters(
      debounce(
        () => { addMarkersToMaps(filterData(data)) },
        RERENDER_DELAY
      )
    )
  }, showAlert)
})
  .setView({
    lat: START_LAT_COORDINAT,
    lng: START_LNG_COORDINATS
  }, START_ZOOM)

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
  lat: START_LAT_COORDINAT,
  lng: START_LNG_COORDINATS
},
{
  draggable: true,
  icon: mainPinIcon
})

mainPinMarker.addTo(map)

// запись локации Токио - как главной метки при загрузке
const coordinats = mainPinMarker.getLatLng()
const { lat, lng } = coordinats
let stringCoordinats = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
document.querySelector('[name=\'address\']').value = stringCoordinats
// при перемещении главной метки координаты передаются в инпут для отправки формы на сервер
mainPinMarker.on('moveend', (evt) => {
  const currentCoordinats = evt.target.getLatLng()
  stringCoordinats = `${currentCoordinats.lat.toFixed(5)}, ${currentCoordinats.lng.toFixed(5)}`
  addressElement.value = stringCoordinats
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
  const popupElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true)

  popupElement.querySelector('.popup__avatar').src = author.avatar

  popupElement.querySelector('.popup__title').textContent = offer.title

  popupElement.querySelector('.popup__text--address').textContent = offer.address
  const price = popupElement.querySelector('.popup__text--price')
  price.innerHTML = `${offer.price} <span>₽/ночь</span>`

  popupElement.querySelector('.popup__type').textContent = getType(offer.type)

  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getEndingRooms(offer.rooms)}  для ${offer.guests} ${getEndingGuests(offer.guests)}`

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

const setStartCoordinats = () => {
  mainPinMarker.setLatLng({
    lat: START_LAT_COORDINAT,
    lng: START_LNG_COORDINATS
  })
  map.setView({
    lat: START_LAT_COORDINAT,
    lng: START_LNG_COORDINATS
  }, START_ZOOM)
  const { lat, lng } = coordinats
  const stringCoordinats = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  addressElement.value = stringCoordinats
}

// функция добавления маркеров и балунов из даты с сервера
const addMarkersToMaps = (data) => {
  markerGroup.clearLayers()

  data.forEach((point) => {
    const usualPinMarker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng
      },
      {
        icon: usualPinIcon
      })
    // добавление группы маркеров и создание балунов к ним
    usualPinMarker
      .addTo(markerGroup)
      .bindPopup(createCustomPopup(point))
  })
}

const removeMarkerPopup = () => {
  const baloon = document.querySelector('.leaflet-popup')
  if (baloon !== undefined && baloon !== null) {
    baloon.remove()
  }
}

export { addMarkersToMaps }
export { setStartCoordinats }
export { removeMarkerPopup }
