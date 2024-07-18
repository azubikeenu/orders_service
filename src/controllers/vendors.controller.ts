
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { VendorService } from "../services";
import { CustomRequest } from "../types";
import { NextFunction, Response } from "express";
import { UpdateProfileDto } from "../dto";


@injectable()
export class VendorController {
  private vendorService: VendorService

  constructor(@inject(INTERFACE_TYPE.VendorService) vendorService: VendorService) {
    this.vendorService = vendorService

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


}