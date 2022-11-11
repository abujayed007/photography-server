const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5001 ;
require('dotenv').config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lugl172.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run (){
    try{
  const serviceCollection = client.db("photography").collection("service");
 const cliendReviews = client.db("photography").collection("clientReviews");

  // service items
  
  app.get('/services',  async (req, res)=>{
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const query = {}
    const cursor = serviceCollection.find(query)
    const services = await cursor.skip(page * size).limit(size).toArray()
    const count = await serviceCollection.estimatedDocumentCount();
    res.send({services, count})
  });

  app.get('/services/:id', async(req, res)=>{
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const service = await serviceCollection.findOne(query);
    res.send(service);
  });

  //  review items

 

  app.get('/review', async (req, res) => {
    let query = {}
    if (req.query.serviceId) {
      query = {
        serviceId: req.query.serviceId
      }
    }
    const cursor = cliendReviews.find(query)
    const review = await cursor.toArray()
    res.send(review)
  })
 


  app.get('/review', async (req, res) => {

    let query = {}
    if(req.query.email){
      query ={
        email: req.query.email
      }
    }
    const cursor = cliendReviews.find(query);
    const result = await cursor.toArray();
    res.send(result);
});

  app.post('/review', async (req, res)=>{
    const review = req.body;
    const result = await cliendReviews.insertOne(review);
    res.send(result)
  });
  
  app.delete('/review/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)}
    const result = await cliendReviews.deleteOne(query)
    res.send(result)
  })

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
