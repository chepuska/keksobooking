import { createData } from '/js/generat.js'
import { getEndingRooms, getEndingGuests, getType, getFeaturesList } from '/js/util.js'

const placeInsertCard = document.querySelector('#map-canvas')
const card = document.querySelector('#card').content
const popup = card.querySelector('.popup')
//создание объявления
function createArticle (data) {
  const { author, offer } = data
  const fragment = popup.cloneNode(true)
  const avatar = fragment.querySelector('.popup__avatar')
  const address = fragment.querySelector('.popup__text--address')
  const photos = fragment.querySelector('.popup__photos')
  const photo = fragment.querySelector('.popup__photo')
  const description = fragment.querySelector('.popup__description')
  const capacity = fragment.querySelector('.popup__text--capacity ')
  const type = fragment.querySelector('.popup__type')
  const title = fragment.querySelector('.popup__title')
  const price = fragment.querySelector('.popup__text--price ')
  // const featuresContainer = fragment.querySelector('.popup__features')
  const featuresItems = fragment.querySelectorAll('.popup__feature')
  const time = fragment.querySelector('.popup__text--time')

  avatar.src = author.avatar
  title.textContent = offer.title
  address.textContent = offer.address
  price.textContent = `${offer.price} ₽/ночь`
  type.textContent = getType(offer.type)
  capacity.textContent = `${offer.rooms} ${getEndingRooms(offer.rooms)} для ${offer.guests} ${getEndingGuests(offer.guests)}`
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`

  if (offer.description) {
    description.textContent = offer.description
  } else {
    description.classList.add('visually-hidden')
  }
  offer.photos.forEach(i => {
    photo.src = i
    const photoExzample = photo.cloneNode(true)
    photos.append(photoExzample)
  })
  getFeaturesList(offer.features, featuresItems)

  return fragment
}

const result = createData.map(createArticle)
// const ad = placeInsertCard.append(result[5])

export { result }
