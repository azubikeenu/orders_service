import mongoose, { FilterQuery, QueryOptions } from "mongoose";
import { CreateVendorDto } from "../../dto";
import { VendorDoc } from "../../models";


export interface IVendorRepository {
  createVendor(input : CreateVendorDto)
  doesVendorExists(email : string) : Promise<Boolean>
  filterVendors( query: FilterQuery<VendorDoc>)
  findById(_id : string)
  findByEmail(email: string)

}