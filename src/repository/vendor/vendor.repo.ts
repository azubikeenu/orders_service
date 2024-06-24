import { injectable } from "inversify";
import { CreateVendorDto } from "../../dto";
import { Vendor, VendorDoc } from "../../models";
import { IVendorRepository } from "./ivendor.repo";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { FilterQuery, Types } from "mongoose";
import { Logger } from "../../utils";

@injectable()
export class VendorRepository implements IVendorRepository {


    async findByEmail(email: string) {
        try {
            const vendor = await Vendor.findOne({ email })
            return vendor as VendorDoc;
        } catch (error: any) {
            Logger.error(error)
            throw new Error(error?.message)
        }
    }

    async findById(_id: string) {
        if (!Types.ObjectId.isValid(_id)) {
            throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid or malformed vendorId supplied")
        }

        try {
            const vendor = await Vendor.findById(_id)
            return vendor;
        } catch (error: any) {
            Logger.error(error)
            throw new Error(error?.message)
        }

    }

    async filterVendors(query: FilterQuery<VendorDoc>) {
        try {
            const vendor = await Vendor.find(query)
            return vendor;
        } catch (error: any) {
            Logger.error(error)
            throw new Error(error?.message)
        }
    }


    async doesVendorExists(email: string): Promise<Boolean> {
        try{
            const exists = await Vendor.doesEmailExist(email)
            return exists;
    
        }catch(error : any){
            Logger.error(error)
            throw new Error(error?.message)
        }
      
    }

    async createVendor(input: CreateVendorDto) {
        try {
            const vendor = await Vendor.create(input);
            return vendor.toJSON();
        } catch (error: any) {
            Logger.error(error)
            throw new Error(error?.message)
        }

    }
}