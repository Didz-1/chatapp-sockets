import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000")

export default function ChatPage() {

    const [name, setName] = useState("");
    const [socketid, setSocketid] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const [messages, setMessages] = useState([]);
    

    function joinRoom() {
        if (room !== "") {
        socket.emit("join_room", room);
        }
    }

    function sendMessage() {
        const newMessage = { name, message, socketid };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        socket.emit("send_message", { message, room, name, socketid});
    }


    function setUser() {
        socket.emit("name", name);
        console.log(name);
    }


    useEffect(() => {
        socket.on("socket_id", (data) => {
        setSocketid(data);
        })
    }, [])



    useEffect(() => {
        socket.on("receive_message", (data) => {
        // setMessageReceived(data.message)
        console.log(data.name);
        setMessages(prevMessages => [...prevMessages, {name: data.name, message: data.message, socketid: data.socketid}]);
        })
    }, [socket])



    return (
        <>
            <div className="msg-input">


        
            <input type="text" placeholder='Name...' onChange={(event) => {
            setName(event.target.value)
            }}/>
            <button onClick={setUser}>Submit</button>

            <br />



            <input type="text" placeholder='Room Number...' onChange={(event) => {
            setRoom(event.target.value)
            }}/>
            <button onClick={joinRoom}>Join</button>

            <br />


            <input type="text" placeholder='Enter Message...' onChange={(event) => {
            setMessage(event.target.value);
            }}/>
            <button onClick={sendMessage}>Send</button>




            {messages.map((msg, index) => (
            <h1 key={index} className={msg.socketid == socketid ? "my-msg" : "other-msg"}> {msg.name}: {msg.message}</h1>
            ))}


            {console.log(messages)}



            </div>
        </>
    )
    
}