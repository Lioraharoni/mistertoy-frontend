import { useState, useEffect } from 'react'

const DEFAULT_MSG = 'type your message here'
const AUTOMATIC_RESPONSE_MSG = 'sure thing honey'

export function Chat() {
    const [msgs, setMsgs] = useState([])
    const [newMsg, setNewMsg] = useState({ txt: DEFAULT_MSG, sender: '' })

    useEffect(() => {
        if (msgs && msgs.length) {
            console.log('msgs', msgs, 'newMsg', newMsg);
            if (newMsg.sender === 'user') {
                setTimeout(() => {
                    const supportMsg = { txt: AUTOMATIC_RESPONSE_MSG, sender: 'support' }
                    setMsgs(prevMsgs => [...prevMsgs, supportMsg])

                }, 3000)
            }
            setNewMsg({ txt: DEFAULT_MSG, sender: '' })
        }
    }, [msgs])

    function handleChange({ target }) {
        // console.log('handleChange', field, value);
        setNewMsg({ txt: target.value, sender: 'user' })
    }


    function onSubmit(ev) {
        ev.preventDefault()

        console.log(msgs, newMsg, newMsg.sender + newMsg.txt);
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    return (
        <section className="chat">
            <ul className='msg-list'>
                {msgs && msgs.map(msg =>
                    <li >
                        {msg.sender} : {msg.txt}
                    </li>
                )}
            </ul>
            <form onSubmit={onSubmit}>
                <input onChange={handleChange} type="text" id="msg" name="msg" value={newMsg.txt} />
                <button type="submit" className="btn">Send Message</button>
            </form>
        </section>
    )
}