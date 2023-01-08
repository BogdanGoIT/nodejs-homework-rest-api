const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
    // переименовать id на owner
    const { _id: owner } = req.user;

    // параметри запиту
    console.log("req.query - ", req.query);

    // параметри запиту за замовчуванням {page: 1, limit: 10}
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, { skip, limit}).populate("owner", "email")

    res.json(result);

}

module.exports = getAll;