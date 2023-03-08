import express from "express"
import dotenv from "dotenv"
import cors from "cors"

// database import 
import "./database/dbConnection"
dotenv.config()

// routes import 
import authRoute from "./routes/auth"
import userRoute from "./routes/user"

const app = express()
const PORT = process.env.PORT || 3025
app.use(express.json())
app.use(cors())
// user routes 
app.use('/auth', authRoute)
app.use('/user', userRoute)



app.get('/', (req, res, next) => {
    res.status(200).json({message : "All greate!"})
})

app.listen(PORT, (): void => {
    console.log(`Server is started at http://localhost:${PORT}`)
})