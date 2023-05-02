import { setUploadFormSubmit } from './form.js'
import { getData } from './api.js'
import { showAlert, debounce } from './util.js'
import { initFilters, filterData } from './filters.js'
import { addMarkersToMaps, setStartCoordinats } from './map.js'

const RERENDER_DELAY = 500

getData((data) => {
  addMarkersToMaps(data)

  initFilters(
    debounce(
      () => { addMarkersToMaps(filterData(data)) },
      RERENDER_DELAY
    )
  )
}, showAlert)

setUploadFormSubmit(setStartCoordinats)
