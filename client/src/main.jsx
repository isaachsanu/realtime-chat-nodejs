import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RoomProvider } from './stores/room'
import { ChatProvider } from './stores/chat'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RoomProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </RoomProvider>,
)
