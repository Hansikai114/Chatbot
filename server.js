const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
        let response = '';

        switch (msg.toLowerCase()) {
            case 'hello':
                response = 'Hello! How can I assist you today?';
                break;
            case 'i need some help':
                response = 'Sure, I can help! What do you need assistance with?';
                break;
            case 'how can i improve my productivity':
                response = 'Try breaking tasks into smaller steps, setting specific goals, taking regular breaks, and using productivity tools like to-do lists or timers.';
                break;
            case 'tell me a joke':
                response = 'Why did the scarecrow win an award? Because he was outstanding in his field!';
                break;
            case 'what\'s the capital of france?':
                response = 'The capital of France is Paris';
                break;
            case 'goodbye':
                response = 'Goodbye!';
                break;
            default:
                response = 'Sorry, I didn\'t understand that.';
        }

        socket.emit('response', response);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
