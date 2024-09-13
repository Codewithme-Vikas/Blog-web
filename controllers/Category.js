const Category = require("../models/Category");

// ********************************* Get Category ***************************************
exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if( !id ){
            return res.status(400).json({success:false, message : "Please provide the Id parameter"});
        }

        // Good to do : populate the posts
        const category = await Category.findById(id);

        if( !category ){
            return res.status(400).json({success:false, message : "category is not found"});
        }

        return res.status(200).json({
            success:true, 
            message : "Get category data successfully",
            category
        });

    } catch (error) {
        console.log("API Error............! in get category controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't fetched the category from the DB",
            error: error.message
        })
    }
}


// ********************************* Get All Categories ***************************************
exports.getCategories = async (req, res) => {
    try {
        console.log("hi ij kase ho *********************************************")

        // Good to do : populate the posts
        const allCategories = await Category.find();

        if( !allCategories ){
            return res.status(400).json({success:false, message : "categories are not found"});
        }

        return res.status(200).json({
            success:true, 
            message : "Get all categories data successfully",
            allCategories
        });


    } catch (error) {
        console.log("API Error............! in get all categories controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't fetched the categories from the DB",
            error: error.message
        })
    }
}


// ********************************* Create Category ***************************************
exports.createCategory = async (req, res) => {
    try {
        const { title, description } = req.body;

        if( !title || !description ){
            return res.status(400).json({success:false, message : "Please provide all the require fields"});
        }

        // is category already exists
        const isCategoryExists = await Category.findOne({ title });

        if( isCategoryExists ){
            return res.status(400).json({success:false, message : "Category already exists!"});
        }

        const newCategory = await Category.create({
            title,
            description
        });

        return res.status(200).json({
            success : true,
            message : "Category created successfully",
            newCategory
        });

    } catch (error) {
        console.log("API Error............! in create category controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't create the category from the DB",
            error: error.message
        })
    }
}


// ********************************* Update Category ***************************************
exports.updateCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const { title, description } = req.body;

        if(!id){
            return res.status(400).json({success:false, message : "Please provide the id"});
        }


        // Good to do : check is similar title is already exists or not

        
        const updatedCategory = await Category.findByIdAndUpdate(id,{
            $set : {
                title,
                description,
            }
        },{ new : true});

        return res.status(200).json({
            success : true,
            message : "Catgeory updated successfully",
            updatedCategory
        });

    } catch (error) {
        console.log("API Error............! in update category controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't udpate the category from the DB",
            error: error.message
        })
    }
}


// ********************************* Delete Category ***************************************
exports.deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({success:false, message : "Please provide the id"});
        }

        const deletedCategory = await Category.findByIdAndDelete(id);

        // remove category from the all posts

        return res.status(200).json({
            success : true,
            message : "Catgeory deleted successfully",
            deletedCategory
        });
    } catch (error) {
        console.log("API Error............! in delete category controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't delete the category from the DB",
            error: error.message
        })
    }
}