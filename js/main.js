import { deactivate } from './state.js';
console.log('-inactivating-')
// deactivate()

import {getData} from './api.js'
import { addMarkersToMaps } from './map.js'
import { showAlert } from "./util.js";
import './form.js';
import {initFilters, filterData} from'./filters.js';

// window.addEventListener('load', creatingUnactiveState)
getData((data)=>{
  addMarkersToMaps(data);
  initFilters(_ => {
    addMarkersToMaps(filterData(data))
  })
}, showAlert)


