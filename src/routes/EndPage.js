import "./EndPage.css";
import Stats from '../components/Stats.jsx';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function EndPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['Button1','Button2','Button3','Button4','Button5','Button6']);
    const [cookies2, setCookie2, removeCookie2] = useCookies(["sustainability","productivity","soil","carbon","disaster","water", "allSet", "total", "highestTotal"]);
    const clear = () => {
        if(cookies2.total > cookies2.highestTotal){
            setCookie2('highestTotal', cookies2.total, { path: '/' });
        }
        removeCookie('Button1');
        removeCookie('Button2');
        removeCookie('Button3');
        removeCookie('Button4');
        removeCookie('Button5');
        removeCookie('Button6');
        removeCookie2("sustainability");
        removeCookie2("productivity");
        removeCookie2("soil");
        removeCookie2("carbon");
        removeCookie2("disaster");
        removeCookie2("water");
        removeCookie2("allSet");
        removeCookie2("total");
        window.location.reload();
      };
    return(
        <div className="EndPage">
            <header>
                <h1>Your Results!</h1>
            </header>
            <body>
                <Stats className = 'Stats'/>
                <p>Total: {cookies2.total}</p>
                <Link to='/local'>
                <button onClick={clear}>Play Again?</button>
                </Link>
                <Link to='/'>
                <button onClick={clear}>Back to Home</button>
                </Link>
            </body>
        </div>
    );
}