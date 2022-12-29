const { User } = require("../../models/user");

const logout = async (req, res) => {
    const { _id } = req.user;
    console.log(_id);
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message: "Logout success"
    })
}

module.exports = logout;