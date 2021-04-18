const firebase = require('../config/firebase')
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')

class UserController {
  static register(req, res) {
    const admin = {
      email: 'admin@mail.com', 
      password: hashPassword('123456'),
      name: 'admin'
    }
    firebase.database().ref('users/1').set(admin, (err) => {
      if (err) {
        return res.status(500).end()
      } else {
        return res.status(201).json({ message: 'Registered Successfully' })
      }
    })  
  }
  static login(req, res) {
    const email = "admin@mail.com"
    const password = "123456"
    
    firebase.database().ref("users").on('value', (snapshot) => {
      const data = snapshot.val();
      // console.log(data)
      let user = data.filter(user =>  user.email === email)
      if (user[0] && comparePassword(password, user[0].password)) {
        let access_token = generateToken({ email: user[0].email })
        return res.status(200).json({ access_token })
      } else {
        return res.status(401).json({ message: 'Invalid Email/Password'})
      }
    });
  }

  static getUserProfile(req, res) {
    let email = req.user.email
    firebase.database().ref("users").on("value", (snapshot) => {
      const data = snapshot.val();
      let user = data.filter(user => user.email === email)
      return res.status(200).json({ email: user[0].email, name: user[0].name }),
      
      function (errorObject) {
        return res.status(errorObject.code).json({ message: 'Error' })
      }
    })
  }
}

module.exports = UserController