import { CreateFoodDto } from "../../dto/food.dto";

export interface IFoodRepository {
  createFood(payload : CreateFoodDto)
  findById(id: string)

}