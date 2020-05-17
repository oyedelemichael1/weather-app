//console.log('client side javaScript is loading...')

const weatherForm=document.querySelector('form')
const search =document.querySelector('input')
const messageOne=document.querySelector('#message1')
const messageTwo=document.querySelector('#message2')


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
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            //console.log(data.location)
            //console.log(data.forecast)
        }
    })
})
  
  
})

