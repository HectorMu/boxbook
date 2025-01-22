import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import io from 'socket.io-client'
import { baseUrl } from '../config/API'

const Session = React.createContext()

function SessionContextProvider({ children }) {
  const userData = JSON.parse(window.localStorage.getItem('BoxBookSession'))

  const [socket] = useState(() => {
    if (import.meta.MODE === 'development') {
      return io(baseUrl)
    }
    // prod todo realtime implementation
    return null
  })
  const [user, setUser] = useState(userData)

  useEffect(() => {
    if (!user || socket) return

    socket?.emit('subscription', JSON.stringify(user))

    socket?.on('solitude-accepted', (username) => {
      toast.success(`${username} accepted your friend request`)
    })

    return () => socket?.close()
  }, [user, socket])

  return (
    <Session.Provider value={{ user, setUser, socket }}>
      {children}
    </Session.Provider>
  )
}

export { SessionContextProvider, Session }
