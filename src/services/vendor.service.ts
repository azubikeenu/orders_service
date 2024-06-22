import { inject, injectable } from "inversify";
import { IVendorRepository } from "../repository";
import { INTERFACE_TYPE } from "../utils";
import { CreateVendorDto } from "../dto";

import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";

@injectable()
export class VendorService {
  private vendorRepository: IVendorRepository;

  constructor(@inject(INTERFACE_TYPE.VendorRepository) vendorRepository: IVendorRepository) {
    this.vendorRepository = vendorRepository;
  }

  async createVendor(createVendorInput: CreateVendorDto) {
    if (await this.vendorRepository.doesVendorExists(createVendorInput.email))
      throw createHttpError(StatusCodes.BAD_REQUEST, `Vendor with email : ${createVendorInput.email} already exists`)
    const response = await this.vendorRepository.createVendor(createVendorInput);
    return response;

  }

  async findVendorById(_id: string) {
    const vendor = await this.vendorRepository.findById(_id)
    if (!vendor) throw createHttpError(StatusCodes.NOT_FOUND, `vendor with id ${_id} does not exist`)
    return vendor
  }

  async findAllVendors() {
    const allVendors = await this.vendorRepository.filterVendors({})
    return allVendors;
  }


}