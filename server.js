//Import express dependency and create instance of app object
const express = require('express');
const app = express();
//Local host port
const PORT = process.env.PORT || 3000;
//Middleware
app.use(express.static('public'));
//Get request, root directory
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/home.html')
})
//Server listen on defined port
app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})
