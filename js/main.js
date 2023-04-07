import { creatingUnactiveState } from '../../../../../js/state.js'
import '../../../../../js/render.js'
import '../../../../../js/form.js'
import '../../../../../js/map.js'
import '../../../../../js/range.js'
import '../../../../../js/api.js'

import {getData} from '../../../../../js/api.js'
function onSuccess1(data){
  console.log(data);
}
function onError1(err){
  console.log(err);
}
getData(onSuccess1, onError1)