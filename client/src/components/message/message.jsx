import React from 'react'
import cl from './message.module.css'

const Message = ({mess}) => {
    return (
        <div className={cl.message}>
            <p className={cl.person}>{mess.username}</p>
            <div className={cl.text}>
                {mess.message}
            </div>
        </div>
    )
}
export default Message