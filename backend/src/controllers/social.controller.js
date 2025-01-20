const connection = require('../database')
const { prisma } = require('../prisma')

const controller = {}

controller.ListAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    return res.json(users)
  } catch (error) {
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." })
  }
}

controller.ListCatalog = async (req, res) => {
  try {
    const catalog = await prisma.userBook.findMany({
      where: { fk_user: req.params.id }
    })

    return res.json(catalog)
  } catch (error) {
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." })
  }
}

controller.acceptFriend = async (req, res) => {
  const { sender } = req.body

  const solitudeToAccept = {
    sender: Number(req.user.id),
    receiver: Number(sender),
    status: 'Friends'
  }

  try {
    const results = await prisma.friendship.findFirst({
      where: { sender: Number(sender), receiver: Number(req.user.id) }
    })

    if (results) {
      await prisma.friendship.create({ data: solitudeToAccept })

      await prisma.friendship.updateMany({
        where: {
          OR: [
            {
              sender: Number(sender),
              receiver: Number(req.user.id)
            },
            {
              sender: Number(req.user.id),
              receiver: Number(sender)
            }
          ]
        },
        data: {
          status: 'Friends'
        }
      })
    }

    await prisma.friendship.updateMany({
      where: {
        OR: [
          {
            sender: Number(sender),
            receiver: Number(req.user.id)
          },
          {
            sender: Number(req.user.id),
            receiver: Number(sender)
          }
        ]
      },
      data: {
        status: 'Friends'
      }
    })
    res.json({ status: true, statusText: 'Solitude accepted!' })
  } catch (error) {
    console.log(error)
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." })
  }
}

controller.addAsFriend = async (req, res) => {
  const { receiver } = req.body

  try {
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        sender: Number(req.user.id),
        receiver: Number(receiver)
      }
    })

    if (!existingFriendship) {
      await prisma.friendship.create({
        data: {
          sender: Number(req.user.id),
          receiver: Number(receiver),
          status: 'Pending'
        }
      })
    }

    res.json({ status: true, statusText: 'Added as a friend!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.removeFriend = async (req, res) => {
  const { receiver } = req.params
  const sender = req.user.id

  try {
    await prisma.friendship.deleteMany({
      where: {
        OR: [
          { sender: Number(sender), receiver: Number(receiver) },
          { sender: Number(receiver), receiver: Number(sender) }
        ]
      }
    })

    res.json({ status: true, statusText: 'Removed as a friend!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.ListSameLocation = async (req, res) => {
  try {
    const currentUser = await prisma.user.findFirst({
      where: { id: Number(req.user.id) }
    })

    const users = await prisma.user.findMany({
      where: {
        id: { not: req.user.id },
        country: currentUser.country,
        city: currentUser.city
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        booksReaded: true
      }
    })

    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.ListOne = async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findFirst({
      where: { id: Number(id) },
      select: {
        fullname: true,
        username: true,
        email: true,
        country: true,
        city: true,
        booksReaded: true
      }
    })

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.getFriendSolitudes = async (req, res) => {
  try {
    const solitudes = await prisma.friendship.findMany({
      where: { receiver: Number(req.user.id) },
      select: {
        Sender: { omit: { password: true } },
        id: true,
        Receiver: { omit: { password: true } },
        status: true
      }
    })

    res.json(solitudes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.GetFrienshipSender = async (req, res) => {
  const { currentId } = req.body

  try {
    const friendship = await prisma.friendship.findFirst({
      where: {
        sender: Number(req.user.id),
        receiver: Number(currentId)
      }
    })

    res.json(friendship)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.GetFrienshipReceiver = async (req, res) => {
  const { currentId } = req.body

  try {
    const friendship = await prisma.friendship.findFirst({
      where: {
        sender: Number(currentId),
        receiver: Number(req.user.id)
      }
    })

    res.json(friendship)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.getUserCommentary = async (req, res) => {
  try {
    const commentary = await prisma.userCatalogCommentary.findFirst({
      where: {
        fk_visitor: Number(req.user.id),
        fk_usercatalog: Number(req.params.user_catalog)
      }
    })

    if (!commentary) {
      return res
        .status(200)
        .json({ status: false, statusText: 'No commentaries' })
    }

    res.json(commentary)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.getCommentaries = async (req, res) => {
  try {
    const commentaries = await prisma.userCatalogCommentary.findMany({
      where: {
        fk_usercatalog: Number(req.params.user_catalog),
        fk_visitor: { not: Number(req.user.id) }
      }
    })

    res.json(commentaries)
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.SaveCatalogCommentary = async (req, res) => {
  const commentary = {
    fk_visitor: Number(req.user.id),
    fk_usercatalog: Number(req.params.user_catalog),
    ...req.body
  }

  try {
    await prisma.userCatalogCommentary.create({
      data: commentary
    })

    res.json({ status: true, statusText: 'Commentary added' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.RemoveCommentary = async (req, res) => {
  try {
    // Delete commentary using Prisma
    await prisma.userCatalogCommentary.delete({
      where: { id: parseInt(req.params.id) }
    })
    res.json({ status: true, statusText: 'Commentary removed' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.getCommentaries = async (req, res) => {
  try {
    // Fetch commentaries using Prisma with custom filtering
    const commentaries = await prisma.userCatalogCommentary.findMany({
      where: {
        fk_usercatalog: parseInt(req.params.user_catalog),
        fk_visitor: { not: Number(req.user.id) }
      }
    })
    res.json(commentaries)
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.SaveCatalogCommentary = async (req, res) => {
  const commentary = {
    fk_visitor: Number(req.user.id),
    fk_usercatalog: parseInt(req.params.user_catalog),
    ...req.body
  }
  try {
    // Add new commentary using Prisma
    await prisma.userCatalogCommentary.create({
      data: commentary
    })
    res.json({ status: true, statusText: 'Commentary added' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.RemoveCommentary = async (req, res) => {
  try {
    // Delete commentary using Prisma
    await prisma.userCatalogCommentary.delete({
      where: { id: parseInt(req.params.id) }
    })
    res.json({ status: true, statusText: 'Commentary removed' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, statusText: 'Something went wrong.' })
  }
}

controller.Save = async (req, res) => {}

controller.Update = async (req, res) => {}

controller.Delete = async (req, res) => {}

module.exports = controller
