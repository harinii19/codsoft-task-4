import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './QuizList.css'

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    setQuizzes(storedQuizzes);
  }, []);

  const handleMenuToggle = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleEdit = (index) => {
    const quizToEdit = quizzes[index];
    navigate('/create-quiz', { state: { quiz: quizToEdit } });
  };

  const handleDelete = (index) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index);
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    console.log('Delete quiz:', index);
  };

  return (
    <>
      <Header />
      <div className="quiz-list-container">
        <h2>Available Quizzes</h2>
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index} className='title'>
              <span className='quiz-title'>{quiz.title}</span>
              <button
                className="start-quiz-button"
                onClick={() => navigate(`/quiz/${index}`)}
              >Start Quiz</button>
              <div className="menu-container">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  onClick={() => handleMenuToggle(index)}
                />
                {showOptions === index && (
                  <div className="options-menu">
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuizList;
