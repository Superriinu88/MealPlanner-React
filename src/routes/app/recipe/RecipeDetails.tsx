
import { JwtContext } from "../../Root";
import { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";


import { Button, Card, Col, Row } from "react-bootstrap";

import { RecipeService } from "../../../services/app/RecipeService";
import { isErrorResponse } from "../../../helper";
import { IRecipe } from "../../../domain/IRecipe";




type IParams = { id: string }





const RecipeDetails = () => {
    const { id } = useParams() as IParams;

    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const recipeService = new RecipeService(setJwtResponse!);
    const [data, setData] = useState<IRecipe>();


    const loadData = async () => {


        let response = await recipeService.getById(id);

        if (!isErrorResponse(response)) {
            setData(response);
        } else {

            console.log("error")
        }
    }





    useEffect(() => {
        loadData();
    }, []);


    return (
        <>

        {data != undefined &&

            <Card

                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header>Servings: {data.servings}</Card.Header>
                <Card.Body>
                    <Card.Title> {data.name}</Card.Title>
                    <Card.Text>
                        {data.prepTime} min
                    </Card.Text>
                    <Card.Text>
                        {data.instructions} 
                    </Card.Text>
                    <Card.Text>
                        {data.ingredientsList?.map(e => <li>{e.name}</li>)} 
                    </Card.Text>
                </Card.Body>
            </Card>



        }



        </>

    );

}
export default RecipeDetails;
