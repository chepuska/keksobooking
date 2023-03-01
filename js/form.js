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

