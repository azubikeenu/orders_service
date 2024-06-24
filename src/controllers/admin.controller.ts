import { Response, Request, NextFunction } from "express";
import { AdminService } from "../services/admin.service";
import { INTERFACE_TYPE } from "../utils";
import { inject, injectable } from "inversify";
import { CreateVendorInput, findVendorInput } from "../schemas";
import { StatusCodes } from "http-status-codes";

@injectable()
export class AdminController {
    private adminService: AdminService;

    constructor(@inject(INTERFACE_TYPE.AdminService) adminService: AdminService) {
        this.adminService = adminService;

    }

    createVendorHandler = async (req: Request<{}, {}, CreateVendorInput['body']>, res: Response, next: NextFunction) => {
        try {

            const data = await this.adminService.createVendor(req.body)
            return res.status(201).json({
                status: 'success',
                message: "vendor created successfully",
                data
            })
        } catch (error) {
            next(error)
        }

    }





    getVendorHandler = async (req: Request<findVendorInput["params"]>, res: Response, next: NextFunction) => {
        try {
            const vendorId = req.params.vendorId
            const vendor = await this.adminService.findVendorById(vendorId);
            return res.status(StatusCodes.OK).json({
                status: "success",
                message: "Vendor Retreived Successfully",
                data: vendor
            })

        } catch (error) {
            next(error)
        }

    }


    getAllVendorsHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vendors = await this.adminService.findAllVendors();
            return res.status(StatusCodes.OK).json({
                status: "success",
                message: "Vendors Retreived Successfully",
                data: vendors
            })

        } catch (error) {
            next(error)
        }

    }


    updateVendorHandler = async (req: Request, res: Response, next: NextFunction) => {

    }


    deleteVendorHandler = async (req: Request, res: Response, next: NextFunction) => {

    }


}