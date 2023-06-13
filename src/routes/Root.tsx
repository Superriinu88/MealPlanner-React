import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";


import { JWTResponse } from "../dto/JWTResponse";
import Header from "../components/Header";

export const JwtContext = createContext<{ jwtResponse: JWTResponse | null, setJwtResponse: ((data: JWTResponse | null) => void) | null }>
    ({
        jwtResponse: null,
        setJwtResponse: null
    });


const Root = () => {

    const [jwtResponse, setJwtResponse] = useState(null as JWTResponse | null);

    return (
        <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
                 <Header/>

            <div className="container">
                <main role="main" className="pb-3">
                    <Outlet />
                </main>
            </div>

       
        </JwtContext.Provider>
    );


}
export default Root;