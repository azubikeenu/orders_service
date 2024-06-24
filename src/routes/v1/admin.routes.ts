import { Router } from "express";
import { AdminService } from "../../services/admin.service";
import { IVendorRepository, VendorRepository } from "../../repository";
import { INTERFACE_TYPE } from "../../utils";
import { AdminController } from "../../controllers";
import { isAuthenticated, validate } from "../../middlewares";
import { createVendorSchema, findVendorSchema } from "../../schemas";
import { Container } from "inversify";


const adminRoute = Router()

const container = new Container();

container.bind<AdminService>(INTERFACE_TYPE.AdminService).to(AdminService)
container.bind<IVendorRepository>(INTERFACE_TYPE.VendorRepository).to(VendorRepository)
container.bind(INTERFACE_TYPE.AdminController).to(AdminController)

const adminController = container.get<AdminController>(INTERFACE_TYPE.AdminController)

adminRoute.use(isAuthenticated)

adminRoute.route("/vendors")
.post( validate(createVendorSchema), adminController.createVendorHandler.bind(adminController))
.get(adminController.getAllVendorsHandler.bind(adminController))

adminRoute.route("/vendors/:vendorId")
.get(validate(findVendorSchema), adminController.getVendorHandler.bind(adminController))



export {adminRoute}