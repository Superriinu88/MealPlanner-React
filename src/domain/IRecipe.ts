import { Ingredient } from "./Ingredient"

export interface IRecipe {
    id?: string
    name?: string
    prepTime: number,
    servings: number
    description?: string,
    instructions?:string,
    ingredientsList?: Ingredient[]
    
    

}

