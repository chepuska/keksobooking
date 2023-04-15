import {getData} from './api.js'
import { addMarkersToMaps } from './map.js'
import { showAlert } from "./util.js";
import './form.js'
import { creatingUnactiveState } from './state.js';
// creatingUnactiveState()
// window.addEventListener('load', creatingUnactiveState)
getData(addMarkersToMaps, showAlert)


