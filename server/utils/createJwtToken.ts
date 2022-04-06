import {UserDate} from "../../pages";
import jwt from "jsonwebtoken";


interface ILoginData {
    email: string,
    password: string
}

export default (user: UserDate) => {
    const token = jwt.sign(
        {
            data: user,
        },
        process.env.JWT_SECRET || '',
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm: 'HS256'
        }
    )
    return token
}
