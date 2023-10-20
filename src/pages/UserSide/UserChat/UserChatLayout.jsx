import React from 'react'
import Navbar from '../../../components/landingPages/Navbar'
import { useParams } from 'react-router-dom'
import ChatUser from './ChatUser'

const UserChatLayout = () => {
    const {user_id,vendor_id} = useParams()
  return (
    <>
<Navbar/>
    <ChatUser/>
    </>
  )
}

export default UserChatLayout