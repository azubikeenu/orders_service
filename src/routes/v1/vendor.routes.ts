import { Router } from "express";
import { Container } from "inversify";
import { VendorController } from "../../controllers";
import { INTERFACE_TYPE } from "../../utils";
import { isAuthenticated, validate } from "../../middlewares";
import { VendorService } from "../../services";
import { IVendorRepository, VendorRepository } from "../../repository";




const vendorRoutes = Router()

const container = new Container();

container.bind<IVendorRepository>(INTERFACE_TYPE.VendorRepository).to(VendorRepository)
container.bind<VendorService>(INTERFACE_TYPE.VendorService).to(VendorService)
container.bind(INTERFACE_TYPE.VendorController).to(VendorController)

const vendorController = container.get<VendorController>(INTERFACE_TYPE.VendorController);

vendorRoutes.use(isAuthenticated)

vendorRoutes.route("/profile").get(vendorController.getProfileHandler.bind(vendorController))
    .patch(vendorController.updateProfile.bind(vendorController));

vendorRoutes.post('/toggle-service',vendorController.updateService.bind(vendorController) )   


export { vendorRoutes }