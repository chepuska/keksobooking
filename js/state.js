
function creatingUnactiveState () {
  const adForm = document.querySelector('.ad-form')
  adForm.classList.add('ad-form--disabled')

  const fieldsetListAdForm = adForm.querySelectorAll('fieldset')
  Array.from(fieldsetListAdForm).map(i => {
    return i.setAttribute('disabled', 'disabled')
  })

  const selectList = document.querySelectorAll('.map__filter');
  [...selectList].map(i => {
    return i.setAttribute('disabled', 'disabled')
  })

  document.querySelector('.map__features').setAttribute('disabled', 'disabled')
}

function creatingActiveState () {
  const adForm = document.querySelector('.ad-form')
  adForm.classList.remove('ad-form--disabled')

  const fieldsetListAdForm = adForm.querySelectorAll('fieldset')
  Array.from(fieldsetListAdForm).map(i => {
    return i.removeAttribute('disabled')
  })

  const selectList = document.querySelectorAll('.map__filter');
  [...selectList].map(i => {
    return i.removeAttribute('disabled')
  })

  document.querySelector('.map__features').removeAttribute('disabled')
}
creatingUnactiveState()


export { creatingUnactiveState }
export { creatingActiveState }
// Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
// Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset. Слайдер также должен быть заблокирован;
