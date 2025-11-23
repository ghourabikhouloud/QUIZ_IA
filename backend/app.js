const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Quiz = require('../models/quizModel');

describe('App initialization', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should connect to MongoDB', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  describe('API endpoints', () => {
    let quiz;

    beforeAll(async () => {
      quiz = await Quiz.create({ title: 'Test Quiz', questions: [] });
    });

    afterAll(async () => {
      await quiz.remove();
    });

    test('GET /api/quizzes should return all quizzes', async () => {
      const response = await request(app).get('/api/quizzes');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('POST /api/quizzes should create a new quiz', async () => {
      const newQuiz = { title: 'New Quiz', questions: [] };
      const response = await request(app).post('/api/quizzes').send(newQuiz);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('New Quiz');
    });

    test('GET /api/quizzes/:id should return a specific quiz', async () => {
      const response = await request(app).get(`/api/quizzes/${quiz._id}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Test Quiz');
    });

    test('PUT /api/quizzes/:id should update a quiz', async () => {
      const updatedQuiz = { title: 'Updated Quiz', questions: [] };
      const response = await request(app).put(`/api/quizzes/${quiz._id}`).send(updatedQuiz);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Quiz');
    });

    test('DELETE /api/quizzes/:id should delete a quiz', async () => {
      const response = await request(app).delete(`/api/quizzes/${quiz._id}`);
      expect(response.status).toBe(204);
    });
  });
});