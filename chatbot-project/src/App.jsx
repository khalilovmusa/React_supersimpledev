import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { messages } from './helper/defaultChat'

function App() {
  const [chatMessages, setChatMessages] = useState([...messages])

  return (
    <div>
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  )
}

export default App
