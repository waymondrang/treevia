import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-section" className="centered">
      <div id="error-content" className="centered">
        <h1>Oops!</h1>
        <p>{error.statusText || error.message}</p>
        <div className="button-collection">
          <Link to={`/`} className="button-link">
            <button>
              <span>Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
