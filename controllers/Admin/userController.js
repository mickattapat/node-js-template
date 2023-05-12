var { api: loggerApi, apiOutPut: loggerOut } = require("../../utils/logger")
const { validationResult } = require("express-validator")
const { ErrorBadRequest, ErrorNotfound, FormatErr } = require("../../utils/appError");
const { User } = require("../../db/index");

exports.findAllUsers = ((req, res, next) => {
  User.findAll().then(data => {
    loggerOut.info()
    res.status(200).send(data);
  }).catch((err) => {
    const error = FormatErr(err)
    loggerOut.error()
    res.status(404).send(ErrorBadRequest(error.message))
  })
})


exports.createUser = (async (req, res, next) => {
  const data = req.body
  const users = await User.findOne({ where: { username: data.username } });
  if (users === null) {
    User.create({
      username: data.username,
      password: data.password,
      role: 'admin',
      status: 'true'
    }).then(data => {
      loggerOut.info()
      res.status(200).send(data)
    }).catch((err) => {
      const error = FormatErr(err)
      loggerOut.error()
      res.status(400).send(ErrorBadRequest(error.message))
    })
  } else {
    loggerOut.error()
    res.status(400).send(ErrorBadRequest('user is aready !'))
  }
})

exports.updateUser = ((req, res, next) => {
  const data = req.body
  User.update(data, { where: { uid: req.params.id } }).then(data => {
    if (data[0] > 0) {
      User.findByPk(req.params.id).then(data => {
        loggerOut.info()
        res.status(200).send({ success: { msg: "updated successfully." } })
      })
    } else {
      loggerOut.error()
      res.status(404).send(ErrorBadRequest('data not found !'))
    }
  }).catch((err) => {
    const error = FormatErr(err)
    loggerOut.error()
    res.status(400).send(ErrorBadRequest(error.message))
  })
})