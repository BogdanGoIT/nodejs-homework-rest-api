const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env
console.log(SECRET_KEY);

const login = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    // чи є користувач з таким Email ?
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong") // HttpError(401, "Email invalid)
    }

    // порівнюємо пароль який прийшов з тим що зберігається в БД
    const passwordCompare = bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong") // // HttpError(401, "password invalid)
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
    })

}

module.exports = login;