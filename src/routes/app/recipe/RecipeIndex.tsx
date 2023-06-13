import { useContext, useEffect, useState } from "react";
import { RecipeService } from "../../../services/app/RecipeService";
import { JwtContext } from "../../Root";
import { IRecipe } from "../../../domain/IRecipe";
import { isErrorResponse } from "../../../helper";
import {Card} from 'react-bootstrap';
import { Link } from "react-router-dom";

const RecipeIndex = () => {


    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const recipeService = new RecipeService(setJwtResponse!);
    const [data, setData] = useState([] as IRecipe[]);



    useEffect(() => {


        recipeService.getAll().then(
            response => {
                console.log(response);
                if (!isErrorResponse(response)) {
                    setData(response);
                } else {
                    //todo: delete jwt and redirect to login page
                    setData([]);
                }
            }
        );




    }, []);
    return (
        <>
  
        <h5>Recipes</h5>
       {<h6 style={{ 'display': jwtResponse == null ? 'none' : '' }} > <Link to="/recipes/create" >Add new</Link></h6>}
       <div className="card-columns"></div>
        {data.map(recipe => 
          <Link key={recipe.id}  style={{textDecoration: "none"}} to={"/recipes/" + recipe!.id}>
        <Card
    
        
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
        )}
     
        
        </>
    )
}
export default RecipeIndex;