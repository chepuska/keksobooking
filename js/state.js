const mapFiltersForm =document.querySelector('.map__filters')
const adForm = document.querySelector('.ad-form')
const selectsListAdForm = adForm.querySelectorAll('select')
const inputsListAdForm = adForm.querySelectorAll('input')
const textareaAdForm = adForm.querySelectorAll('textarea')
const buttonsListAdForm = adForm.querySelectorAll('button')
const deactivate = () => {
  console.log('deactivate')
  if(!adForm.classList.contains('ad-form--disabled')){
    adForm.classList.add('ad-form--disabled')
  }
  

  Array.from(inputsListAdForm).map(i => {
    return i.setAttribute('disabled', true)
  })

  Array.from(selectsListAdForm).map(i => {
    return i.setAttribute('disabled', true)
  })

  Array.from(buttonsListAdForm).map(i => {
    return i.setAttribute('disabled', true)
  })
  console.log(textareaAdForm);
  Array.from(textareaAdForm).map(i => {
    return i.setAttribute('disabled', true)
  })
  if(!mapFiltersForm.classList.contains('map__filters--disabled')){
    mapFiltersForm.classList.add('map__filters--disabled')
  }
  //здесь написать инактиваци. полей filters-map
}

const activate = () => {
  console.log('activate')
  if(adForm.classList.contains('ad-form--disabled')){
    adForm.classList.remove('ad-form--disabled')
  }
 
  const fieldsetListAdForm = adForm.querySelectorAll('fieldset')
  Array.from(fieldsetListAdForm).map(i => {
    return i.removeAttribute('disabled')
  })

  const selectList = document.querySelectorAll('.map__filter');
  [...selectList].map(i => {
    return i.removeAttribute('disabled')
  })


  const mapFiltersForm =document.querySelector('.map__filters')
  if(mapFiltersForm.classList.contains('map__filters--disabled')){
    mapFiltersForm.classList.remove('map__filters--disabled')
  }
  document.querySelector('.map__features').removeAttribute('disabled')
}

export { deactivate }
export { activate }
