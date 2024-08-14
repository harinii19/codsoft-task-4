import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import './TakeQuiz.css';

const TakeQuiz = () => {
  const { id } = useParams(); // Get the quiz ID from URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  // const [score, setScore] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    // console.log('Quizzes:', quizzes);
    // console.log('Quiz ID:', id);
    const quizToTake = quizzes[id];
    // console.log('Quiz to Take:', quizToTake);
    setQuiz(quizToTake);
    setAnswers(new Array(quizToTake?.questions.length || 0).fill(''));
  }, [id]);

  const handleAnswerChange = (qIndex, value) => {
    if(result) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResult();
  };

  const calculateResult = () => {
    if (!quiz) return;

    const correctAnswers = quiz.questions.map(q => q.correctAnswer); // Assumes each question has a correct ans
    const userAnswers = answers;

    // let score = 0;
    // userAnswers.forEach((answer, index) => {
    //   if (answer === correctAnswers[index]) {
    //     score += 1;
    //   }
    const newResult = quiz.questions.map((q, index) => ({
      question: q.question,
      options: q.options.map(option => ({
        option,
        isCorrect: option === q.correctAnswer,
        isSelected: userAnswers[index] === option,
        showCorrect: option === q.correctAnswer && userAnswers[index] !== q.correctAnswer
      }))
    }));

    setResult(newResult);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="quiz-container">
        <h2>{quiz.title}</h2>
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="question-block">
              <p>{q.question}</p>
              <div className={`options-container ${result ? 'locked' : ''}`}>
                {result ? (
                  result[qIndex].options.map((opt, oIndex) => (
                    <div
                      key={oIndex}
                      className={`option-label ${opt.isSelected ? (opt.isCorrect ? 'correct' : 'incorrect') : ''}
                      ${opt.showCorrect ? 'show-correct' : ''}`}
                    >
                      {opt.option}
                    </div>
                  ))
                ) : (
                  q.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className={`option-label ${answers[qIndex] === option ? 'selected' : ''}`}
                      onClick={() => handleAnswerChange(qIndex, option)}
                    >
                      {option}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
          <button type="submit" className="submit-button" disabled={result}>Submit</button>
        </form>
        {result && (
          <div className="score-container">
            <h3>Your Score: {answers.filter((ans, index) => ans === quiz.questions[index].correctAnswer).length} / {quiz.questions.length}</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default TakeQuiz;
