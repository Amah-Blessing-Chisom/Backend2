
import { Product } from "../Model/product.js";

//create product
export const createProduct = async(req, res) => {
    try {
        const {name, price, description, image, category} = req.body
        const newproduct = await Product.create({
         name,
        price,
        description,
        image,
        category
        })
       res.status(201).json({
        success:true,
        message:"Product created successfully",
        product:newproduct
       })
    } catch (error) {
        console.error(error)
        res.status(500).json({success:false,
            message:"Server Error"
        })
    }
}

//get all products
export const getAllproducts = async(req, res) => {
    try {
        let Products = await Product.find()
        res.status(200).json({success:true, Products})
    }catch (error) {
        res.status(500).json({success:false,
            message:"server Error", error})
    }
}
//get all product by id
export const getproductById = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if(!product) return res.status(404).json
        ({message:"Product Not Fount"})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// update all products
export const updateProduct = async (req, res) => {
    let productId = req.params.id
    const {name, price, description, Image, category} =req.body

    try {
        let product = await Product.findById(productId)
        if (!product) return res.status(404).json({message:"User Not Found"})

            //update only provides fields
            product.name = name || product.name
            product.price = price || product.price
            product.description = description || product.description
            product.Image =  Image || product.Image
            product.category = category|| product.category
            await product.save()
            res.status(200).json({

                message:"Product Successfully Updated",
                product:{
                   id:product._id,
                   name:product.name,
                   price:product.price,
                   description:product.description,
                   Image:product.Image,
                   category:product.category

                }
            })
    } catch (error){
        res.status(500).json ({message:error.message})
    }
}

//delete Product
export const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({message:"product doesn't exist"})

            await product.deleteOne()
            res.status(200).json({message:"product deleted successfully"})
        
    } catch (error) {
        res.status
    }
}
