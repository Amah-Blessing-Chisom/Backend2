import express from "express"
import { createProduct, getAllproducts, getproductById } from "../controller/product.js";
import { updateProduct ,deleteProduct} from "../controller/product.js";
const ProductRoute = express.Router()
ProductRoute.post('/', createProduct)
ProductRoute.get('/', getAllproducts)
ProductRoute.get('/:id', getproductById)
ProductRoute.put('/update/:id', updateProduct)
ProductRoute.put('/update/:id', updateProduct)
ProductRoute.delete('/delete/:id', deleteProduct)


export default ProductRoute