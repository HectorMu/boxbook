require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const app = express()
const { Server } = require('socket.io')
const http = require('http')
const jwt = require('jsonwebtoken')

//Initialazing database connection
const { prisma } = require('./prisma')

//Using middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Using the routes
app.use(require('./routes/template.routes'))
app.use(require('./routes/auth.routes'))
app.use(require('./routes/user.routes'))
app.use(require('./routes/userbooks.routes'))
app.use(require('./routes/social.routes'))

//To deploy a react router app build with an express server, this must be here forever
app.use(express.static(path.join(__dirname, 'build')))
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'), (err) => {
    if (err) {
      res.status(500).send('error')
      console.log(err)
    }
  })
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  socket.on('subscription', async (user) => {
    const userData = JSON.parse(user)
    const token = userData.AccessToken

    const decodedAccessToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    )

    const decodedUser = decodedAccessToken
    const hasAlreadyRegistered = await prisma.sockets.findFirst({
      where: {
        fk_user: Number(decodedUser.id)
      }
    })

    if (hasAlreadyRegistered) {
      await prisma.sockets.update({
        where: {
          id: hasAlreadyRegistered.id,
          fk_user: Number(decodedUser.id)
        },
        data: {
          current_socket: socket.id
        }
      })
    } else {
      await prisma.sockets.create({
        data: {
          fk_user: Number(decodedUser.id),
          current_socket: socket.id
        }
      })
    }
  })

  socket.on('add-friend', async (to) => {
    const getSocketId = await prisma.sockets.findFirst({
      where: {
        fk_user: Number(to)
      }
    })
    const socketId = getSocketId?.current_socket

    if (socketId) {
      io.to(socketId).emit('friend-request')
    }
  })

  socket.on('accepted-request', async (payload) => {
    const getReceiverSocketId = await prisma.sockets.findFirst({
      where: {
        fk_user: Number(payload.receiver)
      }
    })
    const receiverSocketId = getReceiverSocketId?.current_socket

    const getSenderSocketId = await prisma.sockets.findFirst({
      where: {
        fk_user: Number(payload.sender)
      }
    })
    const senderSocketId = getSenderSocketId?.current_socket

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('refresh-notifications')
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit('solitude-accepted', payload.username)
    }
  })

  socket.on('deleted-request', async (payload) => {
    const getReceiverSocketId = await prisma.sockets.findFirst({
      where: {
        fk_user: Number(payload.receiver)
      }
    })
    const receiverSocketId = getReceiverSocketId?.current_socket

    const getSenderSocketId = await prisma.sockets.findFirst({
      where: {
        fk_user: Number(payload.sender)
      }
    })
    const senderSocketId = getSenderSocketId?.current_socket

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('refresh-notifications')
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit('solitude-deleted', payload.username)
    }
  })
})

//Initialazing the server
let port = process.env.PORT || 4000

server.listen(port, () => {
  console.log('listening on *:', port)
})
