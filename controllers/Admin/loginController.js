// jwt
var jwt = require('jsonwebtoken')

exports.loginUser = (async (req, res, next) => {
  var token = jwt.sign({ id: req.user.uid }, "api-development", { expiresIn: "1y" })
  // var token = jwt.sign({ id: req.user.uid }, "api-development", { expiresIn: 60 * 15 })
  res.send({ success: { msg: req.__('success.signin'), token, token_type: 'bearer', user: req.user } })
})

exports.getProfile = (async (req, res, next) => {
  res.send(req.user)
})