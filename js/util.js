const ALERT_SHOW_TIME = 5000
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif']
const getEndingRooms = (amount) => {
  switch (amount) {
    case 1:
      return 'комната'
    case 2:
      return 'комнаты'
    case 3 :
      return 'комнаты'
    case 4 :
      return 'комнаты'
    default:
      return 'комнат'
  }
}

const getEndingGuests = (amount) => {
  switch (amount) {
    case 1:
      return 'гостя'
    default:
      return 'гостей'
  }
}

const getType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира'
    case 'bungalow':
      return 'Бунгало'
    case 'house':
      return 'Дом'
    case 'palace':
      return 'Дворец'
    case 'hotel':
      return 'Отель'
  }
}

const getFeaturesList = (features, listNodes) => {
  const modifiers = features.map(feature => 'popup__feature--' + feature)

  listNodes.forEach(item => {
    const modifier = item.classList[1]
    if (!modifiers.includes(modifier)) {
      item.remove()
    }
  })
}
const isEscapeKey = (evt) => evt.key === 'Escape'

// функция открытия попапа успешной отправки данных формы
const showSuccess = () => {
  const templateSuccess = document.querySelector('#success').content
  const successElement = templateSuccess.cloneNode(true)
  document.body.append(successElement)
}

// функция закрытия попапа успеха по esc
const onRemovePopupSuccessEscKeydown = (evt) => {
  if (document.querySelector('.success') && isEscapeKey(evt)) {
    onRemovePopupSuccess()
  }
}

// хэндлер закрытия попапа успеха на esc
document.addEventListener('keydown', onRemovePopupSuccessEscKeydown)

// функция закрытия попапа успеха по нажатию любой клавиши
const onRemovePopupSuccessAnyClick = (evt) => {
  if (evt.target.classList.contains('success') || evt.target.classList.contains('success__message')) {
    onRemovePopupSuccess()
  }
}

// функция закрытия попапа успеха на любой клик мыши
document.addEventListener('click', onRemovePopupSuccessAnyClick)

// функция закрытия попапа успеха
const onRemovePopupSuccess = () => {
  const successPopup = document.querySelector('.success')
  successPopup.remove()
}

// функция показа попапа ошибки загрузки формы
const showErrorPopup = () => {
  const errorTemplate = document.querySelector('#error').content
  const errorElementPopup = errorTemplate.cloneNode(true)
  document.body.append(errorElementPopup)
  document.querySelector('.error__button').addEventListener('click', onRemovePopupError)
}

// функция закрытия попапа ошибки по кнопке
const onRemovePopupError = () => {
  document.querySelector('.error').remove()
}

// функция закрытия окна ошибки по нажатию любой клавиши
const onRemovePopupErrorAnyClick = (evt) => {
  if (evt.target.classList.contains('error') || evt.target.classList.contains('error__message')) {
    onRemovePopupError()
  }
}

// хэндлер закрытия попапа ошибки на любой клик мыши
document.addEventListener('click', onRemovePopupErrorAnyClick)

// функция закрытия попапа ошибки по esc
const onRemovePopupErrorEscKeydown = (evt) => {
  if (document.querySelector('.error') && isEscapeKey(evt)) {
    onRemovePopupError()
  }
}

// хэндлер закрытия попапа ошибки на esc
document.addEventListener('keydown', onRemovePopupErrorEscKeydown)

// функция показа ошибки при получении данных с сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div')
  alertContainer.style.zIndex = 100
  alertContainer.style.position = 'absolute'
  alertContainer.style.left = 0
  alertContainer.style.top = 0
  alertContainer.style.right = 0
  alertContainer.style.padding = '10px 3px'
  alertContainer.style.fontSize = '30px'
  alertContainer.style.textAlign = 'center'
  alertContainer.style.backgroundColor = 'red'

  alertContainer.textContent = message

  document.body.append(alertContainer)

  setTimeout(() => {
    alertContainer.remove()
  }, ALERT_SHOW_TIME)
}

// функция проверки загруженного файла на нужный тип
const isValidateTypeFile = (file) => {
  return FILE_TYPES.some((it) => file.endsWith(it))
}

const debounce = (callback, timeoutDelay) => {
  let timeoutId
  return (...rest) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay)
  }
}

export { debounce }
export { isValidateTypeFile }
export { showSuccess, showErrorPopup, showAlert }
export { getEndingRooms }
export { getEndingGuests }
export { getType }
export { getFeaturesList }
