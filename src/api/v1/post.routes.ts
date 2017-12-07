import express = require('express');
import { Post } from '../../model/post.model';

const routes = express.Router();

routes.get('/', (req, res, next) => {
    Post.find({})
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch(next);
});

routes.get('/:id', (req, res, next) => {
    const postId = req.params.id;

    Post.findOne({ _id: postId })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch(next);
});

routes.post('/', (req, res, next) => {
    const postProps = req.body;

    if (postProps._id != null || postProps._id) {
        delete postProps._id;
    }

    Post.create(postProps)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch(next);
});

routes.put('/:id', (req, res, next) => {
    const postId = req.params.id;
    const postProps = req.body;

    Post.findByIdAndUpdate({_id: postId}, postProps)
        .then(() => Post.findById({ _id: postId }))
        .then((post) => res.status(202).json(post))
        .catch(next);
});

routes.delete('/:id', (req, res, next) => {
    const postId = req.params.id;

    Post.remove({ _id: postId })
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
});

export default routes;