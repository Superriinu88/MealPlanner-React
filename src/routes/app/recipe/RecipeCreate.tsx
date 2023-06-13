import { useContext, useEffect, useState } from "react";
import { JwtContext } from "../../Root";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, FormControl, FormLabel } from "react-bootstrap";


import Select, { ActionMeta, MultiValue } from 'react-select'
import { RecipeService } from "../../../services/app/RecipeService";
import { IRecipe } from "../../../domain/IRecipe";
import { ErrorResponse } from "../../../dto/ErrorResponse";
import { IngredientsService } from "../../../services/app/IngredientsService";
import { Ingredient } from "../../../domain/Ingredient";
import { isErrorResponse } from "../../../helper";


const RecipeCreate = () => {

    const navigate = useNavigate();
    let error_message: ErrorResponse = { error: "", status: "" }
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IRecipe>();
    //const watchAddArtist = watch("artist", false);
    const ingredientService = new IngredientsService(setJwtResponse!);
    const recipeService = new RecipeService(setJwtResponse!);

    const [recipe, setRecipe] = useState([] as IRecipe[]);
    const [ingredients, setIngredient] = useState([] as Ingredient[]);
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);


    const loadData = async () => {

        if (jwtResponse) {

            let resultIngredient = await ingredientService.getAll(jwtResponse!);


            if (!isErrorResponse(resultIngredient)) {
                setIngredient(resultIngredient);


            } else {

                // veateated

            }
        }
        else {

            navigate("/login")
        }
    }


    function handleSelect(selectedIngredients: any) {
        setSelectedIngredients(selectedIngredients);
    }

    useEffect(() => {
        loadData();
    }, []);

    const onSubmit = async (data: IRecipe) => {

        data.ingredientsList = selectedIngredients;

        var response = await recipeService.create("/create", data, jwtResponse!);

        if (isErrorResponse(response)) {
            error_message.error = response.error
            return
        }
        navigate("/recipes");
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
             
                <Col>
                    <label>Name recipe</label>
                    <input type="string" {...register("name", { required: "Please input recipes name" })} />
                    {errors.name && (<text id="error_message">{errors.name.message}</text>)}
                </Col>
                <Col>
                    <label>Description
                        <input  {...register("description", { required: "Please write short description" })} /></label>
                    {errors.description && (<text id="error_message">{errors.description.message}</text>)}
                </Col>
              
                <Col>
                    <label>Instructions
                        <input  {...register("instructions", { required: "Please write instructions" })} /></label>
                    {errors.description && (<text id="error_message">{errors.instructions!.message}</text>)}
                </Col>
                <Col>
                    <label>Total time in minutes
                        <input type="number"  {...register("prepTime", { required: "Cooking time is required" })} /></label>
                    {errors.prepTime && (<text id="error_message">{errors.prepTime!.message}</text>)}
                </Col>
                <Col>
                    <label>Servings
                        <input type="number"  {...register("servings", { required: "Please input servings" })} /></label>
                    {errors.servings && (<text id="error_message">{errors.servings!.message}</text>)}
                </Col>
                <Col>

                
                    <label>Choose ingredients(s)</label>
                    <Select
                        className="react-selectcomponent"
                        classNamePrefix="name-select"
                        onChange={handleSelect}
                        getOptionLabel={ing =>
                            `${ing.name}`
                        }
                        getOptionValue={option => `${option.id}`}
                        options={ingredients}
                        isSearchable={true}
                        placeholder="Choose..."
                        autoFocus={true}
                        isMulti
                    />
                </Col>
                <br />
                <input type="submit" />
            </form>

    

        </>
    );
}
export default RecipeCreate;
