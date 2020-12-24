import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from './firebase'
import './SidebarChat.css'
import { useStatevalue } from './StateProvider'
function SidebarChat({ id, name, addNewChat }) {
    const [seed, setseed] = useState('')
    const [messages, setMessages] = useState('')

    const [{ user }, dispatch] = useStatevalue();

    useEffect(() => {
        if (id) {
            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp","desc")
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                )
        }
    },[])


    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Please Enter Name For Chat")
        
        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            })
        }
       
    }

    const createUser = () => {
        const username = prompt("Please Enter User For Chat")

        if (username) {
            db.collection("rooms").add({
                name: user.displayName,
            })
        }
        
    }


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
        
    ): (
        
        <div className="sidebarChat" onClick={createChat}
        >
            <h2>Add Group Chat</h2>
            <h2 onClick={createUser}>Add User for Chat</h2>
        </div>
       
    )
}

export default SidebarChat
