const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const {randomBytes} = require('crypto')
const axios = require("axios");

const app = express();
app.use(bodyParser.json())
// Configure CORS to allow requests only from a specific origin and port
const allowedOrigins = [
    'http://localhost:3000',  // Add more origins if needed
    'http://posts.com',  // Add more origins if needed
];
const corsOptions = {
    origin: (origin, callback) => {
        console.log('post service origin : ' + origin);
        if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions));

const posts = {};

app.get('/posts', (req, res) => {
    console.log('GET /posts')
    res.status(200).send(posts)
});

app.post('/posts/create', async (req, res) => {
    console.log('POST /posts/create')
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    }

    await axios.post('http://event-bus-clusterip-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).send(posts[id])
});


app.post('/events', (req, res) => {
    console.log('Received events on Post Service : ' + req.body.type)
    res.status(200).send(req.body)
});

app.listen(4000, () => {
    console.log('Posts Service : Listening on 4000')
});