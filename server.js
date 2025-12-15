import dotenv from "dotenv";
import express from "express";
import { mongoose } from "mongoose";
import userRoute from './Route/user.js'
import  ProductRoute from "./Route/product.js";

dotenv.config();
const server= express()
server.use(express.json());


console.log(`My name is Blessing`)

server.get('/', (req, res) => (
  res.send('Hello Blessing')
));

//Routes
server.use('/api/users', userRoute)

server.get('/', (req, res)=> {
  res.send('Hello Blessing')
})

mongoose.connect(process.env.MONGODB_URL)
.then(() => { console.log("Connected to my Database BLESSING")
}).catch(() => {
  console.log('E knw Connect oh')
})
server.listen(process.env.PORT, () => {
console.log(`app is running in port 3000` );
});
server.use('/api/user', userRoute)
server.use('/api/product', ProductRoute)