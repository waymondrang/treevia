import { Link } from "react-router-dom";
export default function TriviaTestPage() {
  return (
    <div>
      <h1>trivia demo</h1>
      <Link to={{ pathname: '/', state: { message: '011' } }}>
      <button>
        Back
      </button>
      </Link>
    </div>
  );
}
