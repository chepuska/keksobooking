// import { getArticlesValue, getSuitableArticleToOptions } from "./filters.js";
let dataArray =[]
function getData(onSuccess, onError){
  fetch(
    'https://25.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    }
  ).then((response)=>{
    if(response.ok){
      return response.json()
    }
    throw new Error(`${response.status} ${response.text}`);
  })
  .then((data)=>{
    onSuccess(data);
    dataArray =data;
    console.log(data);
//

//

  })
  .catch((err)=>{
    const textError ='Что-то пошло не так, перегрузите страницу';
    onError(textError);
    console.log(err);
  });
}

function sendData(onSuccess, onFail, body){
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: "POST",
      body
    }
  ).then((response)=>{
    if(response.ok){
      onSuccess()
    }else{
      onFail()
    }
    
  }).catch(()=>onFail())
}

export {getData, sendData}

