const mapFiltersForm = document.querySelector('.map__filters')
const selectsListMapFiltersForm = mapFiltersForm.querySelectorAll('select')
const inputsListMapFiltersForm = mapFiltersForm.querySelectorAll('input')
const adForm = document.querySelector('.ad-form')
const selectsListAdForm = adForm.querySelectorAll('select')
const inputsListAdForm = adForm.querySelectorAll('input')
const textareaAdForm = adForm.querySelector('textarea')
const buttonsListAdForm = adForm.querySelectorAll('button')

const deactivateMapFilters = () => {
// disabled map-filter-form
  if (!mapFiltersForm.classList.contains('map__filters--disabled')) {
    mapFiltersForm.classList.add('map__filters--disabled')
  }

  // disabled inputs filter-form
  Array.from(inputsListMapFiltersForm)
    .map(i => {
      return i.setAttribute('disabled', true)
    })

  // disabled selects filter-form
  Array.from(selectsListMapFiltersForm)
    .map(i => {
      return i.setAttribute('disabled', true)
    })
}
const deactivateAdForm = () => {
// disabled ad-form
  if (!adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.add('ad-form--disabled')
  }
  // disabled inputs
  Array.from(inputsListAdForm)
    .map(i => {
      return i.setAttribute('disabled', true)
    })
  // disabled select
  Array.from(selectsListAdForm)
    .map(i => {
      return i.setAttribute('disabled', true)
    })
  // disabled buttons
  Array.from(buttonsListAdForm)
    .map(i => {
      return i.setAttribute('disabled', true)
    })
  // disabled textarea
  textareaAdForm.setAttribute('disabled', true)
}

const activateMapFilters = () => {
  // activate map-filters-form
  if (mapFiltersForm.classList.contains('map__filters--disabled')) {
    mapFiltersForm.classList.remove('map__filters--disabled')
  }

  // activate map-filters-form
  Array.from(inputsListMapFiltersForm)
    .map(i => {
      return i.removeAttribute('disabled')
    })

  // activate map-filters-form
  Array.from(selectsListMapFiltersForm)
    .map(i => {
      return i.removeAttribute('disabled')
    })
}
const activateAdForm = () => {
// activate ad-form
  if (adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.remove('ad-form--disabled')
  }

  // activate inputs ad-form
  Array.from(inputsListAdForm)
    .map(i => {
      return i.removeAttribute('disabled')
    })

  // activate select ad-form
  Array.from(selectsListAdForm)
    .map(i => {
      return i.removeAttribute('disabled')
    })

  // activate buttons ad-form
  Array.from(buttonsListAdForm)
    .map(i => {
      return i.removeAttribute('disabled')
    })

  // activate textarea ad-form
  textareaAdForm.removeAttribute('disabled')
}

export { deactivateMapFilters, deactivateAdForm }
export { activateMapFilters, activateAdForm }
