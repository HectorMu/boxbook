import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import io from 'socket.io-client'
import { baseUrl } from '../config/API'

const Session = React.createContext()

function SessionContextProvider({ children }) {
  const userData = JSON.parse(window.localStorage.getItem('BoxBookSession'))

  const [socket] = useState(() => io(baseUrl))
  const [user, setUser] = useState(userData)

  useEffect(() => {
    if (!user) return

    socket?.emit('subscription', JSON.stringify(user))

    socket?.on('solitude-accepted', (username) => {
      toast.success(`${username} accepted your friend request`)
    })

    return () => socket?.close()
  }, [user, socket])

  console.log(socket)
  return (
    <Session.Provider value={{ user, setUser, socket }}>
      {children}
    </Session.Provider>
  )
}

export { SessionContextProvider, Session }
