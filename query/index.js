const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express();
app.use(bodyParser.json())
app.use(cors())

const posts = {};

app.get('/posts', (req, res) => {
    res.status(200).send(posts)
});

const handleEvent = (type, data) => {
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
        console.log('PostCreated')
        console.log(posts)
    }
    else if(type === 'CommentCreated'){

        const {id, content, postId, status} = data;
        const post = posts[postId]

        console.log('CommentCreated')
        console.log(id, content, postId, status, post)

        post.comments.push({id, content, status})
    }
    else if(type === 'CommentUpdated'){
        const {postId, id, status, content} = data
        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
        })
        comment.status = status;
        comment.content = content;
    }
}

app.post('/events', (req, res) => {
    const {type, data} = req.body
    handleEvent(type, data)
    res.status(200).send({})
});

app.listen(4002, async () => {
    console.log('Query Service : Listening on 4002')
    const res = await axios.get('http://localhost:4005/events')
    for(let event of res.data) {
        console.log('Processing event:', event.type)
        handleEvent(event.type, event.data)
    }
});