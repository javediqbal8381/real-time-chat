import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');
import './App.css'
import { useEffect, useState } from 'react';

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
      socket.on('messageResponse',data=>setMessages([...messages,data]))
  },[socket,messages])

  const handleSendMessage = (e) => {
    if (message.trim()) {
      socket.emit('message', {
        text: message,
        name: 'developer',
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id
      })
    }
  }
  return (
    <div>
      <input type="text" onChange={(e)=>{setMessage(e.target.value)}} />
      <button onClick={handleSendMessage}>
        send
      </button>
      <h2>Messages</h2>
      {
        messages.map(message=>{
          return (
            <div>
              {message.text}
            </div>
          )
        })
      }
    </div>
  );
}
export default App
