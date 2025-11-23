const mongoose = require('mongoose');
const Quiz = require('./quizSchema');

describe('Quiz model', () => {
  test('should be a mongoose model', () => {
    expect(Quiz.prototype instanceof mongoose.Model).toBeTruthy();
  });

  describe('title field', () => {
    test('should be required', () => {
      const quiz = new Quiz();
      const validationError = quiz.validateSync();
      expect(validationError.errors['title'].message).toBe('Path `title` is required.');
    });
  });

  describe('description field', () => {
    test('should be required', () => {
      const quiz = new Quiz();
      const validationError = quiz.validateSync();
      expect(validationError.errors['description'].message).toBe('Path `description` is required.');
    });
  });

  describe('questions field', () => {
    test('should be an array', () => {
      const quiz = new Quiz();
      expect(quiz.questions).toBeInstanceOf(Array);
    });

    test('each question should have question, choices, and correctAnswer', () => {
      const quiz = new Quiz();
      quiz.questions.push({
        question: 'What is 2 + 2?',
        choices: ['3', '4', '5'],
        correctAnswer: '4'
      });
      expect(quiz.validateSync()).toBeUndefined();
    });

    test('question field should be required', () => {
      const quiz = new Quiz();
      quiz.questions.push({
        choices: ['3', '4', '5'],
        correctAnswer: '4'
      });
      const validationError = quiz.validateSync();
      expect(validationError.errors['questions.0.question'].message).toBe('Path `question` is required.');
    });

    test('choices field should be required', () => {
      const quiz = new Quiz();
      quiz.questions.push({
        question: 'What is 2 + 2?',
        correctAnswer: '4'
      });
      const validationError = quiz.validateSync();
      expect(validationError.errors['questions.0.choices'].message).toBe('Path `choices` is required.');
    });

    test('correctAnswer field should be required', () => {
      const quiz = new Quiz();
      quiz.questions.push({
        question: 'What is 2 + 2?',
        choices: ['3', '4', '5']
      });
      const validationError = quiz.validateSync();
      expect(validationError.errors['questions.0.correctAnswer'].message).toBe('Path `correctAnswer` is required.');
    });
  });
});