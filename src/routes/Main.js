import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="centered" id="main-menu">
      <h1>UntitledTrivia</h1>
      <div className="button-collection">
        <Link to={`/play`} className="button-link">
          <button>
            <span>Play</span>
          </button>
        </Link>
        <Link to={`/host`} className="button-link">
          <button>
            <span>Host</span>
          </button>
        </Link>
        <Link to={`/local`} className="button-link">
          <button>
            <span>Local</span>
          </button>
        </Link>
        <Link to={`/demo`} className="button-link">
          <button>
            <span>Demo</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
