const express = require('express');
const app = express();
const ejs = require('ejs');
const session = require('express-session');
const bodyParser = require('body-parser')
//const secure = require('express-force-https');
//const {Datastore} = require('@google-cloud/datastore');
//const DatastoreStore = require('@google-cloud/connect-datastore')(session);
//require('dotenv').config()


const server = app.listen( process.env.PORT || 8000 , ()=>{
  console.log(`I'm mistenning ^^`)
})


//console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)


app.use(bodyParser())


 app.sessionMiddleware = session({
  name: 'new_session', 
   /*store: new DatastoreStore({
    kind: 'express-sessions',
    expirationMs: 1000*60*60*24,
    dataset: new Datastore({
      projectId: process.env.GCLOUD_PROJECT,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    })
  }),*/
  secret: 'FEF45454###ff45',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
  maxAge: 1000*60*60*24,
  secure: false
}
})
 



app.use(app.sessionMiddleware)




//app.use(secure);


app.use(express.static('public'));
const index = require('./routers/index')
const quiz = require('./routers/quiz')
const cavitiesRisk = require('./routers/cavities-risk.js')
const gumDiseaseRisk = require('./routers/gum-disease-risk.js')
const advice = require('./routers/advice.js')




app.use('/' , index)
app.use('/quiz' , quiz)
app.use(`/result` , cavitiesRisk)
app.use('/result' , gumDiseaseRisk)
app.use('/result' ,advice )


app.get('/new-quiz' , (req,res)=>{
	req.session.destroy()
	res.redirect('/quiz')
})





