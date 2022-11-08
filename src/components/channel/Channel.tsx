import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect(
  process.env.SOCKET_IO_SERVER_URL || 'http://localhost:3001'
);

export default function Channel(props) {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.join(props.channelID);
  }, []);

  useEffect(() => {
    socket.on('broadcast_message', (data) => {
      setMessages([...messages, parse(data.message)]);
    });
  });

  const parse = (mess) => {
    return JSON.parse(JSON.stringify(mess));
  }

  const sendMessage = () => {]
    const user = JSON.parse(localStorage.getItem("user") || "");
    socket
      .to(props.channelID)
      .emit(
        'new_message',
        { message: message, userName: `{user.first_name} {user.last_name}`, userID: user.id }
      );
    setMessages([...messages, message]);
  }

  return (
    <div className="App">
      <input placeholder='Your message ...' onChange={setMessage} />
      <button onClick={sendMessage}>Send message</button>
      <ul>
      {messages.map((mess, idx) => {
        return (<li id={idx}>{ idx } -- {mess}</li>);
      })}
      </ul>
    </div>
  );
}
