import { injectable } from "inversify";
import { CreateVendorDto, UpdateProfileDto, UpdateVendorDto } from "../../dto";
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
        this.isValidId(_id);

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
        try {
            const exists = await Vendor.doesEmailExist(email)
            return exists;

        } catch (error: any) {
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

    async updateVendor(patch: UpdateVendorDto, id: string) {
        this.isValidId(id)
        try{
            const updatedVendor = await Vendor.findByIdAndUpdate(id , patch , { new : true})
            return updatedVendor;

        }catch(error : any){
            Logger.error(error)
            throw new Error(error?.message)
        }
    }



    async updateProfile(patch: UpdateProfileDto, id: string) {
        this.isValidId(id)
        try{
            const updatedVendor = await Vendor.findByIdAndUpdate(id , patch , { new : true})
            return updatedVendor;

        }catch(error : any){
            Logger.error(error)
        throw new Error(error?.message)
        }
    }


   async updateServiceStatus(id: string, status : boolean) {
        this.isValidId(id)
        try{
            const updatedVendor = await Vendor.findByIdAndUpdate(id , {serviceAvailable : status}, {new : true} )
            return updatedVendor;

        }catch(error : any){
            Logger.error(error)
        throw new Error(error?.message)
        }
       
    }



    private isValidId(_id: string) {
        if (!Types.ObjectId.isValid(_id)) {
            throw createHttpError(StatusCodes.NOT_FOUND, `vendor with id ${_id} does not exist`);
        }
    }
}