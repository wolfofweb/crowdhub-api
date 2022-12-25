import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    //CHECK USER IF EXISTS

    const q = "SELECT * FROM users WHERE username=?"

    db.query(q, [req.body.username], (err, data) => {
        //500- server connectivity error code
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("User already exists!")
        //CREATE A NEW USER
        //HASH THE PASSWORD(FOR SECURITY)
        //GENERATE SALT 
        const salt = bcrypt.genSaltSync(10);
        //SYNC SALT WITH OUR INPUT PASSWORD AND HASH IT
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users( `username`,`email`,`password`,`name`) VALUE (?)"
        //using hashed password for database input
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("User has been created")
        })
    })

}
export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username=?"
    db.query(q, [req.body.username], (err, data) => {
        //CHECK WHETHER ACCOUNT EXISTS
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(404).json("User not found")

        //IF ACCOUNT EXISTS, GET PASSWORD AND MATCH WITH THE USERNAME DATA(data[0]) ARRAY
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        //IF PW IS WRONG
        //STATUS 400 - WRONG INPUTS
        if (!checkPassword) return res.status(400).json("Wrong Username or Password")

        //JSON WEB TOKEN CREATION HERE
        const token = jwt.sign({ id: data[0].id }, "secretkey")
        //DESTRUCTURING AND REMOVING THE PW SEPERATELY
        const { password, ...others } = data[0]
        //STORE USERDATA IT INTO USER COOKIE
        //httpOnly=>only our script can access the cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    })

}
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        //ADDITIONAL SECURITY CONFIGURATIONS
        secure: true,
        sameSite: "none",
    }).status(200).json("User has been logged out")
}