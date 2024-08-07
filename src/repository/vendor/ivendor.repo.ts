import mongoose, { FilterQuery, QueryOptions } from "mongoose";
import { CreateVendorDto, UpdateProfileDto, UpdateVendorDto } from "../../dto";
import { VendorDoc } from "../../models";


export interface IVendorRepository {
  createVendor(input : CreateVendorDto)
  doesVendorExists(email : string) : Promise<Boolean>
  filterVendors( query: FilterQuery<VendorDoc>)
  findById(_id : string)
  findByEmail(email: string) : Promise<VendorDoc>
  updateVendor(input : UpdateVendorDto  , id : string)
  updateProfile(input : UpdateProfileDto , id : string)
  updateServiceStatus(id : string, status : boolean);
  getVendorFoods(_id: string)

}