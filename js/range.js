console.log('range');
import {pristineAdForm} from '../../../../../js/form.js'

const sliderElement =document.querySelector('.ad-form__slider')
const valueElement =document.querySelector('input[name="price"]')
console.log(valueElement);
valueElement.value = 1000
//создание слайдера со стартовыми опциями
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
//изменение значения ползунка
sliderElement.noUiSlider.on('update', (...rest)=>{
  console.log(rest);
  valueElement.value = sliderElement.noUiSlider.get()
  pristineAdForm.validate()
})