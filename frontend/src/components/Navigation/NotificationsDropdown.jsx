import { useState, useEffect } from 'react'
import { getSolitudes } from '../../services/user'
import { Link } from 'react-router-dom'
import useSession from '../../hooks/useSession'
import { FaBell, FaUser } from 'react-icons/fa'

const NotificationsDropdown = () => {
  const { socket } = useSession() || {}
  const [notifications, setNotifications] = useState([])

  const getNotificationsHandler = async () => {
    const fetchedNotifications = await getSolitudes()
    setNotifications(fetchedNotifications ?? [])
  }

  useEffect(() => {
    if (!socket) {
      let intervalId = setInterval(() => {
        getNotificationsHandler()
      }, 1000)

      getNotificationsHandler()
      return () => {
        clearInterval(intervalId)
      }
    } else {
      socket.on('friend-request', getNotificationsHandler)
      socket.on('refresh-notifications', getNotificationsHandler)

      return () => {
        socket.off('friend-request', getNotificationsHandler)

        socket.off('refresh-notifications', getNotificationsHandler)
      }
    }
  }, [socket])

  return (
    <div className="dropdown">
      {notifications.length > 0 ? (
        <span
          className="position-absolute  badge rounded-pill bg-purple"
          style={{ top: '-4px', right: '0px', fontSize: '10px' }}
        >
          {notifications.length > 9 ? '9+' : notifications.length}
        </span>
      ) : null}

      <button
        className="btn btn-sm text-white"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FaBell />
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end dropd position-absolute px-2 py-2"
        aria-labelledby="dropdownMenuButton1"
        style={{ width: '300px' }}
      >
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <li key={notification.id} className="dropdown-item">
                <div className="row">
                  <div className="col-2 border-2 border-end border-secondary ">
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <FaUser />
                    </div>
                  </div>
                  <div className="col-10">
                    <Link
                      to={`/profile/${notification.Sender.id}/${notification.Sender.username}`}
                      className="dropdown-item"
                    >
                      <p style={{ fontSize: '15px', margin: '0px' }}>
                        New friend request
                      </p>
                      <p
                        className="text-muted"
                        style={{ fontSize: '13px', margin: '0px' }}
                      >
                        From: {notification.Sender.username}
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </>
        ) : (
          <li className="dropdown-item">No notifications</li>
        )}
      </ul>
    </div>
  )
}

export default NotificationsDropdown
