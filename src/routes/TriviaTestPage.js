import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
export default function TriviaTestPage() {
  const location = useLocation();
  const data = location.state;
  const stats1 = {
    Productivity: 1,
    Resilience: 1,
    Ecofriendliness: 0,
  }
  return (
    <div>
      <h1>trivia demo</h1>
      <p>{data.message}</p>
      <Link to= '/' state={stats1}>
      <button>
        Back
      </button>
      </Link>
    </div>
  );
}
