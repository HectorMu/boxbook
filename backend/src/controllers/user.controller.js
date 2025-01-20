const { prisma } = require('../prisma')
const helpers = require('../helpers/helpers')

const controller = {}

controller.checkUserYearlyGoal = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    })

    if (user.yearlyGoal > 0) {
      return res.json({ status: true, statusText: 'Has yearly goal' })
    }

    res.json({ status: false, statusText: 'NotSetted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.setYearlyGoal = async (req, res) => {
  const { goal } = req.body

  try {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { yearlyGoal: Number(goal) }
    })

    res.status(200).json({ status: true, statusText: 'Goal setted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.ListAll = async (req, res) => {
  try {
    res.json({ Data: 'Im the data' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.editProfile = async (req, res) => {
  const data = req.body
  const { id } = req.user

  try {
    if (data.password) {
      data.password = await helpers.encryptPassword(data.password)
    }

    await prisma.user.update({
      where: { id },
      data
    })

    res.status(200).json({ status: true, statusText: 'Profile edited!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.getProfile = async (req, res) => {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: req.user.id }
    })

    res.json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.getFriends = async (req, res) => {
  try {
    const friends = await prisma.user.findMany({
      where: { receiver: req.user.id }
    })

    res.json(friends)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.ListOne = async (req, res) => {
  res.json({ status: true, statusText: 'ListOne not implemented yet.' })
}

controller.Save = async (req, res) => {
  res.json({ status: true, statusText: 'Save not implemented yet.' })
}

controller.Update = async (req, res) => {
  res.json({ status: true, statusText: 'Update not implemented yet.' })
}

controller.Delete = async (req, res) => {
  res.json({ status: true, statusText: 'Delete not implemented yet.' })
}

module.exports = controller
