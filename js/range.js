const sliderElement =document.querySelector('.ad-form__slider')
const valueElement =document.querySelector('input[name="price"]')
valueElement.value = 1000
let validateCallback
//создание слайдера со стартовыми опциями
function initSlider(validateCb){
  noUiSlider.create(sliderElement,{
    range:{
      min: 0,
      max: 100000
    },
    start: 0,
    step: 1,
    connect: 'lower', 
    format:{
      to: function (value){
        return value.toFixed(0)
      },
      from: function (value){
        return value
      }
    }
  })
  validateCallback = validateCb
  sliderElement.noUiSlider.on('update', updateValueSlider)
}


//функция изменения значения ползунка
function updateValueSlider(){
  valueElement.value = sliderElement.noUiSlider.get()
  if (validateCallback !== undefined)
    validateCallback()
}


//функция приведения слайдера к стартовому значению
function resetValueSlider(){
  sliderElement.noUiSlider.set(0)
  if (validateCallback !== undefined)
    validateCallback()
}

export {initSlider, resetValueSlider}