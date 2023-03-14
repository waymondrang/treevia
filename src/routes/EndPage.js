import "./EndPage.css";
import Stats from '../components/Stats.jsx';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function EndPage() {
    var cookies1 = ['Button1','Button2','Button3','Button4','Button5','Button6'];
    const [cookies, setCookie, removeCookie] = useCookies(['Button1','Button2','Button3','Button4','Button5','Button6']);
    const [cookies2, setCookie2,removeCookie2] = useCookies(["sustainability","productivity","soil","carbon","disaster","water", "allSet", "total", "highestTotal"]);
    
    removeCookie('Button1');
    removeCookie('Button2');
    removeCookie('Button3');
    removeCookie('Button4');
    removeCookie('Button5');
    removeCookie('Button6');
    setCookie2("sustainability", 0, { path: "/", sameSite: 'Strict' });
    setCookie2("productivity", 0, { path: "/" , sameSite: 'Strict'});
    setCookie2("soil", 0, { path: "/" , sameSite: 'Strict'});
    setCookie2("carbon", 0, { path: "/", sameSite: 'Strict'}); 
    setCookie2("disaster", 0, { path: "/", sameSite: 'Strict'});
    setCookie2("water", 0, { path: "/", sameSite: 'Strict'});
    setCookie2("total", 0, { path: "/", sameSite: 'Strict'});
    setCookie2("allSet", false,{ path: "/", sameSite: 'Strict'});

    return(
        <div className="EndPage">
            <header>
                <h1>Your Results!</h1>
            </header>
            <div className="body">
                <p>Total: {cookies2.total}</p>
                <a onClick={() => {window.location.href="/local"}}>
                <Link to='/local'>
                <button>Play Again?</button>
                </Link>
                </a>
                <Link to='/'>
                <button>Back to Home</button>
                </Link>
            </div>
        </div>
    );
}