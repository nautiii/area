const bcrypt = require('bcryptjs');

const hashPassword  = async (password) => {
    const passwordSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, passwordSalt)
    return hashedPassword
}

module.exports.hashPassword = hashPassword