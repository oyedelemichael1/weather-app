//console.log('client side javaScript is loading...')

const weatherForm=document.querySelector('form')
const search =document.querySelector('input')
const messageOne=document.querySelector('#message1')
const messageTwo=document.querySelector('#message2')
const message3=document.querySelector('#localtime')
const message4=document.querySelector('#humidity')
const message0=document.querySelector('#address')

weatherForm.addEventListener('submit',(e)=>{
    
    e.preventDefault()
    const location=search.value
    //console.log(location)
    messageOne.textContent="loading..."
    messageTwo.textContent=""
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data={})=>{
        console.log(data)
        if(data.error){
            //console.log(data.error)
            messageOne.textContent=data.error
            messageTwo.textContent=""
        }
        else{
            message0.textContent=  "Address:        "+data.address
            messageOne.textContent="Location:       "+data.location
            messageTwo.textContent="Forecast:       "+data.message
            message3.textContent=  "Local Time:     "+data.time
            message4.textContent=  "Humidity:       "+data.humidity
            //console.log(data.location)
            //console.log(data.forecast)
        }
    })
})
  
  
})

