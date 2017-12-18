import * as assert from 'assert';
import 'mocha';
import * as request from 'supertest';
import { Group } from '../src/model/group.model';
import { PostSchema } from '../src/model/schemas/post.schema';
import { CommentSchema } from '../src/model/schemas/comment.schema';
import { IGroupDocument } from '../src/model/schemas/group.schema';
const app = require('../src/index').default;

describe('groups routes', () => {
    let group: IGroupDocument;

    beforeEach((done) => {
        group = new Group({
            name: 'test',
            posts: [
                {
                    user_id: '5a2550ca5179b81be0241339',
                    username: 'henkie',
                    content: 'blog post met testen',
                    time: '1513083614199',
                    comments: [
                        
                    ]
                }
            ]
        } as IGroupDocument);

        group.save().then(() => done());
    });

    it('Gets to /api/v1/groups get all groups', (done) => {
        request(app)
            .get('/api/v1/groups')
            .expect(200)
            .then((response) => {
                const responseBody = response.body;

                console.log(responseBody[0].name);

                assert(responseBody != null);
                assert(responseBody.length > 0);
                assert(responseBody[0].name === 'test');
                done();
            });
    });

    it('Gets to /api/v1/groups/:id gets a single group', (done) => {
        request(app)
            .get(`/api/v1/groups/${group._id}`)
            .expect(200)
            .then((response) => {
                const responseBody = response.body;

                assert(responseBody != null);
                assert(responseBody.name === 'test');
                done();
            });
    });

    it('Gets to /api/v1/groups/:id gets a single group with posts and comments', (done) => {
        request(app)
            .get(`/api/v1/groups/${group._id}`)
            .expect(200)
            .then((response) => {
                const responseBody = response.body;

                assert(responseBody != null);
                assert(responseBody.name === 'test');
                assert(responseBody.posts[0].time === '1513083614199');
                done();
            });
    });

    it('Post to /api/v1/groups creates a new group', (done) => {
        Group.count({}).then((count) => {
            request(app)
                .post('/api/v1/groups')
                .send({
                    name: 'Test recipe',
                    time: '5 minutes',
                    ingredients: []
                })
                .expect(201)
                .then(() => {
                    Group.count({}).then((newCount) => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('Put to /api/v1/groups/id updates a group', (done) => {
        request(app)
            .put(`/api/v1/groups/${group._id}`)
            .send({
                name: 'Group 8',
                posts: []
            } as IGroupDocument)
            .expect(202)
            .then(() => {
                Group.findOne({ _id: group._id })
                    .then((foundGroup) => {
                        assert(foundGroup != null);
                        assert(foundGroup.name === 'Group 8');
                        assert(foundGroup.posts === []);
                        done();
                    });
            });
    });

    it('Delete to /api/v1/groups/:id deletes a group', (done) => {
        request(app)
            .delete(`/api/v1/groups/${group._id}`)
            .expect(204)
            .then(() => {
                Group.findOne({ _id: group._id })
                    .then((foundGroup) => {
                        assert(foundGroup === null);
                        done();
                    });
            });
    });
});