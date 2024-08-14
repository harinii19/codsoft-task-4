import React, { useState, useEffect,useContext } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {QuizContext} from '../App';
import Header from '../components/Header';
import './CreateQuiz.css';

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const { addQuiz } = useContext(QuizContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.quiz) {
      const { title, questions } = location.state.quiz;
      setQuizTitle(title);
      setQuestions(questions);
    }
  }, [location.state?.quiz]);

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuiz = { title: quizTitle, questions };
    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    if (location.state?.quiz) {
      // Editing an existing quiz
      const quizIndex = existingQuizzes.findIndex(quiz => quiz.title === location.state.quiz.title);
      if (quizIndex !== -1) {
        existingQuizzes[quizIndex] = newQuiz;
        localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));
        navigate('/quiz-list'); // Navigate to Quiz List page
      }
    } else {
      // Creating a new quiz
      existingQuizzes.push(newQuiz);
      localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));
      navigate('/quiz-list'); // Navigate to Quiz List page
    }
  };
  
  

  return (
    <>
      <Header />
      <div className="quiz-container">
      <h2>{location.state?.quiz ? `Edit Quiz: ${quizTitle}` : 'Create a New Quiz'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={handleQuizTitleChange}
            required
          />
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="question-block">
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                required
              /><br />
              {q.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  className="option-block"
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  required
                />
              ))}
              <input
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                required
              />
              <hr />
            </div>
          ))}
          <div className="button-container">
          <button type="button" onClick={addQuestion}>Add Question</button>
          <button type="submit">{location.state?.quiz ? 'Update Quiz' : 'Create Quiz'}</button>
          </div>
        </form>
      </div>
    </>
  );
}
