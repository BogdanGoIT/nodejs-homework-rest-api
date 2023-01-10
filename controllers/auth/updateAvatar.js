const fs = require("fs").promises;
const path = require("path");
const Jimp = require('jimp');

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const { path: tmpUpload, originalname } = req.file;
    const { _id } = req.user;
    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(tmpUpload, resultUpload);

    Jimp.read(resultUpload, (err, Image) => {
    if (err) throw err;
    Image
        .resize(250, 250) // resize
        .write(resultUpload); // save
    });

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    })
}

module.exports = updateAvatar;