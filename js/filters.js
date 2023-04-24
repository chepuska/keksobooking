
const ARTICLE__COUNT =10;

function getRankFeatures(object){
  if(object.offer.features){
    return object.offer.features.length
  }
}

function sortByAmountFeatures(object1, object2) {
    let rankObject1 = getRankFeatures(object1)
    
  let rankObject2 = getRankFeatures(object2)
  if(rankObject1 && rankObject2){
    console.log('rankObject1 : '+rankObject1);
    console.log('rankObject2 : '+rankObject2);
    return rankObject2-rankObject1
  }else{
    return
  }
  
  
  
}

  const mapFiltersForm =document.querySelector('.map__filters')

function filterData (data) {
  const housingType = mapFiltersForm.querySelector('select[name="housing-type"]').value
  const price = mapFiltersForm.querySelector('select[name="housing-price"]').value
  let rooms  = mapFiltersForm.querySelector('select[name="housing-rooms"]').value
  let guests = mapFiltersForm.querySelector('select[name="housing-guests"]').value
  let features = mapFiltersForm.querySelectorAll('input[name="features"]')
  //получаем массив отмеченных features
  let featureChecked = Array.from(features).map((feature)=>{
    if(feature.checked){
      return feature.value
    }
  }).filter(i=>i!==undefined)
  console.log('featureChecked :' +featureChecked);

  return data
    .filter(i => housingType === 'any' || i.offer.type === housingType)
    .filter(i => {
      if(price ==='any'){
        return true;
      }else if(price==='middle'){
        return i.offer.price >= 10000 && i.offer.price <=50000;
      }else if(price === 'low'){
        return i.offer.price < 10000;
      }else if(price ==='high'){
        return i.offer.price > 50000;
      }
    })
    .filter ((i) => rooms === 'any' || i.offer.rooms === +rooms)
    .filter((i) => guests ==='any' || i.offer.guests === +guests) 
    .slice()
    .sort(sortByAmountFeatures)
    .filter((i)=>{
      let featuresArray = i.offer.features;
      return (featuresArray && featureChecked.every(j=>featuresArray.includes(j)))
    })
    
    .slice(0, ARTICLE__COUNT)
}

function initFilters (cb) {
  const typeHosting =mapFiltersForm.querySelector('select[name="housing-type"]')
  const price = mapFiltersForm.querySelector('select[name="housing-price"]')
  const rooms = mapFiltersForm.querySelector('select[name="housing-rooms"]')
  const guests = mapFiltersForm.querySelector('select[name="housing-guests"]')
  const features = mapFiltersForm.querySelectorAll('input[name="features"]')
  typeHosting.addEventListener('change', cb)
  price.addEventListener('change', cb)
  rooms.addEventListener('change', cb)
  features.forEach((i)=>i.addEventListener('change', cb))
}

export {initFilters, filterData}