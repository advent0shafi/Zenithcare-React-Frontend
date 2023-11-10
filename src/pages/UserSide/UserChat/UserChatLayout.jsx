import React from 'react'
import Navbar from '../../../components/landingPages/Navbar'
import { useParams } from 'react-router-dom'
import ChatUser from './ChatUser'
import Footer from '../../../components/landingPages/Footer'

const UserChatLayout = () => {
    const {user_id,vendor_id} = useParams()
  return (
    <>
<Navbar/>
<div className=''> 
<ChatUser/>

</div>
<Footer/>
    </>
  )
}

export default UserChatLayout