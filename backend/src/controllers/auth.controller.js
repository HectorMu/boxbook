const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helpers')
const nodeMailer = require('../lib/nodemailer')
const { validateEmail } = require('../helpers/helpers')
const { prisma } = require('../prisma')
const controller = {}

controller.Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findFirst({ where: { email } })

    if (!user)
      return res.status(400).json({
        status: false,
        statusText: 'Wrong credentials, check it out.'
      })

    const passwordComparationResult = await helpers.matchPassword(
      password,
      user.password
    )

    if (!passwordComparationResult)
      return res.status(400).json({
        status: false,
        statusText: 'Wrong credentials, check it out.'
      })

    const payload = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      email: user.email
    }

    const AccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

    const SessionData = {
      ...payload,
      AccessToken
    }

    return res.status(200).json({
      status: true,
      statusText: 'Welcome',
      SessionData
    })
  } catch (error) {
    console.log(error)
    return res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." })
  }
}

controller.Signup = async (req, res) => {
  try {
    if (!validateEmail(req.body.email)) {
      return res
        .status(200)
        .json({ status: false, statusText: 'Provide a valid email' })
    }

    const user = await prisma.user.findFirst({
      where: { email: req.body.email }
    })

    if (user) {
      return res.json({
        status: false,
        statusText: 'An account is using this email already, try another email.'
      })
    }

    const newUser = {
      ...req.body,
      yearlyGoal: 0,
      booksReaded: 0
    }

    newUser.password = await helpers.encryptPassword(newUser.password)
    await prisma.user.create({ data: { ...newUser } })
    res.status(200).json({
      status: true,
      statusText: 'Registered, now Log in to continue!'
    })
  } catch (error) {
    console.log(error)
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." })
  }
}

// controller.sendRecoverEmail = async (req, res) => {
//   const { email } = req.body
//   const results = await connection.query(
//     'select * from users where email = ?',
//     [email]
//   )
//   const user = await prisma.user.findFirst({ where: { email } })

//   if (!user) {
//     return res.status(200).json({
//       status: false,
//       statusText: 'Provided email invalid, no existing account with this email.'
//     })
//   }

//   nodeMailer.Send(req, res)
// }
controller.VerifyRecoverEmailToken = (req, res) => {
  const { ResetToken } = req.params
  try {
    const decodedResetToken = jwt.verify(
      ResetToken,
      process.env.EMAIL_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            status: false
          }
          return
        } else {
          return {
            status: true,
            decoded
          }
        }
      }
    )

    if (!decodedResetToken.status)
      return res
        .status(200)
        .json({ status: false, statusText: 'Invalid token, token expired' })

    res.status(200).json({ status: true, statusText: 'Valid token' })
  } catch (error) {
    res.status(200).json({
      status: false,
      statusText: 'Invalid token, token malformed or expired'
    })
  }
}

controller.ResetPassword = async (req, res) => {
  const { ResetToken } = req.params
  const { password } = req.body

  try {
    const decodedResetToken = jwt.verify(
      ResetToken,
      process.env.EMAIL_TOKEN_SECRET
    )

    const { id } = decodedResetToken

    const hashedPassword = await helpers.encryptPassword(password)

    await prisma.user.update({
      data: { password: hashedPassword },
      where: { id }
    })

    res.status(200).json({ status: true, statusText: 'Password changed' })
  } catch (error) {
    res.status(200).json({
      status: false,
      statusText: "Something wen't wrong, try again later."
    })
  }
}
module.exports = controller
