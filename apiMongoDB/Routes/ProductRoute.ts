import express, { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import {
    createProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductByCatID,
    getProductByID
} from '../Controllers/ProductControllers';

const router = express.Router();

// ⚙ Cấu hình lưu trữ hình ảnh
const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + "-" + Date.now() + path.extname(file.originalname));
    }
});

const images = multer({ storage: imagesStorage }).array('images') as RequestHandler;

// 🛠 Định nghĩa các route API
router.post('/createProduct', images, createProduct as RequestHandler);
router.get('/getProductByCatID/:CatID', getProductByCatID as RequestHandler);
router.get('/getProductByID/:id', getProductByID as RequestHandler);
router.get('/getAllProducts', getAllProducts as RequestHandler);
router.get('/getFeaturedProducts', getFeaturedProducts as RequestHandler);

export { router as ProductRoute };
