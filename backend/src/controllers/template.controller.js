const jwt = require('jsonwebtoken')

const controller = {}

controller.test = (req, res) => {
  res.json({ Test: 'Hi, im working' })
}

controller.ListAll = async (req, res) => {
  const userData = req.AccessToken
  console.log(userData)
  res.json({ Data: 'Im the data' })
}
controller.ListOne = async (req, res) => {}

controller.Save = async (req, res) => {}

controller.Update = async (req, res) => {}

controller.Delete = async (req, res) => {}

module.exports = controller
