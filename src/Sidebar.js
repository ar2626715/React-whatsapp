// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChats.js'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar,IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar(){
 const [rooms,setRooms] = useState([]);
 const [{user},dispatch]=useStateValue();

 useEffect(() => {
     const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>(
   setRooms(snapshot.docs.map((doc) => (
       {
           id:doc.id,
           data:doc.data(),

       }))
       )
     )
     )
     return () => {
         unsubscribe();
     }

 },[])

    return (
<div className="sidebar">
    <div className="sidebar_header">
    
 <Avatar src={user?.photoURL}/>
 <div className="sidebar_headerRight">
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
    <div className="sidebar_search">
        <div className="sidebar_searchContainer">
        <SearchOutlined />
    <input type="text" className="type1" placeholder="Search or Start a new Chat"></input>
        </div>
    
    </div>
    
    <div className="sidebar_chats">
        <SidebarChat addNewChat/>
        {rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
        {/* <SidebarChat />
        <SidebarChat /> */}
        {/* <h1>Sidebar Chats</h1> */}

    </div>

</div>
    )
}

export default Sidebar;