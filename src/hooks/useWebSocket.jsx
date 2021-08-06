import { useEffect } from 'react';
import io from 'socket.io-client';

const useWebSocket = ({ userId, enabled, onConnected }) => {
  const ref = useRef();
  const [messages, setMessages] = useState([]);

  const send = (msg, senderId) => {
    ref.current.emit('message', {
      content: msg, senderId, userId, date: new Date()
    })
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const socket = io('localhost:3000'); // Nos conectamos al server

    socket.on('connect', () => {
      console.log('Connected');
      socket.emit('msgToServer', { test: 'test' });
          socket.emit('identity', 0, response =>
            console.log('Identity:', response),
          );
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    socket.on('notificationToClient', function(data) {
      console.log('Recibí esto', data);
    });

    ref.current = socket;

    return () => socket.disconnect;
  }, [enabled, userId]);

  return {
    send,
    messages
  }

};