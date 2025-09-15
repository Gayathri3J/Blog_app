const express = require('express');
const router = express.Router();
const userModel = require('../model/userData');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }
        //jwt token generation
        //if user is found, check password
        try {
            if (user.password == req.body.password) {
                const payload = { email: req.body.email, password: req.body.password };
                const token = jwt.sign(payload, "secret");
                res.status(200).send({ message: "Login Successfull", token: token });
            }
        }
        catch (error) {
            console.error(error)
            res.status(500).send({ message: "error" });
        }
    })
module.exports = router;


// const express = require('express');
// const router = express.Router();
// const userModel = require('../model/userData');

// router.post('/login', async (req, res) => {
//     const 
//     try {
//         console.log("Incoming:", req.body);
//         const user = await userModel.findOne({ email: req.body.email });
//         console.log("DB User:", user);

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }
//         if (user.password.trim() === req.body.password.trim()) {
//             return res.status(200).send({ message: "Login Successfull" });
//         } else {
//             return res.status(401).send({ message: "Invalid Password" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "error" });
//     }
// });

// module.exports = router;
