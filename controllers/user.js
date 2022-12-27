import Jwt from "jsonwebtoken"
import { db } from "../connect.js"

export const getUser = (req, res) => {
    const userId = req.params.userId
    const q = "SELECT * FROM users WHERE id=?"

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0];
        return res.json(info)
    })
}
// export const getNews = async (req, res) => {
//     const searchId = req.params.searchId;
//     let requestEndpoint = `https://api.currentsapi.services/v1/search?keywords=${searchId}&language=en&apiKey=sRm4uU7AOS5nIyJilHwoxsoKCkbbDRsfRMI2KZWLwqbjAVK0`
//     const fetchOptions = {
//         method: 'GET'
//     }
//     const response = await fetch(requestEndpoint, fetchOptions);
//     const jsonResponse = await response.json();
//     res.json(jsonResponse);
// }


export const searchUser = (req, res) => {
    // const searchValue = req.query.searchId
    // const q = "SELECT * FROM users WHERE username LIKE '%?%'"
    const q = "SELECT * FROM users WHERE username LIKE " + db.escape('%' + req.query.searchId + '%')
    // console.log(req.query.searchId);


    db.query(q, [req.query.searchId], (err, data) => {
        if (err) return res.status(500).json(err)
        // const { password, ...info } = data;
        return res.json(data)
    })
}

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Authenticated!");

    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        const q = "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=?,`facebook`=?,`instagram`=?,`twitter`=?,`linkedin`=?,`github`=? WHERE id=?";
        db.query(q, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.profilePic,
            req.body.coverPic,
            req.body.facebook,
            req.body.instagram,
            req.body.twitter,
            req.body.linkedin,
            req.body.github,
            userInfo.id
        ], (err, data) => {
            if (err) res.status(500).json(err)
            if (data.affectedRows > 0) return res.json("Updated")
            return res.status(403).json("You can update only your post")
        })
    })
}

