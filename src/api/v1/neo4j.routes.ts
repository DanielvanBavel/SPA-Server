import express = require('express');
import { Group } from '../../model/group.model';

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://hobby-mgfmkckeehocgbkefbdoljal.dbs.graphenedb.com:24786", neo4j.auth.basic("admin", "b.H2RtOvrcXZ3C.hTaj6hqi8g9XBrUz"));
const session = driver.session();

const routes = express.Router();

routes.get('/', (req, res) => {
	session.run('MATCH (n) RETURN n LIMIT 25')
	.then((result) => {
		res.status(200).json(result.records);
		session.close();
		driver.close();
	
	})	
	.catch((error) => {
		res.status(400).json(error);
	});
});

routes.get('/:id', (req, res) => {
	const groupId = req.params.id;

	const query = session.run('MATCH (group:Group)<-[rel:posted_in]-(post:Post) WHERE id(group)='+groupId+'OPTIONAL MATCH(post)<-[rel2:commented_in]-(comment:Comment)	RETURN group, rel, post, rel2, comment')
	.then((result) => {
		res.status(200).json(result.records);
		session.close();
		driver.close();
	})
	.catch((error) => {
		res.status(400).json(error);
	});
});

routes.post('/', (req, res, next) => {
	const groupProps = new Group(req.body);
	
	groupProps.save().then(group => {
		const query = session.run('CREATE group:Group {_id: $id, name: $name, posts: $posts})',
		{id: group._id.toString(), name: req.body.name, posts: req.body.posts}
		);
	
		query.then(result => {
			session.close();
			driver.close();
		});	
		res.status(200).json(group);
	})
	.catch((error) => {
		res.status(400);
	});
});


routes.put('/:id', (req, res, next) => {
	const groupId = req.params.id;
	
	Group.findById(groupId, (err, group) => {
		group.name = req.body.name || group.name;
		group.posts = req.body.posts || group.posts;

		group.save((err, group) => {
			const query = session.run(
				'MATCH (group:Group) WHERE group._id = $id SET group = {_id: $id, name: $name}',
				{id: group._id.toString(), name: req.body.name, }
			);
			query.then(result => {
				session.close();
				driver.close();
			});
			res.status(200).send(group);
		});
	});
});

routes.delete('/:id', (req, res, next) => {
	const groupId = req.params.id;

	Group.findById(groupId, (err, group) => {	  
		group.remove();
		const query = session.run('MATCH (group:Group {_id: $id})<-[*0..]-(c) DETACH DELETE c', {id: groupId})	

		query.then(result => {
			session.close();
			driver.close();
		});
		res.status(200).send(group);
	});
});

export default routes;