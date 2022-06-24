const bcrypt = require('bcryptjs')

const createPasswordHash = (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

const checkPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}
  
module.exports = {createPasswordHash, checkPassword};