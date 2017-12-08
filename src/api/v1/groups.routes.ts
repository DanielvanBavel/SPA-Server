import express = require('express');
import { Group } from '../../model/group.model';

const routes = express.Router();

routes.get('/', (req, res, next) => {
    Group.find({})
        .then((groups) => {
            res.status(200).json(groups);
        })
        .catch(next);
});

routes.get('/:id', (req, res, next) => {
    const groupId = req.params.id;

    Group.findOne({ _id: groupId })
        .then((groups) => {
            res.status(200).json(groups);
        })
        .catch(next);
});

routes.post('/', (req, res, next) => {
    const groupProps = req.body;

    if (groupProps._id != null || groupProps._id) {
        delete groupProps._id;
    }

    Group.create(groupProps)
        .then((group) => {
            res.status(201).json(group);
        })
        .catch(next);
});

routes.put('/:id', (req, res, next) => {
    const groupId = req.params.id;
    const groupProps = req.body;

    Group.findByIdAndUpdate({_id: groupId}, groupProps)
        .then(() => Group.findById({ _id: groupId }))
        .then((group) => res.status(202).json(group))
        .catch(next);
});

routes.delete('/:id', (req, res, next) => {
    const groupId = req.params.id;

    Group.remove({ _id: groupId })
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
});

export default routes;