const express = require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000 ;
require('dotenv').config();

app.use(express());
app.use(cors());


async function run (){
    try{

    }
    finally{

    }
}
run().catch(err => console.log(err))

app.get('/', (req, res)=>{
    res.send('photography server on')
})

app.listen(port, ()=>{
    console.log(`Photography server running on  ${port}`);
})
