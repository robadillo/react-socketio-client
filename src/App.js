import { useEffect, useState } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3000";


function App() {
  const [response, setResponse] = useState("");

  const socket = socketIOClient(ENDPOINT);
  socket.on('connect', () => {
    console.log('Connected');
    socket.emit('msgToServer', { test: 'test' });
        socket.emit('identity', 0, response =>
          console.log('Identity:', response),
        );
  });
  socket.on('notificationToClient', function(data) {
    console.log('Recibí esto', data);
  });

  // const {message, send} = useWebSockets

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   console.log(socket);
  //   socket.on("msgToClient", data => {
  //     setResponse(data);
  //   });
  // }, []);
  return (
    <div className="App">
    <h1>Socket IO Client Test</h1>
    <form>
      <input type="text"/>
      <button>Send</button>
    </form>

    <p>
      <ul>
        <li> Some Message </li>
        It's {response}
      </ul>
    </p>
    </div>
  );
}

export default App;
