const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env
console.log(SECRET_KEY);

const login = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong") // HttpError(401, "Email invalid)
    }

    const passwordCompare = bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong") // // HttpError(401, "password invalid)
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    
    res.json({
        token,
    })

}

module.exports = login;