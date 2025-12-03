import express from "express";
import Product from "../models/Product.js";


export const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
        });

        res.json(product);
    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.json(products);
    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}

export const getProductByCategory = async (req, res) => {
    try {
        const category = req.params.category
        const cat = await Category.findOne({ name: category });
        if (!cat) return res.status(404).json({success: false, message: "Category not found" });

        const products = await Product.find({ category: cat._id }).populate("category");
        res.json({success: true, products, category: cat});
    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}
