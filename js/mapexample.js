const map = new L.map('map-canvas')
  .on('load', () => {
    console.log('map')
  })
  .setView({
    lat: 59.92749,
    lng: 30.31127
  }, 10)
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(map)
console.log(map)
// маркер 1
const marker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748
  },
  {
    draggable: true
  }
)
marker.addTo(map)
marker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng())
})

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
})
// второй маркер с собственной иконкой
const mainPinMarker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31900
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
)

mainPinMarker.addTo(map)
const resetButton = document.querySelector('.reset-button')

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 59.96831,
    lng: 30.31748
  })
  map.setView({
    lat: 59.96831,
    lng: 30.31748
  }, 16)
})

const points = [
  {
    title: 'Футура',
    lat: 59.96925,
    lng: 30.31730
  },
  {
    title: 'Шаверма',
    lat: 59.96783,
    lng: 30.31258
  },
  {
    title: 'Франк',
    lat: 59.95958,
    lng: 30.30228
  },
  {
    title: 'Ginza',
    lat: 59.97292,
    lng: 30.31982
  }
]
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon')
  console.log(balloonTemplate)
  const popupElement = balloonTemplate.cloneNode(true)

  popupElement.querySelector('.balloon__title').textContent = point.title
  popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`

  return popupElement
}

points.forEach((point) => {
  const { lat, lng } = point
  const marker = L.marker(
    {
      lat,
      lng
    },
    {
      icon
    }
  )

  marker
    .addTo(map)
    .bindPopup(createCustomPopup(point))
})
