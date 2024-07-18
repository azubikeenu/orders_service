import { inject, injectable } from "inversify";
import { IVendorRepository } from "../repository";
import { INTERFACE_TYPE, Logger } from "../utils";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import { UpdateProfileDto, UpdateVendorDto } from "../dto";
import { boolean } from "zod";

@injectable()
export class VendorService {
  private vendorRepository: IVendorRepository;

  constructor(@inject(INTERFACE_TYPE.VendorRepository) vendorRepository: IVendorRepository) {
    this.vendorRepository = vendorRepository;
  }

  async getProfile(email: string) {
    try {
      const vendor = this.vendorRepository.findByEmail(email)
      if (!vendor) throw createHttpError(StatusCodes.NOT_FOUND, "Profile not found")
      return vendor
    } catch (error: any) {
      Logger.error(error?.message)
      throw error;
    }
  }


  async updateProfile(payload: UpdateProfileDto, id: string) {

    try {
      const updatedVendor = await this.vendorRepository.updateProfile(payload, id)
      return updatedVendor;
    } catch (error: any) {
      Logger.error(error?.message);
      throw error;
    }

  } 

  async updateService (id: string , status : boolean) {
    try {
      const updatedVendor = await this.vendorRepository.updateServiceStatus(id, status)
      return updatedVendor;
    } catch (error: any) {
      Logger.error(error?.message);
      throw error;
    }

}



}