import Header from '../components/Header';
import { Link } from 'react-router-dom';
import './HomePage.css'

export default function HomePage() {
    return (
      <>
        <Header />
        <div className="homepage-container">
          <h2>Welcome to the Quiz App!</h2>
          <p>Ready to test your knowledge? Create or take a quiz now.</p>
          <div className="buttons">
            <Link to="/create-quiz" className="btn">Create a Quiz</Link>
            <Link to="/quiz-list" className="btn">Take a Quiz</Link>
          </div>
        </div>
      </>
    );
  }

