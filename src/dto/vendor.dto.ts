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



export interface LoginDto{
    email : string,
    password: string
}