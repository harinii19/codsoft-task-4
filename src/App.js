import { BrowserRouter,Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateQuiz from './pages/CreateQuiz';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import { createContext, useState } from 'react';

const QuizContext=createContext();

export default function App(){
  const [quizzes,setQuizzes]=useState([]);
  const addQuiz=(quiz)=>{
    setQuizzes([...quizzes, quiz]);
  };
  return(
    <QuizContext.Provider value={{quizzes,addQuiz}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/HomePage' element={<HomePage />}></Route>
          <Route path='/create-quiz' element={<CreateQuiz />}></Route>
          <Route path='/quiz-list' element={<QuizList />}></Route>
          <Route path="/quiz/:id" element={<TakeQuiz />}></Route>
        </Routes>
      </BrowserRouter>
    </QuizContext.Provider>
  );
}
export{QuizContext};