import React, { useEffect } from 'react'
import {useState} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
function Chat({socket,username,room}) {
    const [current,setCurrent]=useState('')
    const [messageList,setMessageList]=useState([])
    const send=async ()=>{
        if(current!==''){
            const data={
                room:room,
                username:username,
                message:current,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()

            }
            await socket.emit("send_message",data)
            setMessageList((item)=>[...item,data])
           
        }
        
    }
    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
    
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {messageList.map((item)=>{
                 
                
                   return  <div className='message' id={item.username===username?'you':'other'}>
                        <div>
                        <div className='message-content'>
                            <p>{item.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id='time'>{item.time}</p>
                            <p id='author'>{item.username}</p>
                        </div>
                        </div>
                    </div>

                
            })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type='text' placeholder='Heyy...' onKeyEnter={(event)=>{event.key==='Enter' && send()}} onChange={(e)=>setCurrent(e.target.value)}/>
            <button onClick={send}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat