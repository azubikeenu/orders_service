
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { FoodService, VendorService } from "../services";
import { CustomRequest } from "../types";
import { NextFunction, Response } from "express";
import { UpdateProfileDto } from "../dto";
import { createFoodInput } from "../schemas/food.schema";
import { StatusCodes } from "http-status-codes";



@injectable()
export class VendorController {
  private vendorService: VendorService
  private foodService : FoodService

  constructor(@inject(INTERFACE_TYPE.VendorService) vendorService: VendorService ,
  @inject(INTERFACE_TYPE.FoodService) foodService: FoodService
       ) {
    this.vendorService = vendorService
    this.foodService = foodService

  }

  async getProfileHandler(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { vendor } = req;
      return res.status(200).json({
        status: "success",
        data: {
          vendor
        }
      })
    } catch (error: any) {
      next(error)
    }

  }

  async updateProfile(req: CustomRequest<{}, {}, UpdateProfileDto>, res: Response, next: NextFunction) {
    try {
     const { vendor } = req;
     await this.vendorService.updateProfile(req.body, vendor?.toJSON()._id)
    
      return res.status(200).json({
        status: "success",
        message : "vendor successfully updated"
      })
    } catch (error: any) {
      next(error)
    }
  }



  async updateService(req: CustomRequest, res: Response, next: NextFunction) {
    try {
     const { vendor } = req;
     const status = !vendor?.serviceAvailable
     const updated =  await this.vendorService.updateService( vendor?.toJSON()._id, status);
      return res.status(200).json({
        status: "success",
        message : "vendor service updated",
        data : {
          isServiceAvailable : updated.serviceAvailable
        }
      })
    } catch (error: any) {
      next(error)
    }
  }

  async addFood(req : CustomRequest<{},{},createFoodInput['body']> , res : Response , next : NextFunction){
       try{
        const {vendor} = req;
        const food =  await this.foodService.createFood(req.body)
        vendor?.foods.push(food);
        await vendor?.save();

        return res.status(StatusCodes.OK).json({
          status : "success",
          message : "Food added to vendor successfully",
          data : {
            food 
          }
        })

       }catch(error : any){
        next(error)
       }
         
  }

  


}