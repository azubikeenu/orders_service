export interface CreateVendorDto {
    name: string;
    ownerName: string;
    foodType: string[];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}



export interface LoginDto {
    email: string,
    password: string
}


export type UpdateVendorDto = Omit<Partial<CreateVendorDto>, "password" | "email">

export type UpdateProfileDto = Pick<Partial<CreateVendorDto>, "email" | "name" | "foodType" | "address" | "phone">

