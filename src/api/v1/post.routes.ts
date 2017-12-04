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


export default routes;
