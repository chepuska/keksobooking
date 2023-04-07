import { setStartCoordinats } from './map.js';

const resetButton =document.querySelector('.ad-form__reset')
console.log(resetButton);
//хэндлер для сброса данных формы
resetButton.addEventListener('click', () =>{
  setStartCoordinats()
})