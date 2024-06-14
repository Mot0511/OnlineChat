import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import Message from './components/message/message'
import axios from 'axios'

const App = () => {

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [ws, setWs] = useState()

  const [isConnected, setIsConnected] = useState(false)

  const connect = () => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${name}`)
    ws.onmessage = (event) => {
      const data = event.data.split('-')
      const username = data[0]
      const message = data[1]

      setMessages(prev => [{username: username, message: message}, ...prev])
    }

    axios.get('http://localhost:8000/getMessages')
      .then(res => {
        const data = res.data

        const messages = data.map(mess => {
          const data = mess.split('-')
          const username = data[0]
          const message = data[1]

          return {username: username, message: message}
        })
        
        setMessages(messages)
      })
    setWs(ws)
    setIsConnected(true)

  }

  const send_message = () => {
    ws.send(message)
    setMessage('')
  }

  if (isConnected){
    return (
      <div className='win'>
        <div className='chat'>
          {
            messages.map(mess => <Message mess={mess} />)
          }
        </div>
        <div className='controls'>
          <input type="text" className='message' placeholder='Сообщение' value={message} onChange={e => setMessage(e.target.value)} />
          <button onClick={send_message}>Отправить</button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Вход в чат</h1>
        <input type="text" style={{width: '500px', height: '40px'}} placeholder='Имя' value={name} onChange={e => setName(e.target.value)} />
        <button style={{width: '100px', height: '40px'}} onClick={connect}>Войти</button>
      </div>
    )
  }

  
}
export default App