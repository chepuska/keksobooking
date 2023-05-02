const ARTICLE_COUNT = 10
const mapFiltersForm = document.querySelector('.map__filters')

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
  const housingType = mapFiltersForm.querySelector('select[name="housing-type"]').value
  const price = mapFiltersForm.querySelector('select[name="housing-price"]').value
  const rooms = mapFiltersForm.querySelector('select[name="housing-rooms"]').value
  const guests = mapFiltersForm.querySelector('select[name="housing-guests"]').value
  const features = mapFiltersForm.querySelectorAll('input[name="features"]')
  // получаем массив отмеченных features
  const featureChecked = Array.from(features)
    .filter(feature => feature.checked)
    .map((feature) => feature.value)

  return data
    .filter(i => housingType === 'any' || i.offer.type === housingType)
    .filter(i => {
      if (price === 'any') {
        return true
      } else if (price === 'middle') {
        return i.offer.price >= 10000 && i.offer.price <= 50000
      } else if (price === 'low') {
        return i.offer.price < 10000
      } else if (price === 'high') {
        return i.offer.price > 50000
      }
      return false
    })
    .filter((i) => rooms === 'any' || i.offer.rooms === +rooms)
    .filter((i) => guests === 'any' || i.offer.guests === +guests)
    .slice()
    .sort((a, b) => compareFeatures(a, b, featureChecked))
    .slice(0, ARTICLE_COUNT)
}

const initFilters = (cb) => {
  const typeHosting = mapFiltersForm.querySelector('select[name="housing-type"]')
  const price = mapFiltersForm.querySelector('select[name="housing-price"]')
  const rooms = mapFiltersForm.querySelector('select[name="housing-rooms"]')
  const guests = mapFiltersForm.querySelector('select[name="housing-guests"]')
  const features = mapFiltersForm.querySelectorAll('input[name="features"]')
  typeHosting.addEventListener('change', cb)
  price.addEventListener('change', cb)
  rooms.addEventListener('change', cb)
  guests.addEventListener('change', cb)
  features.forEach((i) => i.addEventListener('change', cb))
}

export { initFilters, filterData }
