const path=require('path')
const express=require('express')
const hbs=require('hbs')//to use partials i.e headers and footers
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()



const publicdirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')//customize view directory
const partialsPath=path.join(__dirname,'../templates/partials')//customize partials directory

app.set('view engine','hbs')//setting up handlebars
app.set('views',viewPath)// customize view, since express only recognizes 'view' as the folder where hbs files are stored, but we want to use'templates'
hbs.registerPartials(partialsPath)//used once to register partials path to hbs


app.use(express.static(publicdirectory))//used to customize the server to serve up a folder
//app.use(express.static(__dirname,'../public'))
/*app.get('',(req, res)=>{//takes in the route '' or/home or/about. and a function of what will be done at that route
//the function takes in the request and the response
res.send('hello Express!')
})*/ //No longer needed since index.html has become the default page

// app.get('/help',(req, res)=>{
//     res.send('help page!')
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })
// app.get('/weather',(req,res)=>{
//     res.send({forecast:'30 degrees',location: 'lagos, Nigeria'})
// })No longer needed since we are using .html

app.get('',(req,res)=>{
   
    res.render('index',{
        title:'weather app',
        name: 'Michael Oyedele'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Oyedele Michael'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Here is everything you need to know',
        name:'Oyedele Michael',
        title:'Help page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
      return  res.send({
            error:'Add an address'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location ,
                address: req.query.address
            })

    })

    }   
    )
   
    // res.send({
    //     address: req.query.address
    // })
   
})

// app.get('/product',(req,res)=>{
  
//     if( !req.query.search){
//         return res.send({error:'Error'})

//     }
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Oyedele Michael',
        title:'Error',
        errorMessage:'Help page not found'

    })
})
app.get('/*',(req,res)=>{
    res.render('404',{
        name:'Oyedele Michael',
        title:'Error',
        errorMessage:'page not found'

    })
})

app.listen(3000,()=>{//the function is optional.
    console.log('server is up on port 3000')
})//used to start thing up