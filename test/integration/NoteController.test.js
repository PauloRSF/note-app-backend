const mongoose = require('mongoose');
const request = require('supertest');
const { assert } = require('chai');
const app = require('../../src/app');
const factory = require('../utils/factories');
const jwtSign = require('../../src/utils/JWTSigner');
const Note = require('../../src/models/Note');

describe('note collection access', () => {
  let user; let
    accessToken;

  before(async () => {
    user = await factory.create('User');

    accessToken = jwtSign({
      username: user.username,
      name: user.name,
    });
  });

  it('should not be able to access notes without a authorization token', async () => {
    const res = await request(app)
      .get(`/${user.username}/notes`)
      .expect(401);

    assert.equal(res.body.error, 'No authorization token supplied');
  });

  it('should not access notes with an invalid token', async () => {
    const res = await request(app)
      .get(`/${user.username}/notes`)
      .set('Authorization', 'Bearer InvalidToken123')
      .expect(403);

    assert.equal(res.body.error, 'Invalid authorization token');
  });

  it('should not allow for an user to access another user\'s notes', async () => {
    const anotherUser = await factory.create('User');

    const res = await request(app)
      .get(`/${anotherUser.username}/notes`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);

    assert.equal(res.body.error, 'Can\'t access another user\'s notes');
  });

  it('should not be able to access the notes of an inexistent user', async () => {
    const res = await request(app)
      .get('/inexistentUser/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);

    assert.equal(res.body.error, 'User not found');
  });

  it('should not be able to retrieve an inexistent note', async () => {
    const res = await request(app)
      .get(`/${user.username}/notes/5e67d986bfdd9626dbd8d6f2`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);

    assert.equal(res.body.error, 'Note not found');
  });

  it('should not be able to retrieve a note with an invalid id', async () => {
    const res = await request(app)
      .get(`/${user.username}/notes/invalidNoteId`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(500);

    assert.equal(res.body.error, 'Error checking note existence');
  });

  after(() => {
    mongoose.connection.db.dropDatabase();
  });
});

describe('note CRUD', () => {
  let user; let
    accessToken;

  before(async () => {
    user = await factory.create('User');

    accessToken = jwtSign({
      username: user.username,
      name: user.name,
    });
  });

  beforeEach(async () => {
    await Note.deleteMany();
  });

  it('should create a new note', async () => {
    const note = await factory.build('Note');

    const res = await request(app)
      .post(`/${user.username}/notes`)
      .send(note)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const dbNote = Note.findOne({
      title: note.title,
      text: note.text,
    });

    assert.property(res.body, 'note');
    assert.exists(dbNote);
  });

  it('should not create a new note without a text', async () => {
    const note = await factory.build('Note', {
      text: undefined,
    });

    const res = await request(app)
      .post(`/${user.username}/notes`)
      .send(note)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400);

    const dbNote = await Note.findOne({
      title: note.title,
      text: note.text,
    });

    assert.equal(res.body.error, 'New notes must contain a text field');
    assert.notExists(dbNote);
  });

  it('should get all the user notes', async () => {
    const notes = await factory.createMany('Note', 5, {
      user: user.username,
    });

    await request(app)
      .get(`/${user.username}/notes`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        assert.equal(res.body.notes.length, 5);

        for (let i = 0; i < 5; i += 1) {
          assert.equal(res.body.notes[i].title, notes[i].title);
          assert.equal(res.body.notes[i].text, notes[i].text);
        }
      });
  });

  it('should get a specific note', async () => {
    const note = await factory.create('Note');

    return request(app)
      .get(`/${user.username}/notes/${note._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        assert.equal(res.body.note.title, note.title);
        assert.equal(res.body.note.text, note.text);
      });
  });

  it('should update a note', async () => {
    const note = await factory.create('Note');
    const newNoteData = await factory.build('Note');

    const res = await request(app)
      .put(`/${user.username}/notes/${note._id}`)
      .send(newNoteData)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const dbNote = await Note.findById(note._id);

    assert.equal(res.body.note.title, newNoteData.title, 'body');
    assert.equal(res.body.note.text, newNoteData.text);

    assert.equal(dbNote.title, newNoteData.title, 'db');
    assert.equal(dbNote.text, newNoteData.text);
  });

  it('should delete a note', async () => {
    const note = await factory.create('Note');

    await request(app)
      .delete(`/${user.username}/notes/${note._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const dbNote = await Note.findById(note._id);

    assert.notExists(dbNote);
  });

  after(() => {
    mongoose.connection.db.dropDatabase();
  });
});
