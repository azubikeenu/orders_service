import { number, string, object, TypeOf, array } from 'zod';
const payload = {
    body: object({
        name: string({
            required_error: 'food name is required'
        }),

        description: string({
            required_error: 'description is required'
        }),

        foodType: string({ required_error: "food type is required" }),
        category: string({ required_error: "food type is required" }),
        readyTime: number({ required_error: "readyTime is required" }),
        price: number({ required_error: "price is required" }),
        vendorId : string({required_error : "vendorId is required"})

    })

}



export const createFoodSchema = object({
    ...payload
})



export type createFoodInput =   TypeOf<typeof createFoodSchema>