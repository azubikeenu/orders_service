import { inject, injectable } from "inversify";
import { IVendorRepository } from "../repository";
import { INTERFACE_TYPE, Logger } from "../utils";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";

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
      throw new Error(error?.message)
    }


  }


}