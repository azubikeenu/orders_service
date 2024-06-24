
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";
import { VendorService } from "../services";


@injectable()
export class VendorController {
  private vendorService : VendorService

  constructor( @inject(INTERFACE_TYPE.VendorService) vendorService: VendorService){
    this.vendorService = vendorService

  }
  


}