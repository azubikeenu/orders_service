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


}