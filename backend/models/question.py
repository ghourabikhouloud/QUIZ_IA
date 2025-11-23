import unittest
from unittest.mock import patch
from hypothesis import given
from hypothesis.strategies import text

from mongoengine import connect, disconnect
from your_module import Question

class TestQuestion(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        connect('mongoenginetest', host='mongomock://localhost')

    @classmethod
    def tearDownClass(cls):
        disconnect()

    def test_create_question_success(self):
        question = Question(text='What is 2+2?', choices=['4', '5', '6'], answer='4')
        question.save()
        self.assertIsNotNone(question.id)

    def test_create_question_missing_text(self):
        with self.assertRaises(Exception):
            question = Question(choices=['4', '5', '6'], answer='4')
            question.save()

    def test_create_question_missing_answer(self):
        with self.assertRaises(Exception):
            question = Question(text='What is 2+2?', choices=['4', '5', '6'])
            question.save()

    @given(text())
    def test_text_length_constraint(self, text):
        if len(text) <= 500:
            question = Question(text=text, choices=['4', '5', '6'], answer='4')
            self.assertIsNotNone(question.id)
        else:
            with self.assertRaises(Exception):
                question = Question(text=text, choices=['4', '5', '6'], answer='4')
                question.save()

if __name__ == '__main__':
    unittest.main()