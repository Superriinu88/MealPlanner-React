
import { Ingredient } from "../../domain/Ingredient";
import { JWTResponse } from "../../dto/JWTResponse";

import { BaseEntityService } from "../BaseEntityService";

export class IngredientsService extends BaseEntityService<Ingredient> {
    constructor(setJwtResponse: ((data: JWTResponse | null) => void)) {
        super('ingredients', setJwtResponse);
    }


}