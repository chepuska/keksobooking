import { isValidateTypeFile } from "./util.js";
const uploadImgElement = document.querySelector('.ad-form__input');
const uploadAvatarElement = document.querySelector('.ad-form-header__input');

//подстановка загруженой фотографии в окно аватар
uploadAvatarElement.addEventListener('change', (evt)=>
  {
    const image = document.querySelector('.ad-form-header__preview img');
    const file = evt.target.files[0];
    const fileName =file.name.toLowerCase();

    if(file && isValidateTypeFile(fileName)){
      image.src = URL.createObjectURL(file);
      image.style.objectFit ='cover';
    }
  }
)
//подстановка загруженой фотографии в окно 
uploadImgElement.addEventListener('change', (evt)=>
  {
    const photoContainer = document.querySelector('.ad-form__photo');
    const image =document.createElement('img');
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();
    if(file && isValidateTypeFile(fileName)){  
      image.style.objectFit ='cover';
      image.style.width = 70+'px';
      image.style.height = 70+'px';
      image.src = URL.createObjectURL(file);
      photoContainer.append(image);
    }
  }
)

