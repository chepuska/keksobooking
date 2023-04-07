// ad-form__input ad-form-header__input
const uploadImgElement = document.querySelector('.ad-form__input')
const uploadAvatarElement = document.querySelector('.ad-form-header__input')
console.log(uploadAvatarElement);
uploadAvatarElement.addEventListener('change', (evt)=>{
  console.log('change');
  const src =URL.createObjectURL(evt.target)
  console.log(src);
})