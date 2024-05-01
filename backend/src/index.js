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
const db = require('./database')

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
app.get('/*', (req, res) => {
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
    const hasAlreayRegistered = await db.query(
      'select * from sockets where fk_user = ?',
      [decodedUser.id]
    )

    if (hasAlreayRegistered.length > 0) {
      await db.query(
        'update sockets set current_socket = ? where fk_user = ?',
        [socket.id, decodedUser.id]
      )
    } else {
      const newSocket = {
        fk_user: decodedUser.id,
        current_socket: socket.id
      }

      await db.query('insert into sockets set ?', [newSocket])
    }
  })

  socket.on('add-friend', async (to) => {
    const getSocketId = await db.query(
      'select * from sockets where fk_user = ?',
      [to]
    )
    const socketId = getSocketId?.[0]?.current_socket

    if (socketId) {
      io.to(socketId).emit('friend-request')
    }
  })
  socket.on('accepted-request', async (payload) => {
    const getReceiverSocketId = await db.query(
      'select * from sockets where fk_user = ?',
      [payload.receiver]
    )
    const receiverSocketId = getReceiverSocketId[0].current_socket

    const getSenderSocketId = await db.query(
      'select * from sockets where fk_user = ?',
      [payload.sender]
    )
    const senderSocketId = getSenderSocketId[0].current_socket
    io.to(receiverSocketId).emit('refresh-notifications')
    io.to(senderSocketId).emit('solitude-accepted', payload.username)
  })

  socket.on('deleted-request', async (payload) => {
    const getReceiverSocketId = await db.query(
      'select * from sockets where fk_user = ?',
      [payload.receiver]
    )
    const receiverSocketId = getReceiverSocketId[0].current_socket

    const getSenderSocketId = await db.query(
      'select * from sockets where fk_user = ?',
      [payload.sender]
    )
    const senderSocketId = getSenderSocketId[0].current_socket
    io.to(receiverSocketId).emit('refresh-notifications')
    io.to(senderSocketId).emit('solitude-deleted', payload.username)
  })
})

//Initialazing the server
let port = process.env.PORT || 4000

server.listen(port, () => {
  console.log('listening on *:', port)
})
