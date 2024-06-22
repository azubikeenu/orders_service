import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcrypt';
import config from '../config';



interface IVendor extends Model<VendorDoc> {
    doesEmailExist: (email: string) => Promise<boolean>
  }

export interface VendorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    foods: any,
}


const VendorSchema  = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String], default: [] },
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    serviceAvailable: { type: Boolean, default: true },
    coverImages: { type: [String], default: [] },
    rating: { type: Number },
    foods: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'food'
    }],

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;

        }
    },
    timestamps: true
});


VendorSchema.pre('save', async function (next) {
    let vendor = this as VendorDoc;
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt((Number(config.saltWalkFactor)));
    const hash = await bcrypt.hash(vendor.password, salt);

    vendor.password = hash;
});




VendorSchema.statics.doesEmailExist = async function (
    email: string,
): Promise<boolean> {
    const vendor = await this.findOne({ email }).lean()
    return Boolean(vendor)
}




const Vendor = mongoose.model<VendorDoc,IVendor>('vendor', VendorSchema);

export { Vendor }