import bcryptjs from "bcryptjs"
import {Request, Response, NextFunction } from "express"

const hashPass = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body.password) {
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(req.body.password, salt)
            req.body.password = hashedPassword
            next()
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export default hashPass