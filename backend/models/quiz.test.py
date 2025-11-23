import unittest
from unittest.mock import patch, Mock
from hypothesis import given
from hypothesis.strategies import text, lists
from mongoengine import connect, disconnect
from .quiz import Quiz

class TestQuiz(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        connect('test_db', host='mongomock://localhost')

    @classmethod
    def tearDownClass(cls):
        disconnect()

    def test_create_quiz_success(self):
        quiz = Quiz(title="Test Quiz")
        self.assertEqual(quiz.title, "Test Quiz")

    def test_create_quiz_missing_title(self):
        with self.assertRaises(Exception):
            Quiz().save()

    def test_create_quiz_empty_questions(self):
        quiz = Quiz(title="Test Quiz", questions=[])
        quiz.save()
        self.assertEqual(len(quiz.questions), 0)

    @given(text(min_size=1, max_size=200), lists(elements=text(), min_size=1, max_size=5))
    def test_create_quiz_hypothesis(self, title, question_list):
        quiz = Quiz(title=title, questions=[Question(question_text=q) for q in question_list])
        quiz.save()
        self.assertEqual(quiz.title, title)
        self.assertEqual(len(quiz.questions), len(question_list))

if __name__ == '__main__':
    unittest.main()