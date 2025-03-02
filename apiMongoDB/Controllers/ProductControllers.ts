import { Request, Response } from 'express';
import { PRODUCTS } from '../Models/ProductModel';
import { ProductParams } from '../dto/Product';

const path = 'http://localhost:9000/assets/';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, oldPrice, description, quantity, inStock, isFeatured, category } = req.body as ProductParams;

        if (!name || !price || !category) {
            res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin sản phẩm." });
            return;
        }

        // Lấy danh sách ảnh từ req.files
        const files = req.files as Express.Multer.File[];
        const images = files?.map(file => path + file.filename) || [];

        const product = new PRODUCTS({
            name,
            images,
            price,
            oldPrice,
            description,
            quantity,
            inStock,
            isFeatured,
            category
        });

        await product.save();
        res.status(201).json({ message: "Sản phẩm được tạo thành công!", product });
    } catch (error) {
        console.error("❌ Lỗi khi tạo sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server khi tạo sản phẩm.", error });
    }
};

export const getProductByCatID = async (req: Request, res: Response): Promise<void> => {
    try {
        const { CatID } = req.params;
        if (!CatID) {
            res.status(400).json({ message: "Thiếu mã danh mục sản phẩm." });
            return;
        }

        console.log(`🔍 Tìm sản phẩm theo danh mục: ${CatID}`);
        const result = await PRODUCTS.find({ category: CatID });

        if (!result.length) {
            res.status(404).json({ message: "Không tìm thấy sản phẩm nào trong danh mục này." });
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("❌ Lỗi khi lấy sản phẩm theo danh mục:", error);
        res.status(500).json({ message: "Lỗi server khi lấy sản phẩm theo danh mục.", error });
    }
};

export const getProductByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Thiếu ID sản phẩm." });
            return;
        }

        const product = await PRODUCTS.findById(id);
        if (!product) {
            res.status(404).json({ message: "Không tìm thấy sản phẩm." });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("❌ Lỗi khi lấy sản phẩm theo ID:", error);
        res.status(500).json({ message: "Lỗi server khi lấy sản phẩm theo ID.", error });
    }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await PRODUCTS.find().sort({ createdAt: -1 });

        if (!products.length) {
            res.status(404).json({ message: "Không có sản phẩm nào." });
            return;
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Lỗi khi lấy tất cả sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server khi lấy tất cả sản phẩm.", error });
    }
};

export const getFeaturedProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const featuredProducts = await PRODUCTS.find({ isFeatured: true });

        if (!featuredProducts.length) {
            res.status(404).json({ message: "Không có sản phẩm nổi bật." });
            return;
        }

        res.status(200).json(featuredProducts);
    } catch (error) {
        console.error("❌ Lỗi khi lấy sản phẩm nổi bật:", error);
        res.status(500).json({ message: "Lỗi server khi lấy sản phẩm nổi bật.", error });
    }
};
