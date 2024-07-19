import { Router } from "express";
import { Container } from "inversify";
import { VendorController } from "../../controllers";
import { INTERFACE_TYPE } from "../../utils";
import { isAuthenticated, validate } from "../../middlewares";
import { FoodService, VendorService } from "../../services";
import { FoodRepository, IFoodRepository, IVendorRepository, VendorRepository } from "../../repository";
import { createFoodSchema, findFoodSchema } from "../../schemas";


const vendorRoutes = Router()

const container = new Container();

container.bind<IVendorRepository>(INTERFACE_TYPE.VendorRepository).to(VendorRepository)
container.bind<IFoodRepository>(INTERFACE_TYPE.FoodRepository).to(FoodRepository)


container.bind<VendorService>(INTERFACE_TYPE.VendorService).to(VendorService)
container.bind<FoodService>(INTERFACE_TYPE.FoodService).to(FoodService)



container.bind(INTERFACE_TYPE.VendorController).to(VendorController)

const vendorController = container.get<VendorController>(INTERFACE_TYPE.VendorController);

vendorRoutes.use(isAuthenticated)

vendorRoutes.route("/profile").get(vendorController.getProfileHandler.bind(vendorController))
    .patch(vendorController.updateProfile.bind(vendorController));

vendorRoutes.post('/toggle-service',vendorController.updateService.bind(vendorController) )   

vendorRoutes.post("/add-food", validate(createFoodSchema), vendorController.addFood.bind(vendorController));

vendorRoutes.get("/foods", vendorController.getFoods.bind(vendorController));

vendorRoutes.post("/foods/upload-image/:foodId", validate(findFoodSchema),vendorController.uploadFoodImages.bind(vendorController));


export { vendorRoutes }