import express from "express"
import mongoose from "mongoose"
const app = express();
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js"
import productRoute from "./routes/product.js"






dotenv.config()
mongoose.set('strictQuery', true);

app.use(cookieParser())
app.use(express.json())
app.use(cors());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))

app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))





const PORT = process.env.PORT || 8800
// routes

app.use("/api/user",userRoute)
app.use("/api/product",productRoute)


mongoose.connect(process.env.MONGO_URL ).then(()=>{
    console.log("mongo Db is successfull connected");
    app.listen(PORT , console.log(`server is running at port ${PORT}`))

}).catch((error)=>console.log(error))