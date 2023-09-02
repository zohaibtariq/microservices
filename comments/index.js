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
        console.log('comment service origin : ' + origin);
        if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    console.log('GET /posts/:id/comments')
    res.status(200).send(commentsByPostId[req.params.id] || [])
});

app.post('/posts/:id/comments', async (req, res) => {
    console.log('POST /posts/:id/comments')
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content, status: 'pending'})
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-clusterip-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments)
});

app.post('/events', async (req, res) => {
    console.log('Received events on Comment Service : ' + req.body.type)
    const {type, data} = req.body;
    if(type === 'CommentModerated'){
        const {postId, id, status, content} = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => {
            return comment.id === id
        })
        comment.status = status;
        await axios.post('http://event-bus-clusterip-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
    res.status(200).send(req.body)
});

app.listen(4001, () => {
    console.log('Comments Service : Listening on 4001')
});