import express = require('express');
import { User } from '../../model/user.model';

const routes = express.Router();

routes.get('/', (req, res, next) => {
    User.find({})
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(next);
});

routes.get('/:id', (req, res, next) => {
    const userId = req.params.id;

    User.findOne({ _id: userId })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(next);
});

routes.post('/', (req, res, next) => {
    const userProps = req.body;

    if (userProps._id != null || userProps._id) {
        delete userProps._id;
    }

    User.create(userProps)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(next);
});

routes.put('/:id', (req, res, next) => {
    const userId = req.params.id;
    const userProps = req.body;

    User.findByIdAndUpdate({_id: userId}, userProps)
        .then(() => User.findById({ _id: userId }))
        .then((user) => res.status(202).json(user))
        .catch(next);
});

routes.delete('/:id', (req, res, next) => {
    const userId = req.params.id;

    User.remove({ _id: userId })
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
});

export default routes;