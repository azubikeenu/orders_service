import { Router } from "express";
import { Container } from "inversify";
import { VendorController } from "../../controllers";
import { INTERFACE_TYPE } from "../../utils";
import { createVendorSchema, findVendorSchema } from "../../schemas";
import { validate } from "../../middlewares";
import { VendorService } from "../../services";
import { IVendorRepository, VendorRepository } from "../../repository";




const vendorRoutes = Router()

const container = new Container();

container.bind<VendorService>(INTERFACE_TYPE.VendorService).to(VendorService)
container.bind<IVendorRepository>(INTERFACE_TYPE.VendorRepository).to(VendorRepository)
container.bind(INTERFACE_TYPE.VendorController).to(VendorController)

const vendorController = container.get<VendorController>(INTERFACE_TYPE.VendorController)

vendorRoutes.route("/")
.post( validate(createVendorSchema), vendorController.createVendorHandler.bind(vendorController))
.get(vendorController.getAllVendorsHandler.bind(vendorController))

vendorRoutes.route("/:vendorId")
.get(validate(findVendorSchema), vendorController.getVendorHandler.bind(vendorController))






export {vendorRoutes}