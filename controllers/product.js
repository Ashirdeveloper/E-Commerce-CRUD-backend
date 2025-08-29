import ProductModel from '../models/product.js';
const ProductCreate = async(req,res)=>{
    try {
        const userID = req.params.userID;
        const { title, description, imageUrl } = req.body;
        if (!title || !description ||  !imageUrl || !userID) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const newProduct = new ProductModel({
            title,
            description,
            imageUrl,
            userID
        });
        await newProduct.save();
        return res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error("Error in ProductCreate:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
 }

 const Update =async (req,res) =>{
    try {
        const ProductID = req.params.id
        const { title, description, imageUrl } = req.body;
        const FindProduct= await ProductModel.findById({_id: ProductID});
        if (!FindProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        const UpdateProduct = await ProductModel.findByIdAndUpdate(
            { _id: ProductID },
            { title, description, imageUrl },
            { new: true }
        );
       return res.status(200).json({ success: true, message: 'Product Updated successfully!', product: UpdateProduct});
        
    } catch (error) {
        console.error("Error in ProductUpdate:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
 }
const Delete = async (req, res) => {
    try {
        const ProductID = req.params.id;
        const FindProduct= await ProductModel.findById({_id: ProductID});
        if (!FindProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        await ProductModel.findByIdAndDelete({ _id: ProductID });
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error in ProductDelete:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const GetProduct = async (req,res)=>{
    try {
        const userID = req.params.userID;
        const Products= await ProductModel.find({userID})
        return res.status(200).json({ success: true, Products });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });  
    }
}
 export { ProductCreate, Update , Delete, GetProduct };