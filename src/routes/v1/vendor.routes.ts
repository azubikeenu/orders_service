import { Router } from "express";
import { Container } from "inversify";
import { VendorController } from "../../controllers";
import { INTERFACE_TYPE } from "../../utils";
import { validate } from "../../middlewares";
import { VendorService } from "../../services";
import { IVendorRepository, VendorRepository } from "../../repository";




const vendorRoutes = Router()

const container = new Container();




export {vendorRoutes}