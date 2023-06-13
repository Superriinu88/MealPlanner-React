import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";


interface IError {
    statusText?: string,
    message?: string,
}

const ErrorPage = () => {
    const error  = useRouteError() as IError;
    console.error(error);
    return (

        <div id="error-page">
            <div style={{display: "block"}}>
        <h1 >Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>    
        </p>
        <Link to="/" >Back home</Link>
       
        </div>
    </div>
    );
}
export default ErrorPage;