import { productmodel, userModel } from "../models/userModel.js";

export const addproduct = async (req, res) => {
  try {
    const { brand, model, size, price, stock } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).send("User not authenticated");
    }

    // Check if product exists for this user
    const existingProduct = await productmodel.findOne({
      user: req.user._id,
      model,
      size,
    });

    if (existingProduct) {
      return res.send("Product already exists with same model and size");
    }

    // Create product
    const product = await productmodel.create({
      user: req.user._id,
      brand,
      model,
      size,
      price,
      stock,
    });

    // Push product to user's products array
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { products: product._id } },
      { new: true } // important
    );
    res.redirect("/users/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
export const allProducts = async(req,res)=>{
   const products = await productmodel.find({ user: req.user._id });
  res.render("products", { products });
}
export const updateStock = async (req, res) => {
  const { action } = req.body;
  const product = await productmodel.findById(req.params.id);
  if (!product) return res.redirect("/products/all");

  if (action === "increase") product.stock += 1;
  if (action === "decrease" && product.stock > 0) product.stock -= 1;

  await product.save();
  res.redirect("/products/all");
}
export const deleteproduct = async (req, res) => {
  await productmodel.findByIdAndDelete(req.params.id);
  res.redirect("/products/all");
};
export const editproduct=async (req, res) => {
  const product = await productmodel.findById(req.params.id);
  res.render("editProduct", { product });
};
export const updateproduct = async (req, res) => {
  const { brand, model, size, price, stock } = req.body;
  await productmodel.findByIdAndUpdate(req.params.id, { brand, model, size, price, stock });
  res.redirect("/products/all");
};