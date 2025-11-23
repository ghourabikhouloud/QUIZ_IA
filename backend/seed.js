const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const quizzes = [
	{
		title: 'Quiz 1',
		description: 'Description du Quiz 1',
		questions: [
			{
				question: 'Question 1 du Quiz 1',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 1'
			},
			{
				question: 'Question 2 du Quiz 1',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 2'
			},
			{
				question: 'Question 3 du Quiz 1',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 3'
			}
		]
	},
	{
		title: 'Quiz 2',
		description: 'Description du Quiz 2',
		questions: [
			{
				question: 'Question 1 du Quiz 2',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 1'
			},
			{
				question: 'Question 2 du Quiz 2',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 2'
			},
			{
				question: 'Question 3 du Quiz 2',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 3'
			}
		]
	},
	{
		title: 'Quiz 3',
		description: 'Description du Quiz 3',
		questions: [
			{
				question: 'Question 1 du Quiz 3',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 1'
			},
			{
				question: 'Question 2 du Quiz 3',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 2'
			},
			{
				question: 'Question 3 du Quiz 3',
				choices: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
				correctAnswer: 'Réponse 3'
			}
		]
	}
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('MongoDB connected');
		Quiz.insertMany(quizzes, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('Quizzes seeded successfully');
			}
			mongoose.connection.close();
		});
	})
	.catch(err => console.log(err));