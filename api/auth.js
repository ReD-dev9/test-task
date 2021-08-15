const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Users = require('../models/Users');
const { loginValid, registerValid } = require('../validation');

const bcrypt = require('bcryptjs');

router.post('/register', async(req, res) => {
    const { error } = registerValid(req.body);
    const { name, email, password } = req.body;

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailCheck = await Users.findOne({ email });

    if (emailCheck) {
        return res.status(400).send('Email arlready exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
        name: name,
        email: email,
        password: hashPassword,
    });

     const token = jwt.sign(
    { user_id: user._id, email },
            process.env.TOKEN_KEY,
     {
                expiresIn: "2h",
            }
     );
     user.token = token;

    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async(req, res) => {
    const { error } = loginValid(req.body);
    const { email, password } = req.body;
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(400).send('Email wrong');
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
    res.header('auth-token', token).send(token);
});

router.get('/profile', (req, res) => {
    const token = req.headers.authorization.replace(/^Bearer\s+/, "");
    if (token) {
        try {
            decoded = jwt.verify(token, process.env.TOKEN_KEY);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }

        const userId = decoded._id;
        Users.findById(userId).then(items => res.json(items));
    }
});

router.ws('/auth',  function (ws, req) {
    ws.on('message', async function (data) {
        const userData = JSON.parse(data);
        const { error } = loginValid(userData);

        const { email, password } = userData;
        if (error) {
            ws.send(error.details[0].message);
        }
        const user = await Users.findOne({ email });
        if (!user) {
           ws.send(JSON.stringify({message:'Неверный email', statusAuth:false}));
        }
        if(user) {
            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass) {
                ws.send(JSON.stringify({message:'Неверный пароль', statusAuth:false}));
            }
            else {
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
                ws.send(JSON.stringify({message: token, statusAuth:true}));
            }
        }
    });
});



module.exports = router;