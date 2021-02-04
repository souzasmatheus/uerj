import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Question } from './components/organism';

import data from './data';

function App() {
  const [question, setQuestion] = useState(null);

  const isQuestionAvailable = (question, length) => {
    const questions = JSON.parse(localStorage.getItem('questions'));
    if (!questions) return true;
    if (questions.length === length) {
      localStorage.setItem('questions', JSON.stringify([]));
      return true;
    }
    return !questions.includes(question);
  };

  const saveQuestion = (question) => {
    const questions = JSON.parse(localStorage.getItem('questions'));
    if (!questions) {
      localStorage.setItem('questions', JSON.stringify([question]));
      return;
    }
    localStorage.setItem('questions', JSON.stringify([...questions, question]));
  };

  const getRandomQuestion = () => {
    const { length } = data;
    let randomQuestion = Math.floor(Math.random() * (length - 0) + 0);
    while (!isQuestionAvailable(randomQuestion, length)) {
      randomQuestion = Math.floor(Math.random() * (length - 0) + 0);
    }
    saveQuestion(randomQuestion);
    return randomQuestion;
  };

  const getNewQuestion = () => {
    setQuestion(data[getRandomQuestion()]);
  };

  useEffect(() => {
    getNewQuestion();
  }, []);

  return (
    <Container className="mt-5">
      {question && <Question data={question} onNewQuestion={getNewQuestion} />}
    </Container>
  );
}

export default App;
