import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { contactUser } from '../../../services/social'
import { getMessages } from '../../../services/user'
import Canvas from '../../../components/Global/Canvas'
import toast from 'react-hot-toast'
import { FaPaperPlane } from 'react-icons/fa'

const contactData = {
  contactId: 0,
  message: ''
}

const Contact = ({ profile, refresh }) => {
  const [contact, setContact] = useState(contactData)
  const [messages, setMessages] = useState([])

  const { id } = useParams()

  const getAndSetMessage = useCallback(async () => {
    const messages = await getMessages()

    const filteredMessages = messages.filter(
      (message) => message.user_first_id === parseInt(id)
    )

    setMessages(filteredMessages)
  }, [id])

  const handleChange = (key, value) => setContact({ ...contact, [key]: value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const tLoading = toast.loading('Sending...')
    const results = await contactUser(contact)
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading })
    }
    toast.success(results.statusText, { id: tLoading })
    refresh()
  }

  useEffect(() => {
    handleChange('contactId', parseInt(id))
    getAndSetMessage()
    //eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [getAndSetMessage])

  return (
    <Canvas
      id="contactCanvas"
      title={`Contacting to ${profile.username}`}
      buttonClass="btn btn-purple btn-sm"
      buttonText="Contact"
      icon={<FaPaperPlane />}
    >
      {messages.length > 0 ? (
        <>
          <h5>{profile.username} already contacted you:</h5>
          {messages.map((message) => (
            <p className="card py-2 px-2">{message.message}</p>
          ))}
        </>
      ) : null}
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          rows={10}
          placeholder={`${
            messages && messages.length > 0 ? `Answer` : `Send a message`
          } to ${profile.fullname}`}
          onChange={(e) => handleChange('message', e.target.value)}
        ></textarea>

        <div className="d-flex justify-content-center mt-4 flex-column align-items-center">
          <button className="btn btn-purple">
            Send <i className="fas fa-paper-plane"></i>
          </button>
          {messages && messages.length > 0 ? (
            <p className="text-center mt-4">
              Once you answer to {profile.username}, you will be friends!
            </p>
          ) : null}
        </div>
      </form>
    </Canvas>
  )
}

export default Contact
