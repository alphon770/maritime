const express = require('express');
const app = express();



app.use(express.static('public'));





const server = app.listen( process.env.PORT || 8000 , ()=>{
  console.log(`I'm mistenning ^^`)
})
