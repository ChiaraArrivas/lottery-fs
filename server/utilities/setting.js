const { Setting } = require("../db");

const retriveDrawSettings = async () => {
    try {
        return await Setting.findOne({ key: "DRAWS_SETTINGS" }, "-__v", { lean: true });
    } catch(err) {
        throw err;
    }
}


module.exports = {
    retriveDrawSettings
}