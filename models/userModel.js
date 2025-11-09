import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    username:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
       trim:true
    },
    products:[{ type: mongoose.Schema.Types.ObjectId, ref: "product"}]

},{
    timestamps:true
});
export const userModel = mongoose.model("User",userSchema);


const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  brand: { type: String, required: true },    // e.g. "MRF", "Michelin"
  model: { type: String, required: true },    // e.g. "ZLX", "Pilot Sport"
  size: { type: String, required: true },     // e.g. "205/55 R16"
  price: { type: Number, required: true },    // Selling price
  stock: { type: Number, default: 0 }         // How many products available
}, { timestamps: true });

export const productmodel= mongoose.model("product", productSchema);

