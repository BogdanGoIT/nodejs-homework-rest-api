const { Contact } = require("../../models/contact");

const add = async (req, res) => {

    // переименовать id на owner
    const { _id: owner } = req.user;

    // знайди в колекціїї Contacts
    const result = await Contact.create({...req.body, owner});

    res.status(201).json(result)
  
}

module.exports = add;