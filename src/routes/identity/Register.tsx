import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../dto/RegisterData";
import { IdentityService } from "../../services/IdentityService";
import { JwtContext } from "../Root";
import { useForm } from "react-hook-form";
import { isErrorResponse } from "../../helper";



//TODO: backi errorid logida
const Register = () => {
    const navigate = useNavigate();


    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const { register, handleSubmit, setError, watch, getValues, formState: { errors } } = useForm<RegisterData>();


    const identityService = new IdentityService();
    const onSubmit = async (data: RegisterData) => {
        var jwtData = await identityService.register(data);
        if (isErrorResponse(jwtData)) {
            setError("error", {
                type: "server", message: jwtData.error
            });
            return
        }
        if (setJwtResponse) {
            setJwtResponse(jwtData);
            navigate("/");
       
        }

    };

    return (
        <div id="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Create a new account</h5>



                <section>
                    <div className="form-floating mb-3">
                        <input  {...register("email", {
                            required: "Please enter your email!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email!"
                            }
                        })}
                            placeholder="email"
                            className="form-control"
                            type="email"
                            id="Input_Email"
                            name="email" />
                        <p id="error_message">{errors.email?.message}</p>
                        <label htmlFor="Input_Email">Email</label>
                    </div>
                </section>
                <section>
                    <div className="form-floating mb-3">
                        <input {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long!"
                            }
                        })}
                        placeholder="password"
                            className="form-control"
                            type="password"
                            id="password"
                            name="password" />
                        <p id="error_message">{errors.password?.message}</p>
                        <label htmlFor="password">Password</label>
                    </div>
                </section>
                <section>
                    <div className="form-floating mb-3">
                        <input {...register("confirmPassword", {
                            validate: (match) => {
                                const password = getValues("password")
                                return match === password || "Passwords should match!"
                            }
                        })}
                        placeholder="confirm password"
                            className="form-control"
                            autoComplete="new-password" type="password"
                            id="confirmPassword" name="confirmPassword" />
                        <p id="error_message">{errors.confirmPassword?.message}</p>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>

                </section>

                <section>
                    <div className="form-floating mb-3">
                        <input
                            {...register("firstName", {
                                required: "Please enter your first name",
                                maxLength: {
                                    value: 64,
                                    message: "First name cannot exceed 20 characters"
                                },
                                pattern: {
                                    value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                                    message: "Alphabetical characters only"
                                }
                            })}
                            placeholder="first name"
                            className="form-control"
                            type="text"
                            id="firstName"
                            name="firstName" />
                        <p id="error_message">{errors.firstName?.message}</p>
                        <label htmlFor="firstName">First name</label>
                    </div>
                </section>
                <section>
                    <div className="form-floating mb-3">
                        <input {...register("lastName", {
                            required: "Please enter your last name",
                            pattern: {
                                value:/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                                message: 'Alphabetical characters only'
                            }
                        })}
                            placeholder="last name"
                            className="form-control"
                            type="text"
                            id="lastName"
                            name="lastName" />
                        <p id="error_message">{errors.lastName?.message}</p>
                        <label htmlFor="lastName">Last name</label>
                    </div>
                </section>
                <section>
                    <input type="submit" />
                    <p id="error_message">{errors.error?.message}</p>
                </section>
           
            </form>
          
        </div>
    )

}
export default Register;