import { inject, injectable } from "inversify";

import { INTERFACE_TYPE } from "../utils";
import { CreateFoodDto } from "../dto/food.dto";
import { IFoodRepository } from "../repository";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

@injectable()
export class FoodService {
    private foodRepository: IFoodRepository;

    constructor(@inject(INTERFACE_TYPE.FoodRepository) foodRepository: IFoodRepository) {
        this.foodRepository = foodRepository;
    }


    async createFood(payload: CreateFoodDto) {
        try {
            const food = await this.foodRepository.createFood(payload);
            return food;
        } catch (error: any) {
            throw error
        }
    }

    async findFood(id: string) {
        try {
            const food = await this.foodRepository.findById(id);
           if (!food) throw createHttpError(StatusCodes.NOT_FOUND, ` Food with id : ${id} does not exist`)
            return food;
        } catch (error: any) {
            throw error
        }
    }
}