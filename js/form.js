console.log('form');
let defaultConfig = {
    // class of the parent element where the error/success class is added
    classTo: 'ad-form__element',
    errorClass: 'has-danger',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    errorTextParent: 'ad-form__element',
    // type of element to create for the error text
    errorTextTag: 'div',
    // class of the error text element
    errorTextClass: 'has-danger' 
};
const formMapFilters =document.querySelector('.map__filters')
const adForm =document.querySelector('.ad-form')
// console.log(formMapFilters);
// console.log(adForm);
const pristineMapFilters = new Pristine(formMapFilters,defaultConfig);


const pristineAdForm =new Pristine(adForm, defaultConfig)

const price =document.querySelector('#price')
const typeHosting =document.querySelector('#type')
//изменение типа жилья приводит к изменению плэйсхолдера мин-прайс
typeHosting.addEventListener('change', (evt)=>{
  console.log(typeHosting.value);
  complianceHostingPrice.filter(i=>{
      if(typeHosting.value==i[0]){
        price.placeholder=i[2]
        price.min = i[2]
        pristineAdForm.validate()
      }
  })
})
// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
const complianceHostingPrice =[
  ['palace','дворца', 10000,],
  ['flat','квартиры', 1000,],
  ['house','дома', 5000,],
  ['bungalow','бунгало', 0,],
  ['hotel','отеля', 3000,],
]
function validateComplianceTypeHostMinPrice(value){
  const typeHosting =document.querySelector('#type').value
  let flag =true;
  complianceHostingPrice.filter(i=>{
    if(typeHosting==i[0] && value<i[2]){
      flag =false
    }
  })
  return flag
}
function getErrorComplainceHostPrice(){
  const typeHosting =document.querySelector('#type').value 
  let message =''
  complianceHostingPrice.filter(i=>{
    if(typeHosting==i[0]){
      message =`Минимальная стоимость ${i[1]} не меньше ${i[2]}`
    }
  })
  return message
}

pristineAdForm.addValidator(
  price,
  validateComplianceTypeHostMinPrice,
  getErrorComplainceHostPrice,
  1,
  false )

//валидация поля price
function validateFieldPrice(value){
  return value<=100000
}
pristineAdForm.addValidator(price, validateFieldPrice, 'цена должна быть меньше 100000 рублей',3, false )

//валидация price на тип число
function validateFieldPriceTypeNumber(value){
  const arr =value.split('')
  let flag =arr.every(i=>/^[0-9]$/.test(i))
  // console.log('flag: '+ flag);
  return flag
}
pristineAdForm.addValidator(price,validateFieldPriceTypeNumber, 'это число', 2, false)

//Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля во втором выделяется соответствующее ему значение. Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
const timein =document.querySelector('#timein')
const timeout =document.querySelector('#timeout')
timein.addEventListener('change', ()=>{
  timeout.value =timein.value
})
timeout.addEventListener('change', ()=>{
  timein.value =timeout.value
})
//  Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;guests
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей». под ограничениями подразумевается валидация.
const rooms =document.querySelector('[name="rooms"]')
console.log(rooms.value)
const capacity =document.querySelector('[name="capacity"]')

const guestsRoomRatioText ={
  '1':['для 1 гостя'],
  '2':['для 2 гостей','для 1 гостя'],
  '3':['для 3 гостей','для 2 гостей','для 1 гостя'],
  '100':['не для гостей'],
}
const guestsRoomRatioOption={
  "1":["1"],
  "2":["1","2"],
  "3":['1',"2","3"],
  "100":["0"]
}
function getGuestsRoomRatio(){
  console.log(guestsRoomRatioOption[rooms.value])
  console.log("capacity: "+capacity.value)
  return guestsRoomRatioOption[rooms.value].includes(capacity.value)
}

function getRoomCapacityRatioErrorMessage () {
  let str =''
     guestsRoomRatioOption[rooms.value].filter(i=>{ 
  
    if(i!=capacity.value){
      
      if(capacity.value==1){
        console.log(i) 
        str =`невозможно забронировать для 1 гостя`
      }
      if(capacity.value==2 ||capacity.value==3){
        console.log(i) 
        str =`невозможно забронировать для ${capacity.value} гостей`
      }
      if(capacity.value==0 && rooms.value==100){
        console.log(i) 
        str=`не бронируется для гостей`
      }  
    }else{
      str=''
    }
    return str
})
 
  return str
  
}
rooms.addEventListener('change',()=>{
  
  getRoomCapacityRatioErrorMessage
  pristineAdForm.validate()
} )
pristineAdForm.addValidator(rooms, getGuestsRoomRatio, 'это не возможно', 2, false)
pristineAdForm.addValidator(capacity,getGuestsRoomRatio,getRoomCapacityRatioErrorMessage,1 ,false)
adForm.addEventListener('submit',(evt)=>{
  evt.preventDefault()
  const priceInput =document.querySelector('#price').value
  
  const isValidate =pristineAdForm.validate()
  if(isValidate=='true'){
    console.log('валидация прошла '+ isValidate);
  }else{
    console.log('валидация не прошла '+ isValidate);
    // evt.preventDefault()
  }
})

