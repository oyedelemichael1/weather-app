const request=require('request')


//&limit=1 is used to get only one place with that name...usage found in the mapbox website
// const geocode='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWljaGFlbDE0NzI5NCIsImEiOiJja2EzcTN3Z2kwZWluM3JwOTExZnRsN2RnIn0.P5cKnUIt-d65kmjirMaTEQ&limit=1'
// request({url:geocode,json:true},(error,response)=>{
//     if(error){
//         console.log('cannot connect to mapbox')
//     }else if(response.body.features.length==0){
//         console.log('place not found')
//     }else{
//         console.log('place is '+response.body.features[0].text)
//         console.log('longitude and latitude are '+response.body.features[0].center[0]+', '+response.body.features[0].center[1])
//     }
//     })
const geocode=((address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoibWljaGFlbDE0NzI5NCIsImEiOiJja2EzcTN3Z2kwZWluM3JwOTExZnRsN2RnIn0.P5cKnUIt-d65kmjirMaTEQ&limit=1'
    request({url,json:true},(error,{body}={})=>{// request({url:url,json:true},(error,response)=>{
        if(error){
            callback('cannot connect to mapbox',undefined)
                    //console.log('cannot connect to mapbox')
        }else if(body.features.length==0){//else if(response.body.features.length==0){
            callback('cannot find location,try another search', undefined)
                    //console.log('place not found')
        }else{
            const data={
                longitude:body.features[0].center[1],//response.body.features[0].center[1],,and others below
                latitude:body.features[0].center[0],
                location:body.features[0].place_name
            }
            callback(undefined,data)
    
                    // console.log('place is '+response.body.features[0].text)
                    // console.log('longitude and latitude are '+response.body.features[0].center[0]+', '+response.body.features[0].center[1])
                }
    })
    
    })

    module.exports= geocode