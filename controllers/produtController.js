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