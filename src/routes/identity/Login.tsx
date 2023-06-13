import { MouseEvent, useContext, useState } from "react";
import { JwtContext } from "../Root";
import { LoginData } from "../../dto/LoginData";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isErrorResponse } from "../../helper";
import { ErrorResponse } from "../../dto/ErrorResponse";
import { IdentityService } from "../../services/IdentityService";








const Login = () => {

    const navigate = useNavigate();


    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const { register, handleSubmit, watch, clearErrors, formState: { errors } } = useForm<LoginData>();
    const identityService = new IdentityService();
    let error_message: ErrorResponse = { error: "", status: "" }
    const [serverError, setServerError] = useState<string>();



    const onSubmit = async (data: LoginData) => {

     

        var jwtData = await identityService.login(data);
    
        if (isErrorResponse(jwtData)) {
            setServerError(jwtData.error)
         
            return

        }

        if (setJwtResponse) {
            setJwtResponse(jwtData);
            navigate("/");
           
        }

        

      
    };


    return (

        <div id="login">

            <form onSubmit={handleSubmit(onSubmit)} >

                <h5>Log in</h5>
                <section>

                    <div className="form-floating mb-3">
                        <input {...register("email", {
                            required: "Please enter your email!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email!"
                            }
                        })}
                            placeholder="email"
                            className="form-control"
                            type="email"
                            id="email"
                            name="email" />
                        <p id="error_message">{errors.email?.message}</p>
                        <label className="form-label" htmlFor="email">Email</label>
                    </div>
                </section>

                <section>
                    <div className="form-floating mb-3">
                        <input {...register("password", {
                            required: "Password is required"
                        })}
                            placeholder="password"
                            className="form-control"
                            type="password"
                            id="password"
                            name="password" />
                        <p id="error_message">{errors.password?.message}</p>
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>
                </section>

                <section>
                    <input type='submit' />
                    <p id="error_message">{serverError}</p>

                </section>
            </form>
        </div>
    );

}
export default Login;
