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


export default routes;