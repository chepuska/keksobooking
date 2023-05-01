console.log('filters')
const ARTICLE_COUNT = 10
const mapFiltersForm = document.querySelector('.map__filters')

const getRankFeatures = (object) => {
  if (object.offer.features) {
    return object.offer.features.length
  }
}
// функция сортировки по количеству features
const sortByAmountFeatures = (object1, object2) => {
  const rankObject1 = getRankFeatures(object1)
  const rankObject2 = getRankFeatures(object2)

  if (rankObject1 && rankObject2) {
    return rankObject2 - rankObject1
  }
}

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
    .sort(sortByAmountFeatures)
    .filter((i) => {
      const featuresArray = i.offer.features
      return (featuresArray && featureChecked.every(j => featuresArray.includes(j)))
    })
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
