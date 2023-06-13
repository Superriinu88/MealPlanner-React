import { Link, useNavigate } from "react-router-dom";
import { JwtContext } from "./Root";

import { useContext, useEffect, useState } from "react";
import { IngredientsService } from "../services/app/IngredientsService";
import { Ingredient } from "../domain/Ingredient";

import { Card, Col } from "react-bootstrap";

import Select, { ActionMeta, MultiValue } from 'react-select'
import { useForm } from "react-hook-form";
import { RecipeService } from "../services/app/RecipeService";
import { isErrorResponse } from "../helper";
import { IRecipe } from "../domain/IRecipe";



interface Search {

    search?: string,
}
const Home = () => {

    const navigate = useNavigate();
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const ingredientService = new IngredientsService(setJwtResponse!);
    const recipeService = new RecipeService(setJwtResponse!);
    const [data, setData] = useState([] as IRecipe[]);
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Search>();




    // This function is triggered when the Search buttion is clicked




    const onSubmit = async (search: Search) => {


        if (search.search != undefined) {
            var response = await recipeService.getRecipesId(search.search, jwtResponse!);

            if (!isErrorResponse(response)) {
                setData(response);
            }
            else {
                return
            }
        }


    };

    useEffect(() => {
        if (data !== undefined) {

        }


    }, [data]);



    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Col>
                    <label>Search..</label>
                    <input type="string"  {...register("search", { required: "Please input recipes name" })}
                    />

                </Col>

                <input type="submit" />
            </form >
                <br/>
            <h5>Recipes: {data == undefined ? 0: data.length}</h5>

            {
                data != undefined && data.map(recipe =>
                    
                    <Link key={recipe.id} style={{ textDecoration: "none" }} to={"/recipes/" + recipe!.id}>
                        <Card

                            style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Header>Servings: {recipe.servings}</Card.Header>
                            <Card.Body>
                                <Card.Title> {recipe.name}</Card.Title>
                                <Card.Text>
                                    {recipe.prepTime} min
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                )
            }

        </>
    );

}
export default Home;


