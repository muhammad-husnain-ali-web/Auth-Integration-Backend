import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true, min: [1, "Price must be greater than 0"], },
  stock: { type: Number, required: true , min: [1, "Stock must be greater than 0"],},
  images: {type: [String], required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
}, { timestamps: true });


if (models.Product) {
    delete models.Product;
}

export default model("Product", productSchema);


// export default mongoose.model("Product", productSchema);
