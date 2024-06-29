import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { CreateVendorDto } from "../dto";
import { IVendorRepository } from "../repository";
import { INTERFACE_TYPE, Logger } from "../utils";

@injectable()
export class AdminService {

    private vendorRepository: IVendorRepository;

    constructor(@inject(INTERFACE_TYPE.VendorRepository) vendorRepository: IVendorRepository) {
        this.vendorRepository = vendorRepository;
    }

    async createVendor(createVendorInput: CreateVendorDto) {
        try {
            if (await this.vendorRepository.doesVendorExists(createVendorInput.email))
                throw createHttpError(StatusCodes.BAD_REQUEST, `Vendor with email : ${createVendorInput.email} already exists`)
            const response = await this.vendorRepository.createVendor(createVendorInput);
            return response;
        } catch (error: any) {
            Logger.error(error?.message)
            throw new Error(error?.message)
        }
    }

    async findVendorById(_id: string) {
        try {
            const vendor = await this.vendorRepository.findById(_id)
            if (!vendor) throw createHttpError(StatusCodes.NOT_FOUND, `vendor with id ${_id} does not exist`)
            return vendor
        } catch (error: any) {
            Logger.error(error?.message)
            throw new Error(error?.message)
        }

    }

    async findAllVendors() {
        try {
            const allVendors = await this.vendorRepository.filterVendors({})
            return allVendors;
        } catch (error: any) {
            Logger.error(error?.message)
            throw new Error(error?.message)
        }

    }

} 