from mongoengine import Document, StringField, IntField, BooleanField, DateTimeField, ObjectIdField, ReferenceField
from mongoengine import connect
from bson import ObjectId

connect(db='test_db', host='mongodb://localhost:27017/test_db') # Connectez-vous à votre base de données MongoDB

class Quiz(Document):
    title = StringField()
    description = StringField()
    questions = StringField()
    meta = {'collection': 'quizs'}

class Question(Document):
    text = StringField()
    choices = StringField()
    correctAnswer = StringField()
    meta = {'collection': 'questions'}

class Submission(Document):
    quizId = ReferenceField('Quiz')
    answers = StringField()
    score = IntField()
    submittedAt = DateTimeField(default=datetime.datetime.utcnow)
    meta = {'collection': 'submissions'}

