const uploadImgElement = document.querySelector('.ad-form__input')
const uploadAvatarElement = document.querySelector('.ad-form-header__input')
// ad-form-header__preview
//подстановка загруженой фотографии в окно аватар
uploadAvatarElement.addEventListener('change', (evt)=>
  {
    const image = document.querySelector('.ad-form-header__preview img')
    const file = evt.target.files[0]
    image.style.objectFit ='cover'
    image.src = URL.createObjectURL(file)
  }
)
//подстановка загруженой фотографии в окно 
uploadImgElement.addEventListener('change', (evt)=>
  {
    const photoContainer = document.querySelector('.ad-form__photo')
    const image =document.createElement('img');
    const file = evt.target.files[0]
    image.style.objectFit ='cover'
    image.style.width = 70+'px'
    image.style.height = 70+'px'
    image.src = URL.createObjectURL(file)
    photoContainer.append(image)
  }
)

