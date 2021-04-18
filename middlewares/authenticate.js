const { verifyToken } = require("../helpers/jsonwebtoken")
const firebase = require('../config/firebase')

function authenticate (req, res, next) {
  try {
    const decoded = verifyToken(req.headers.access_token)
    firebase.database().ref("users").on('value', (snapshot) => {
      const data = snapshot.val();
      let user = data.filter(user =>  user.email === decoded.email)
      if (user[0]) {
        req.user = user[0]
        next()
      } else {
        return res.status(401).json({ message: 'You need to login first'})
      }
    });
  } catch (error) {
    return res.status(401).json({ message: "You need to login first" })
  }
}

module.exports = authenticate