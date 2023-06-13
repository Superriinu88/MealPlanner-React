import { useContext } from "react";
import { JwtContext } from "../routes/Root";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import IdentityHeader from "./IdentityHeader";


const Header = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    {<NavLink className="navbar-brand" to="/">WebApp</NavLink>}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">

                            <li className="nav-item" >
                                <NavLink to="recipes" className="nav-link">Recipes</NavLink> </li>




                   

             

                     

                        {<ul className="navbar-nav">
                            <IdentityHeader />
                        </ul>} 

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Header;