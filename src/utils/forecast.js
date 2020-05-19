const request=require('request')

//const url='http://api.weatherstack.com/current?access_key=40057a8e98deeb85daeb20c59d22b881&query=6.9149,3.6649&units=m'//units=m formetric,s for scientific and f for fahrenheit
//units usage canbe found in the api website under documentation


/*request({url: url}, (error,response)=>{
    const data= JSON.parse(response.body)
    console.log(data.current)
})*/

//just like above but we set json to true, which means we dont nee to parse by calling JSON anymore
//found in the npm webpage for request
/*request({url: url, json:true}, (error,response)=>{
   //console.log(response.body.current)
   if(error){
        console.log('cannot connect to weather stack')
   }else if(response.error){
        console.log('Unable to find location')
   }else{
    console.log(response.body.current.weather_descriptions[0] +' It is currently '+response.body.current.temperature+' degrees out. It fells like '+response.body.current.feelslike+' degrees out.')
   }
})*/

const forecast=((longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=40057a8e98deeb85daeb20c59d22b881&query='+longitude+','+latitude+'&units=m'//units=m formetric,s for scientific and f for fahrenheit
request({url,json:true},(error,{body}={})=>{
    if(error){
        callback('cannot connect to weather stack',undefined)
   }else if(body.error){
        callback('Unable to find location',undefined)
   }else{
        const data={

          message: body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature+' degrees out. It fells like '+body.current.feelslike+' degrees out.',
          humidity: body.current.humidity,
          time: body.location.localtime
        }
      callback(undefined,data)
   }
})
})

module.exports=forecast