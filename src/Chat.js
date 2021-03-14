import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MessageSharp,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from 'firebase';

function Chat() {
  const [input, setInput] = useState([]);
  const [seed, setSeed] = useState([]);
  const { roomID } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user},dispatch] = useStateValue();

  useEffect(() => {
    if (roomID) {
      db.collection("rooms")
        .doc(roomID)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
          );
    }
  }, [roomID]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    const roomname = prompt("Please enter name for Chat");
    if (roomname) {
      //do some clever database stuff..
    }
  };
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>>", input);

    db.collection('rooms').doc(roomID).collection('messages').add({
        message:input,
        name:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput("");
  };

  return (
    <div className="Chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>last seen {" "} 
              {new Date(
                  messages[messages.length-1]?.timestamp?.toDate()
              ).toUTCString()
              }
          </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
      {messages.map((message) => {
          return (
          <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
          <span className="chat_name">{message.name}</span>
          {message.message}
          <span className="chat_timestamp">
            {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
        </p>)
      } )}
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message .."
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
