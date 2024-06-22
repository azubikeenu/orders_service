
import { number, string, object, TypeOf, array } from 'zod';



const payload = {
    body: object({
        name: string({
            required_error: 'vendor name is required'
        }),

        ownerName: string({
            required_error: 'owner name is required'
        }),

        foodType: string().array().nonempty(),
        pincode: string(),
        address: string({ required_error: 'address is required' }),
        phone: string({ required_error: 'phone number is required' }),
        email: string({ required_error: "email is required" }).email({ message: 'must be a valid email' }),
        password: string({ required_error: 'password is required' }).min(6, 'password must be atleast 6 characters long'),
        passwordConfirm: string({ required_error: 'password confirm is required' })
    }).refine((data) => data.password === data.passwordConfirm, {
        message: 'passwords do not match ',
        path: ['confirm password'],
    }),

}

const params = {
    params: object({
      vendorId: string({ required_error: 'vendor Id is required' }),
    }),
  };


export const createVendorSchema = object({
    ...payload
})


export const findVendorSchema = object({
    ...params
})




export type CreateVendorInput =  Omit<TypeOf<typeof createVendorSchema>, "body.passwordConfirm">

export type findVendorInput =   TypeOf<typeof findVendorSchema>

