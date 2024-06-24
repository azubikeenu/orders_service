
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { VendorService } from "../services";
import { CustomRequest } from "../types";
import { NextFunction, Response } from "express";


@injectable()
export class VendorController {
  private vendorService: VendorService

  constructor(@inject(INTERFACE_TYPE.VendorService) vendorService: VendorService) {
    this.vendorService = vendorService

  }

  async getProfileHandler(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { vendor } = req;
      const foundVendor = await this.vendorService.getProfile(String(vendor?.email));
      return res.status(200).json({
        status: "success",
        data: {
          vendor: foundVendor
        }
      })
    } catch (error: any) {
      next(error)
    }

  }



}