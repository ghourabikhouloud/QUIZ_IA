import unittest
from unittest.mock import patch
from hypothesis import given
import hypothesis.strategies as st
from app import app

class TestApp(unittest.TestCase):

    @given(st.text())
    def test_get_quiz_detail_not_found(self, quiz_id):
        with app.test_client() as client:
            response = client.get(f"/api/quizzes/{quiz_id}")
            self.assertEqual(response.status_code, 404)
            self.assertEqual(response.json, {"error": "Quiz not found"})

    @patch('app.Quiz')
    @patch('app.Question')
    def test_get_quizzes(self, mock_question, mock_quiz):
        mock_question.objects.all.return_value = [{'id': "1", 'text': "Sample question"}]
        mock_quiz.objects.all.return_value = [{'id': "1", 'title': "Sample quiz"}]
        
        with app.test_client() as client:
            response = client.get("/api/quizzes")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, [{"_id": "1", "title": "Sample quiz"}])

if __name__ == '__main__':
    unittest.main()