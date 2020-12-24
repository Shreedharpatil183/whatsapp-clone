import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { Avatar, IconButton, Input } from  '@material-ui/core'
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import SearchIcon from "@material-ui/icons/SearchOutlined"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SidebarChat from './SidebarChat'
import { useStatevalue } from './StateProvider'
import db from './firebase'
function Sidebar() {

    const [rooms, setRooms] = useState([])
    const [{ user }, dispatch] = useStatevalue()

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => (
            setRooms(snapshot.docs.map((doc) => (
                {
                   id: doc.id, 
                   data: doc.data(),
                }
            )))
        )
        )
        return () => {
            unsubscribe();
        }
    },[])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
            <Avatar src={user?.photoURL} />
            <div className="sidebar__headerRight">
            <IconButton>
                <DonutLargeIcon />
            </IconButton>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
                
            </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <Input className="sidebar__input" type="text" placeholder="Search chat and new Chat"></Input>
                </div>
            
            </div>
            <div className="sidebar__chats">
            <SidebarChat addNewChat></SidebarChat>
            {rooms.map(room => (
                <SidebarChat key={room.id} id={room.id}
                name={room.data.name}
                />
            ))}
            </div>
        </div>
    )
}

export default Sidebar
