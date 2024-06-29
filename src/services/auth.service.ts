
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import { inject, injectable } from "inversify";
import { IVendorRepository } from "../repository";
import { INTERFACE_TYPE, Logger } from "../utils";
import { LoginDto } from "../dto";
import * as jwt from "jsonwebtoken";
import config from "../config";

@injectable()
export class AuthService {
  private vendorRepository: IVendorRepository;

  constructor(@inject(INTERFACE_TYPE.VendorRepository) vendorRepository: IVendorRepository) {
    this.vendorRepository = vendorRepository;
  }

  async loginUser(loginDto: LoginDto) {
    try {
      const user = await this.vendorRepository.findByEmail(loginDto.email)
      if (!user || !(await user?.comparePassword(loginDto.password))) throw createHttpError(StatusCodes.UNAUTHORIZED, "Invalid username or password");
      const token = jwt.sign({ email: user.email }, String(config.jwtSecret), {
        algorithm: 'HS512',
        expiresIn: "1hr"
      })
      return token;
    } catch (error: any) {
      Logger.error(error?.message)
      throw new Error(error?.message)
    }


  }







}