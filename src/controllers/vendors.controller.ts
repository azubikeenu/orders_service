import { Request,Response,NextFunction } from "express";
import { CreateVendorInput, findVendorInput } from "../schemas";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { VendorService } from "../services";
import { StatusCodes } from "http-status-codes";


@injectable()
export class VendorController {
  private vendorService : VendorService

  constructor( @inject(INTERFACE_TYPE.VendorService) vendorService: VendorService){
    this.vendorService = vendorService

  }

  createVendorHandler = async (req : Request<{}, {}, CreateVendorInput['body']> ,res : Response , next : NextFunction) => {
      try{

      const data = await this.vendorService.createVendor(req.body)
        return res.status(201).json({
          status : 'success',
          message : "vendor created successfully",
          data
         })
      } catch(error){
        next(error)
      }   
      
      
  }


  
  getVendorHandler = async (req : Request<findVendorInput["params"]> ,res : Response , next : NextFunction) => {
    try{
     const vendorId =  req.params.vendorId
     const vendor =  await this.vendorService.findVendorById(vendorId);
      return res.status(StatusCodes.OK).json({
        status : "success",
        message : "Vendor Retreived Successfully",
        data : vendor
      })

    }catch(error){
      next(error)
    }
   
  }


  getAllVendorsHandler = async (req : Request ,res : Response , next : NextFunction) => {
    try {
      const vendors =  await this.vendorService.findAllVendors();
      return res.status(StatusCodes.OK).json({
        status : "success",
        message : "Vendors Retreived Successfully",
        data : vendors
      })

    }catch(error){
      next(error)
    }

  }
    
  
  updateVendorHandler = async (req : Request ,res : Response , next : NextFunction) => {

  }


  deleteVendorHandler = async (req : Request ,res : Response , next : NextFunction) => {

  }

}