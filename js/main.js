import { deactivate } from './state.js';
console.log('-inactivating-')
// deactivate()

import {getData} from './api.js'
import { addMarkersToMaps } from './map.js'
import { showAlert } from "./util.js";
import './form.js';


// window.addEventListener('load', creatingUnactiveState)
getData(addMarkersToMaps, showAlert)


