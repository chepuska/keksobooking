import { MAX_PRICE, MIN_PRICE } from './constants.js'
const sliderElement = document.querySelector('.ad-form__slider')
const valueElement = document.querySelector('input[name="price"]')
// valueElement.value = MIN_PRICE
let validateCallback
// создание слайдера со стартовыми опциями
const initSlider = (validateCb) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: MAX_PRICE
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => {
        return value === 0 ? '' : value.toFixed(0)
      },
      from: (value) => {
        return value
      }
    }
  })
  // validateCallback = validateCb
  sliderElement.noUiSlider.on('update', updateValueSlider)
  sliderElement.noUiSlider.on('change.one', (e) => {
    validateCallback = validateCb
  })
}

// функция изменения значения ползунка
const updateValueSlider = () => {
  valueElement.value = sliderElement.noUiSlider.get()
  if (validateCallback !== undefined) { validateCallback() }
}

// функция приведения слайдера к стартовому значению
const resetValueSlider = () => {
  sliderElement.noUiSlider.set(0)
  if (validateCallback !== undefined) { validateCallback() }
  valueElement.value = MIN_PRICE
  valueElement.placeholder = MIN_PRICE
}

export { initSlider, resetValueSlider }
