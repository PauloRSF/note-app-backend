const app = require('../../src/app');
const factory = require('../utils/factories');
const jwtSign = require('../../src/utils/JWTSigner');
const mongoose = require('mongoose');
const request = require('supertest');
const Note = require('../../src/models/Note');
const assert = require('chai').assert;

describe('note collection access', function() {
    
    let user, accessToken;

    before(async function() {
        user = await factory.create('User');
        
        accessToken = jwtSign({
            username: user.username,
            name: user.name
        });
    });

    it('should not be able to access notes without a authorization token', function() {

        return request(app)
            .get(`/${user.username}/notes`)
            .expect(401);
    });

    it('should not access notes with an invalid token', function() {

        return request(app)
            .get(`/${user.username}/notes`)
            .set('Authorization', `Bearer InvalidToken123`)
            .expect(403);
    });

    it('should not allow for an user to access another user\'s notes', async function() {

        const anotherUser = await factory.create('User');

        return request(app)
            .get(`/${anotherUser.username}/notes`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(403);
    });

    it('should not be able to access the notes of an inexistent user', function() {

        return request(app)
            .get('/inexistentUser/notes')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });

    it('should not be able to retrieve an inexistent note', function() {

        return request(app)
            .get(`/${user.username}/notes/5e67d986bfdd9626dbd8d6f2`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);
    });

    it('should not be able to retrieve a note with an invalid id', function() {

        return request(app)
            .get(`/${user.username}/notes/invalidNoteId`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(500);
    });

    after(function() {
        mongoose.connection.db.dropDatabase();
    });
});

describe('note CRUD', function() {

    let user, accessToken;

    before(async function() {
        user = await factory.create('User');
        
        accessToken = jwtSign({
            username: user.username,
            name: user.name
        });
    });

    beforeEach(async function(){
        await Note.deleteMany();
    });
    
    it('should create a new note', async function() {

        const note = await factory.build('Note');

        return request(app)
            .post(`/${user.username}/notes`)
            .send(note)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);
    });

    it('should not create a new note without a text', async function() {

        const note = await factory.build('Note', {
            text: undefined
        });

        return request(app)
            .post(`/${user.username}/notes`)
            .send(note)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(400);
    });

    it('should get all the user notes', async function() {
        let notes = new Array(5);
        const noteCount = 5;

        for(let i = 0; i < noteCount; i++){
            notes[i] = await factory.create('Note', {
                user: user.username
            });
        }

        return request(app)
            .get(`/${user.username}/notes`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
            .then(function(res) {
                assert.equal(res.body.notes.length, noteCount);

                for(i = 0; i < 5; i++) {
                    assert.equal(res.body.notes[i].title, notes[i].title)
                    assert.equal(res.body.notes[i].text, notes[i].text)
                }
            });
    });

    it('should get a specific note', async function() {
        const note = await factory.create('Note');

        return request(app)
            .get(`/${user.username}/notes/${note._id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
            .then(function(res) {
                assert.equal(res.body.note.title, note.title);
                assert.equal(res.body.note.text, note.text);
            });
    });

    it('should update a note', async function() {
        const note = await factory.create('Note');
        const newNoteData = await factory.build('Note');

        return request(app)
            .put(`/${user.username}/notes/${note._id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
            .then(function(res) {
                assert.equal(res.body.note.title, newNoteData.title);
                assert.equal(res.body.note.text, newNoteData.text);
            });
    });

    it('should delete a note', async function() {
        const note = await factory.create('Note');

        return request(app)
            .delete(`/${user.username}/notes/${note._id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);
    });

    after(function() {
        mongoose.connection.db.dropDatabase();
    });
});
