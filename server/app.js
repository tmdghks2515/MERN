import express from 'express'
import mongoose from "mongoose"
import config from './config'
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";

//router
import postRouter from "./router/api/post"
import userRouter from "./router/api/user"

const app = express()
const {MONGO_URI}  = config

app.use(hpp())
app.use(helmet())
app.use(cors({origin: true, credentials: true}))
// 모든 Url에 cors 허용,  지금 설정한 cors 설정을 헤더에 포함
app.use(morgan("dev"))

app.use(express.json())

mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
    })
    .then(() => {console.log("MongoDB connecting Success!!")})
    .catch((e)=>{console.log(e)})

    // use router
    app.get('/')
    app.use("/api/post", postRouter)
    app.use("/api/user", userRouter)

export default app