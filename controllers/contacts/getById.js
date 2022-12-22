const constacts = require("../../models/contacts")

const { HttpError} = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await constacts.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  }
  catch (error) {
    next(error);

  }
}

module.exports = getById;