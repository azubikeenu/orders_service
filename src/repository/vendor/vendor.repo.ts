import { injectable } from "inversify";
import { CreateVendorDto } from "../../dto";
import { Vendor, VendorDoc } from "../../models";
import { IVendorRepository } from "./ivendor.repo";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { FilterQuery, QueryOptions, Types } from "mongoose";

@injectable()
export class VendorRepository implements IVendorRepository {
    async findById(_id: string) {
        if(!Types.ObjectId.isValid(_id)){
            throw createHttpError(StatusCodes.BAD_REQUEST , "Invalid or malformed vendorId supplied")
          }

        try{
            const vendor =  await Vendor.findById(_id)
            return vendor;
           }catch(error : any){
              throw createHttpError(StatusCodes.INTERNAL_SERVER_ERROR , error?.message)
           }
       
    }

    async filterVendors(query: FilterQuery<VendorDoc>) {
         try{
          const vendor =  await Vendor.find(query)
          return vendor;
         }catch(error : any){
            throw createHttpError(StatusCodes.INTERNAL_SERVER_ERROR , error?.message)
         }
    }

   
    async doesVendorExists(email: string): Promise<Boolean> {
        const exists = await Vendor.doesEmailExist(email)
        return exists;

    }

    async createVendor(input: CreateVendorDto) {
        try {
            const vendor = await Vendor.create(input);
            return vendor.toJSON();
        } catch (error: any) {
            throw createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, "error occurred while creating vendor")
        }

    }
}