import express, { Request, Response } from 'express';
import { PRODUCTS } from '../Models/ProductModel';
import { ProductParams } from '../dto/Product';

const path = 'http://localhost:9000/assets/';

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, oldPrice, description, quantity, inStock, isFeatured, category } = <ProductParams>req.body;

    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => path + file.filename);

    const product = new PRODUCTS({
        name: name,
        images: images,
        price, oldPrice, description, quantity, inStock, isFeatured, category
    });

    try {
        console.log(product);
        await product.save();
        res.status(200).json(`Product created successfully :-) at ${path}!!!`);
    } catch (error) {
        res.status(500).json(`Failed to create Product: ${error} :-( `);
    }
};

export const getProductByCatID = async (req: Request, res: Response) => {
    console.log(req.params.CatID);
    try {
        const result = await PRODUCTS.find({ category: req.params.CatID });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`ProductByID fetch failed ${error} :-( `);
    }
};

export const getProductByID = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Product fetch failed ${error} :-( `);
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find().sort({ createdAt: -1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Products not found ${error} :-( `);
    }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find({ isFeatured: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(`Featured Products fetch failed: ${error} :-( `);
    }
};

export const searchProductsByName = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
        res.status(400).json({ message: "Vui lòng cung cấp từ khóa tìm kiếm hợp lệ." });
        return;
    }

    try {
        const result = await PRODUCTS.find({
            name: { $regex: name, $options: "i" }
        });

        if (result.length === 0) {
            res.status(404).json({ message: "Không tìm thấy sản phẩm nào." });
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Lỗi khi tìm kiếm sản phẩm: ${error}` });
    }
};




