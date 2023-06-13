

import { IRecipe } from "../../domain/IRecipe";
import { JWTResponse } from "../../dto/JWTResponse";

import { BaseEntityService } from "../BaseEntityService";

export class RecipeService extends BaseEntityService<IRecipe> {
    constructor(setJwtResponse: ((data: JWTResponse | null) => void)) {
        super('recipes', setJwtResponse);
    }


}