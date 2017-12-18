import * as mongoose from 'mongoose';

before((done) => {
    mongoose.connect('mongodb://localhost/groups_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', (err) => {
            console.error('Error connecting to test database', err);
        });
});

beforeEach((done) => {
    const { groups } = mongoose.connection.collections;
    groups.drop(() => {
        done();
    });
});
