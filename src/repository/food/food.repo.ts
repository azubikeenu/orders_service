import { injectable } from "inversify";
import { IFoodRepository } from "./ifood.repo";
import { CreateFoodDto } from "../../dto/food.dto";
import { Food } from "../../models";
import { Logger } from "../../utils";


@injectable()
export class FoodRepository implements IFoodRepository {

    async createFood(payload: CreateFoodDto) {
        try {
            const food = await Food.create(payload);
            return food;

        } catch (error: any) {
            Logger.error(error);
            throw new Error(error?.message)
        }
    }
}