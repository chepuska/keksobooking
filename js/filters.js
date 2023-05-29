import { OFFERS_COUNT, MIDDLE_PRICE, LOW_PRICE } from './constants.js'

const mapFiltersForm = document.querySelector('.map__filters')
const typeHostingElement = mapFiltersForm.querySelector('select[name="housing-type"]')
const priceElement = mapFiltersForm.querySelector('select[name="housing-price"]')
const roomsElement = mapFiltersForm.querySelector('select[name="housing-rooms"]')
const guestsElement = mapFiltersForm.querySelector('select[name="housing-guests"]')
const featuresList = mapFiltersForm.querySelectorAll('input[name="features"]')

const getRankFeatures = (object, selected) => {
  if (object.offer.features) {
    return object.offer.features
      .map(f => selected.includes(f) ? 10 : 1)
      .reduce((acc, i) => acc + i, 0)
  }
  return 0
}
// функция сортировки по количеству features
const compareFeatures = (object1, object2, selectedFeatures) => getRankFeatures(object2, selectedFeatures) - getRankFeatures(object1, selectedFeatures)

const filterData = (data) => {
  const housingType = typeHostingElement.value
  const price = priceElement.value
  const rooms = roomsElement.value
  const guests = guestsElement.value
  // получаем массив отмеченных features
  const featureChecked = Array.from(featuresList)
    .filter(feature => feature.checked)
    .map((feature) => feature.value)

  const housingFilter = item => housingType === 'any' || item.offer.type === housingType
  const priceFilter = item => {
    if (price === 'any') {
      return true
    } else if (price === 'middle') {
      return item.offer.price >= LOW_PRICE && item.offer.price <= MIDDLE_PRICE
    } else if (price === 'low') {
      return item.offer.price < LOW_PRICE
    } else if (price === 'high') {
      return item.offer.price > MIDDLE_PRICE
    }
    return false
  }
  const roomsFilter = item => rooms === 'any' || item.offer.rooms === +rooms
  const guestsFilter = item => guests === 'any' || item.offer.guests === +guests
  const featuresFilter = item => {
    if (featureChecked.length === 0) {
      return true
    }
    if (!item.offer.features) {
      return false
    }
    return featureChecked
      .map(i => item.offer.features.includes(i))
      .reduce((acc, i) => acc && i, true)
  }

  return data
    .filter(i => housingFilter(i) && priceFilter(i) && roomsFilter(i) && guestsFilter(i) && featuresFilter(i))
    .slice()
    .sort((a, b) => compareFeatures(a, b, featureChecked))
    .slice(0, OFFERS_COUNT)
}

const initFilters = (cb) => {
  typeHostingElement.addEventListener('change', cb)
  priceElement.addEventListener('change', cb)
  roomsElement.addEventListener('change', cb)
  guestsElement.addEventListener('change', cb)
  featuresList.forEach((i) => i.addEventListener('change', cb))
}

export { initFilters, filterData }
