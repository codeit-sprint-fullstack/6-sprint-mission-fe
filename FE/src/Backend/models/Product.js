import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        // _id는 자동으로 생성해준다.
        name: {
        type: String,
        minLength: 1,
        maxLength: 10,
        required: true,
        },
        description: {
        type: String,
        minLength: 10,
        maxLength: 100,
        required: true,
        },
        price: {
        type: Number,
        minLength: 1,
        required: true,
        },
        tags: {
        type: [String],
        maxLength: 5,
        required: true,
        },
        like: {
        type: Number,
        default: 10,
        },
    },
    {
        timestamps: true,   // createdAt, updatedAt이 자동생성
    }
);

export const Product = mongoose.model("Product", ProductSchema);