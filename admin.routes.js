'use strict'

const router = require('express').Router()
const AdminController = require('../../application/controllers-services/controllers/admin.controller')
const FileUploader = require('../../configurations/helpers/file-upload-multer')
const { ValidateParams, ValidateBody } = require('../../configurations/middlewares/validation')
const { ParamSchemas, BodySchemas } = require('../../application/schemas/schema')
const { RequestMethodsMiddlewares } = require('../../configurations/middlewares/middlewares')


// 1: Add Category
router.post('/category',
    RequestMethodsMiddlewares.ApplicationFormData,
    FileUploader.uploadFile,
    AdminController.Category.Add)

// Edit Category
router.put('/editcategory',
    RequestMethodsMiddlewares.ApplicationFormData,
    FileUploader.uploadFile,
    AdminController.Category.Edit)

//Edit Category Image
router.put('/editCategoryImage',
    RequestMethodsMiddlewares.ApplicationFormData,
    FileUploader.uploadFile,
    AdminController.Category.UpdateImage)

//Delete sub category
router.post('/deleteCategoryImage',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Category.DeleteImage)

// Delete Category
router.post('/deletecategory',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Category.Delete)

// 2: Add Tag
router.post('/tag',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Tag.Add)

// Edit Tag
router.put('/edittag',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Tag.Edit)

//Delete sub Tag
router.post('/deletetag',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Tag.Delete)

// 2: Add Sub Category
router.post('/subcategory',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.SubCategory.Add)

//edit sub category
router.put('/editsubcategory',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.SubCategory.Edit)

//Delete sub category
router.post('/deletesubcategory',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.SubCategory.Delete)


// 3: Add Units
router.post('/unit',
    RequestMethodsMiddlewares.ApplicationJsonData,
    ValidateBody(BodySchemas.Unit),
    AdminController.Units.Add)

// Edit Unit
router.put('/unit',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Units.Edit)

// Delete Unit
router.post('/deleteunit',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Units.Delete)

// Genrate Discount coupon
router.post('/genrate-discount-coupan',
    RequestMethodsMiddlewares.ApplicationJsonData,
    ValidateBody(BodySchemas.Discount),
    AdminController.Discount.Add)

// Edit Unit
router.put('/genrate-discount-coupan',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Discount.Edit)

// Delete Unit
router.post('/delete-genrate-discount-coupan',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Discount.Delete)

router.post('/tax',
    RequestMethodsMiddlewares.ApplicationJsonData,
    ValidateBody(BodySchemas.Tax),
    AdminController.Tax.Add)


// Edit Tax
router.put('/edittax',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Tax.Edit)

// Delete Tax
router.post('/deletetax',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Tax.Delete)

// 1: Get Categories
// router.get('/getcategories', AdminController.Categories.GetCategories)

router.get('/getusers',
    RequestMethodsMiddlewares.ApplicationJsonData,
    AdminController.Users.GetUsers)

// Get Taxes
router.get('/gettaxes',
    AdminController.Tax.GetAll)

// Get Orders
router.get('/getorders',
    AdminController.Orders.GetAll)

router.get('/getrecpies',
    AdminController.Recipe.GetAll)

router.get('/getuserdetails/:profileId',
    ValidateParams(ParamSchemas.idSchema, 'profileId'),
    AdminController.Users.GetUserDetails)

router.put('/recipe/:id',
    RequestMethodsMiddlewares.ApplicationFormData,
    FileUploader.uploadDataFiles,
    ValidateParams(ParamSchemas.idSchema, 'id'),
    AdminController.Recipe.Edit)

router.put('/recipe-image/:id',
    RequestMethodsMiddlewares.ApplicationFormData,
    ValidateParams(ParamSchemas.idSchema, 'id'),
    FileUploader.uploadDataFiles,
    AdminController.Recipe.RecipeUpdateImage)

router.delete('/recipe/:id',
    ValidateParams(ParamSchemas.idSchema, 'id'),
    AdminController.Recipe.DeleteRecipe)

router.get('/getrecpiedetails/:id',
    ValidateParams(ParamSchemas.idSchema, 'id'),
    AdminController.Recipe.GetRecipeById)

router.put('/confirmchef/:id',
    RequestMethodsMiddlewares.ApplicationJsonData,
    ValidateParams(ParamSchemas.idSchema, 'id'),
    AdminController.Users.Confirm)

router.get('/getallchef',
    AdminController.Users.GetAllChef)

router.put('/confirmrecipie/:id',
    ValidateParams(ParamSchemas.idSchema, 'id'),
    AdminController.Recipe.ConfirmRecipie
)

router.get('/getorderdetails/:orderId',
    ValidateParams(ParamSchemas.idSchema, 'orderId'),
    AdminController.Orders.GetOrderDetailsByOrderId)

router.delete('/user/:id',
    ValidateParams(ParamSchemas.idSchema, 'id'),
    AdminController.Users.DeleteUser)


module.exports = router