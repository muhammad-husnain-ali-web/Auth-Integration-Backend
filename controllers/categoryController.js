import express from "express";
import Category from "../models/Category.js";


export const addCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const category = await Category.create({ name, slug });
        res.json(category);
    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}

export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error)
        res.status(400).json("Server error")
    }
}