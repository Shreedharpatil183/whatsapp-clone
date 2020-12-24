import { Avatar, IconButton } from '@material-ui/core'
import React,{ useEffect, useState }  from 'react'
import SearchIcon from "@material-ui/icons/SearchOutlined"
import AttachFile from "@material-ui/icons/AttachFile"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import './Chat.css'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'

import { useStatevalue } from './StateProvider'
import db  from './firebase'
import { storage } from './firebase'
function Chat() {
    const [seed, setseed] = useState('')
    const [input, setInput] = useState("")
    const [{ user }, dispatch] = useStatevalue();
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, SetMessages] = useState([])

    
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name))
            )
            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (
                SetMessages(snapshot.docs.map(doc => doc.data()))
            ))
           
        }
    }, [roomId])

   

    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        console.log("You typed >>>>>", input)


        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })


        setInput("")
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {" "}
                    {new Date(
                        messages[messages.length - 1]?.timestamp?.toDate()
                    ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                     <p className={`chat__messages ${message.name === user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                ))}
                
                   
               
               
            </div>
            <div className="chat__footer">
                <InsertEmotionIcon />
                <AttachFile />
                <form>
                
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
