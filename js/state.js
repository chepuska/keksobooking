const mapFiltersForm = document.querySelector('.map__filters')
const elementsMapFiltersForm = mapFiltersForm.querySelectorAll('select, input')
const adForm = document.querySelector('.ad-form')
const fieldsetAdForm = adForm.querySelectorAll('fieldset')

const deactivateMapFilters = () => {
// disabled map-filter-form
  if (!mapFiltersForm.classList.contains('map__filters--disabled')) {
    mapFiltersForm.classList.add('map__filters--disabled')
  }
  // disabled inputs selects filter-form
  Array.from(elementsMapFiltersForm)
    .map(i => {
      i.disabled = true
      return i
    })
}

const deactivateAdForm = () => {
// disabled ad-form
  if (!adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.add('ad-form--disabled')
  }
  // disabled fieldset
  Array.from(fieldsetAdForm)
    .map(i => {
      i.disabled = true
      return i
    })
}

const activateMapFilters = () => {
  // activate map-filters-form
  if (mapFiltersForm.classList.contains('map__filters--disabled')) {
    mapFiltersForm.classList.remove('map__filters--disabled')
  }

  // activate map-filters-form
  Array.from(elementsMapFiltersForm)
    .map(i => {
      i.disabled = false
      return i
    })
}

const activateAdForm = () => {
// activate ad-form
  if (adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.remove('ad-form--disabled')
  }
  // activate inputs, selects ad-form
  Array.from(fieldsetAdForm)
    .map(i => {
      i.disabled = false
      return i
    })
}

export { deactivateMapFilters, deactivateAdForm }
export { activateMapFilters, activateAdForm }
