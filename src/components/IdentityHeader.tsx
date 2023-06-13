import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { JwtContext } from "../routes/Root";
import { IdentityService } from "../services/IdentityService";
import jwt_decode from "jwt-decode";



const IdentityHeader = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const navigate = useNavigate();
    const identityService = new IdentityService();

    const logout = () => {
        if (jwtResponse)
            identityService.logout(jwtResponse).then(response => {
                if (setJwtResponse)
                    setJwtResponse(null);
                navigate("/");
            });
    }

    if (jwtResponse) {
        let jwtObject: any = jwt_decode(jwtResponse.jwt);


        return (
            <>
                <li className="nav-item">
                    <Link to="info" className="nav-link text-dark">
                        <UserInfo jwtObject={jwtObject} />
                    </Link>
                </li>
                <li className="nav-item">
                    <a onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }} className="nav-link" href="#">Logout</a>
                </li>
            </>
        );
    }
    return (
        <>
            <li className="nav-item">
                <NavLink to="register" className="nav-link">Register</NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="login"  className="nav-link">Login</NavLink>
            </li>
        </>
    );
}

interface IUserInfoProps {
    jwtObject: any
}

const UserInfo = (props: IUserInfoProps) => {
    return (
        <>
            {/*    {props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] + ' '}
            {props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname']+ ' '}  */}
            {"Hello " + props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}
        </>
    );
}

export default IdentityHeader;
