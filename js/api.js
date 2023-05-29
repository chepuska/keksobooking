import { deactivateAdForm, deactivateMapFilters } from './state.js'
import { URL } from './constants.js'
deactivateAdForm()
deactivateMapFilters()

let dataObjects

const getData = (onSuccess, onError) => {
  fetch(
    URL + '/data',
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  ).then((response) => {
    if (response.ok) {
      return response.json()
    }
    throw new Error(`${response.status} ${response.text}`)
  })
    .then((data) => {
      dataObjects = data
      onSuccess(data)
    })
    .catch((err) => {
      const textError = 'Что-то пошло не так, перегрузите страницу'
      onError(textError)
      deactivateMapFilters()
      console.log(err)
    })
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL,
    {
      method: 'POST',
      body
    }
  ).then((response) => {
    if (response.ok) {
      onSuccess()
    } else {
      onFail()
    }
  }).catch(() => onFail())
}

export { getData, sendData, dataObjects }
