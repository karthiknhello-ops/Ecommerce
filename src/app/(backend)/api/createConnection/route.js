import mongoose from "mongoose";

const connectDb = async()=>{
  if(mongoose.connections[0].readyState){
    console.log("connected--->")
    return mongoose.connection;
}
try{
await mongoose.connect(process.env.MONGO_URL)
console.log("new connection created")
return mongoose.connection;
}catch(error){
    console.error("error",error)
}  
}

export default connectDb;
