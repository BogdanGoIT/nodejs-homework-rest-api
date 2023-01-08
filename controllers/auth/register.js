const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {

    const { email, password } = req.body;

    // чи є користувач з таким email ?
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    console.log("newUser", newUser);

    res.status(201).json({
        subscription: newUser.subscription,
        email: newUser.email,
    })
}

module.exports = register;

