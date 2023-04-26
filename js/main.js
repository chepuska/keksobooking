import { deactivate } from './state.js';
console.log('-inactivating-')
// deactivate()

import {getData} from './api.js'
import { addMarkersToMaps } from './map.js'
import { showAlert } from "./util.js";
import './form.js';
import {initFilters, filterData} from'./filters.js';
import { debounce } from './util.js';
// window.addEventListener('load', creatingUnactiveState)
const RERENDER_DELAY =500
getData((data)=>{
  addMarkersToMaps(data);

  initFilters(
    debounce(
       () => {addMarkersToMaps(filterData(data))}, 
        RERENDER_DELAY
        )
  )
}, showAlert)


