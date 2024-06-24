import { Router } from "express";
import { Container } from "inversify";
import { IVendorRepository, VendorRepository } from "../../repository";
import { INTERFACE_TYPE } from "../../utils";
import { AuthService } from "../../services/auth.service";
import { AuthController } from "../../controllers/auth.controller";
import { validate, validateUser } from "../../middlewares";
import { loginSchema } from "../../schemas";


const authRouter = Router()

const container = new Container();

container.bind<IVendorRepository>(INTERFACE_TYPE.VendorRepository).to(VendorRepository)

container.bind<AuthService>(INTERFACE_TYPE.AuthService).to(AuthService)

container.bind(INTERFACE_TYPE.AuthController).to(AuthController)

const authController = container.get<AuthController>(INTERFACE_TYPE.AuthController)


authRouter.post("/login" ,validate(loginSchema),authController.loginHandler.bind(authController) )


export default authRouter

