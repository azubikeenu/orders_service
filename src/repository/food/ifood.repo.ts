import { CreateFoodDto } from "../../dto/food.dto";

export interface IFoodRepository {
  createFood(payload : CreateFoodDto)

}