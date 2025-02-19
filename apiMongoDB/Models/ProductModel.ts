import mongoose, { Schema, Document } from "mongoose";

interface ProductDocument extends Document {
    name: string;
    images: string[];
    price?: number;
    oldPrice?: number;
    description: string;
    quantity: number;
    inStock: boolean;
    isFeatured: boolean;
    category: mongoose.Schema.Types.ObjectId;
}

const ProductSchema = new Schema<ProductDocument>({
    name: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        default: 0
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 9999
    },
    inStock: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
}, { timestamps: true });

const PRODUCTS = mongoose.model<ProductDocument>("Product", ProductSchema);

export { PRODUCTS };
