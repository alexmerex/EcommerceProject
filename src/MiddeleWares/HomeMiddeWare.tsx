import React from "react";
import { ProductListParams } from "../TypesCheck/HomeProps";
import axios from "axios";

// ---- Interface cho hàm fetchCategories ----
interface ICatProps {
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

// ---- Interface cho hàm fetchProductsByCatID ----
interface IProdByCatProps {
    catID: string;
    setGetProductsByCatID: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

// ---- Interface cho hàm fetchTrendingProducts ----
interface ITrendingProps {
    setTrendingProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

// 🚀 **Lấy danh sách danh mục sản phẩm**
export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
    try {
        const response = await axios.get("http://192.168.100.202:9000/category/getAllCategories");
        console.log("fetchCategories - API Response:", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://192.168.100.202")
                )
            }));

            setGetCategory(fixedData);
        } else {
            console.warn("fetchCategories: Dữ liệu API không phải là mảng", response.data);
            setGetCategory([]);
        }
    } catch (error) {
        console.log("fetchCategories - Axios error:", error);
        setGetCategory([]);
    }
};

// 🚀 **Lấy danh sách sản phẩm theo danh mục**
export const fetchProductsByCatID = async ({ setGetProductsByCatID, catID }: IProdByCatProps) => {
    try {
        const response = await axios.get(`http://192.168.100.202:9000/product/getProductByCatID/${catID}`);
        console.log("fetchProductsByCatID - API Response:", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://192.168.100.202")
                )
            }));

            setGetProductsByCatID(fixedData);
        } else {
            console.warn("fetchProductsByCatID: Dữ liệu API không phải là mảng", response.data);
            setGetProductsByCatID([]);
        }
    } catch (error) {
        console.log("fetchProductsByCatID - Axios error:", error);
        setGetProductsByCatID([]);
    }
};

// 🚀 **Lấy danh sách sản phẩm xu hướng (trending)**
export const fetchTrendingProducts = async ({ setTrendingProducts }: ITrendingProps) => {
    try {
        const response = await axios.get("http://192.168.100.202:9000/product/getTrendingProducts");
        console.log("fetchTrendingProducts - API Response:", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://192.168.100.202")
                )
            }));

            setTrendingProducts(fixedData);
        } else {
            console.warn("fetchTrendingProducts: Dữ liệu API không phải là mảng", response.data);
            setTrendingProducts([]);
        }
    } catch (error) {
        console.log("fetchTrendingProducts - Axios error:", error);
        setTrendingProducts([]);
    }
};

export const searchProductsByName = async ({ name, setSearchResults }: { name: string, setSearchResults: Function }) => {
    try {
        const API_URL = "http://192.168.100.202:9000/api/products/searchProductsByName"; // Cập nhật IP máy tính

        const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSearchResults(data);
    } catch (error) {
        console.error("Error fetching search results:", error.message);
        setSearchResults([]);
    }
};
