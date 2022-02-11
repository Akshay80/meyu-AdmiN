const AdminService = require('../services/admin.service')
const CommonConfig = require('../../../configurations/helpers/common-config')
const CommonService = require('../services/common.service')
const { ResponseHelpers } = require('../../../configurations/helpers/helper')

let Category = {
    Add: async(req, res, next) => {
        try {
            if (!req.files || !req.files.category) {
                return ResponseHelpers.SetBadRequestResponse('Invalid category name/file', res)
            }
            let categoryName = {
                name: req.body.name
            }
            let result = await AdminService.Category.Add(req.user.id, categoryName, req.files)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to add category', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            next(error)
        }
    },
    Edit: async(req, res, next) => {
        try {

            let result;
            if (!req.files || !req.files.category) {
                let category = {
                    name: req.body.name,
                    id: req.body.id
                }
                result = await AdminService.Category.EditName(req.user.id, category)
            } else {
                let category = {
                    name: req.body.name,
                    id: req.body.id
                }
                result = await AdminService.Category.Edit(req.user.id, category, req.files)
            }

            // , req.files

            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to edit category', res)
            }
            if (result.IsSuccess)
                return ResponseHelpers.SetSuccessResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
            else
                return ResponseHelpers.SetErrorResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    Delete: async(req, res, next) => {
        try {
            const id = req.body.id
            if (!req.body.id) {
                return ResponseHelpers.SetBadRequestResponse('Invalid category id.', res)
            }
            let categoryId = id
            let result = await AdminService.Category.Delete(categoryId)

            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to delete category.', res)
            }
            return ResponseHelpers.SetSuccessResponse('Category deleted successfully.', res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            return next(error)
        }
    },
    UpdateImage: async(req, res, next) => {
        try {
            if (!req.files || !req.files.category) {
                return ResponseHelpers.SetBadRequestResponse('Invalid category name/file', res)
            }
            let category = {
                id: req.body.id
            }

            let result = await AdminService.Category.EditImage(category, req.files)

            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to edit category image', res)
            }
            if (result.IsSuccess)
                return ResponseHelpers.SetSuccessResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
            else
                return ResponseHelpers.SetErrorResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    DeleteImage: async(req, res, next) => {
        try {
            const id = req.body.id
            if (!req.body.id) {
                return ResponseHelpers.SetBadRequestResponse('Invalid category id.', res)
            }
            let categoryId = id
            let result = await AdminService.Category.DeleteImage(categoryId)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to delete category image.', res)
            }
            return ResponseHelpers.SetSuccessResponse('Category image deleted successfully.', res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            return next(error)
        }
    }
}
let Tag = {
    Add: async(req, res, next) => {
        try {
            if (!req.body.name) {
                return ResponseHelpers.SetBadRequestResponse('Invalid tag name.', res)
            }
            let tag = req.body
            let result = await AdminService.Tag.Add(tag)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to add tag.', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            return next(error)
        }
    },
    Edit: async(req, res, next) => {
        try {
            let tag = {
                name: req.body.name,
                id: req.body.id
            }
            let result = await AdminService.Tag.Edit(tag)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to edit tag', res)
            }
            if (result.IsSuccess)
                return ResponseHelpers.SetSuccessResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
            else
                return ResponseHelpers.SetErrorResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    Delete: async(req, res, next) => {
        try {
            const tagId = req.body.id
            const result = AdminService.Tag.Delete(tagId)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to delete tag', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            next(error)
        }
    }
}
let SubCategory = {
    Add: async(req, res, next) => {
        try {
            if (!req.body.name) {
                return ResponseHelpers.SetBadRequestResponse('Invalid sub-category name.', res)
            }
            let subCategory = req.body
            subCategory.createdBy = req.user.id
            let result = await AdminService.SubCategory.Add(subCategory)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to add sub-category.', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            return next(error)
        }
    },
    Edit: async(req, res, next) => {
        try {
            let subCategory = {
                name: req.body.name,
                id: req.body.id
            }
            let result = await AdminService.SubCategory.Edit(subCategory)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to edit sub category', res)
            }
            if (result.IsSuccess)
                return ResponseHelpers.SetSuccessResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
            else
                return ResponseHelpers.SetErrorResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    Delete: async(req, res, next) => {
        try {
            const subCategoryId = req.body.id
            const result = AdminService.SubCategory.Delete(subCategoryId)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to delete sub category', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            next(error)
        }
    }
}



let Units = {
    Add: async(req, res, next) => {
        try {
            if (!req.body.unitName) {
                return ResponseHelpers.SetBadRequestResponse('Invalid unit/sort name.', res)
            }
            let unit = req.body
            unit.createdBy = req.user.id
            let result = await AdminService.Units.Add(unit)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to add unit.', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            return next(error)
        }
    },
    Edit: async(req, res, next) => {
        try {
            const unit = {
                unitName: req.body.unitName,
                sortName: req.body.sortName,
                id: req.body.id
            }
            const result = await AdminService.Units.Edit(unit)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('unable to edit unit', res)
            }
            if (result.IsSuccess)
                return ResponseHelpers.SetSuccessResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
            else
                return ResponseHelpers.SetErrorResponse(result.Message, res, CommonConfig.STATUS_CODE.error)
        } catch (error) {
            next(error)
        }
    },
    Delete: async(req, res, next) => {
        try {
            const unitId = req.body.id
            const result = await AdminService.Units.Delete(unitId)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('unable to delete unit', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            next(error)
        }
    }
}

let Tax = {
    Add: async(req, res, next) => {
        try {
            const { taxName, taxValue } = req.body
            const { id } = req.user
            let result = await AdminService.Tax.Add({
                taxName: taxName,
                taxValue: taxValue,
                createdBy: id
            })
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to add tax.', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            return next(error)
        }
    },
    GetAll: async(req, res, next) => {
        try {
            let result = await AdminService.Tax.GetAll()
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to get tax.', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            return next(error)
        }
    },
    Edit: async(req, res, next) => {
        try {
            const tax = {
                taxName: req.body.taxName,
                taxValue: req.body.taxValue,
                id: req.body.id
            }
            const result = await AdminService.Tax.Edit(tax)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('unable to edit tax', res)
            }
            if (result.IsSuccess)
                return ResponseHelpers.SetSuccessResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
            else
                return ResponseHelpers.SetErrorResponse(result.Message, res, CommonConfig.STATUS_CODE.error)
                    // return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    Delete: async(req, res, next) => {
        try {
            const taxId = req.body.id
            const result = AdminService.Tax.Delete(taxId)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('unable to delete tax', res)
            }
            return ResponseHelpers.SetSuccessResponse('Tax deleted successfully.', res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {

        }
    }
}

let Users = {
    GetUsers: async(req, res, next) => {
        try {
            let result = await AdminService.Users.GetUsers()
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to get users.', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }

    },
    GetUserDetails: async(req, res, next) => {
        console.log('profileId');
        try {
            // const id = req.body.userId
            const { profileId } = req.params

            // let datePart = date.split('-')
            // const selctedDate = datePart[0] + ' ' + datePart[1] + ', ' + datePart[2]
            let userData = await AdminService.Users.GetSingle(profileId)
            if (!userData) {
                return ResponseHelpers.SetErrorResponse('Unable to get user details.', res)
            }
            // userData.drivingDistance = userData.drivingDistance+ userData.countryCode === '+1' ? 'miles' : 'km'

            const nik = {
                fullName: userData.fullName,
                genderFull: userData.genderFull,
                id: userData.id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                gender: userData.gender,
                description: userData.description,
                dietPreference: userData.dietPreference,
                allergies: userData.allergies,
                drivingDistance: userData.drivingDistance,
                profileUrl: userData.profileUrl,
                coverPhotoUrl: userData.coverPhotoUrl,
                isEligibleForHire: userData.isEligibleForHire,
                isFacebookConnected: userData.isFacebookConnected,
                isVerified: userData.isVerified,
                verificationDate: userData.verificationDate,
                isRejected: userData.isRejected,
                rejectedDate: userData.rejectedDate,
                countryCode: userData.countryCode,
                Address: userData.Address,
                IdentificationCard: userData.IdentificationCard,
                Certificate: userData.Certificate,
                unit: userData.countryCode === '+1' ? 'mile' : 'km',
                status: userData.status
            }

            // let UserDetails = {userData:userData, unit : }

            console.log('nik', userData.status)
            return ResponseHelpers.SetSuccessResponse(nik, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    Confirm: async(req, res, next) => {
        try {
            const { isVerified } = req.body
            const { id } = req.params
            let messgae
            let result
            switch (isVerified) {
                case "true":
                    result = await AdminService.Users.VerifyUserProfile({ isVerified: true, status: 'APPROVED' }, id)
                    messgae = 'User profile verified successfully.'
                    break
                case "false":
                    result = await AdminService.Users.RejectUserProfile({ isRejected: true, isVerified: false, status: 'REJECTED' }, id)
                    messgae = 'User profile rejected successfully.'
                    break
            }
            if (!result) {
                return ResponseHelpers.SetSuccessErrorResponse('Unable to process the request.', res, CommonConfig.STATUS_CODE.INTERNAL_SERVER_ERROR)
            }
            return ResponseHelpers.SetSuccessResponse({ message: messgae }, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            return next(error)
        }
    },
    GetAllChef: async(req, res, next) => {
        try {
            let result = await AdminService.Users.GetAllChef()
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to get cooks.', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    DeleteUser: async(req, res, next) => {
        try {
            const { id } = req.user
            const userId = req.value.params.id
            const result = await AdminService.Users.DeleteById(userId)
            if (!result) {
                return ResponseHelpers.SetSuccessErrorResponse({ message: 'user not found.' }, res, CommonConfig.STATUS_CODE.OK)
            }
            return ResponseHelpers.SetSuccessResponse({ message: 'user remove successfully.' }, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    }

}

let Orders = {
    GetAll: async(req, res, next) => {
        try {
            let result = await AdminService.Orders.GetOrders()
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to get orders.', res)
            }
            let orders = JSON.parse(JSON.stringify(result))
            for (let index in orders) {
                if (orders.hasOwnProperty(index)) {
                    let cookName = await CommonService.User.GetCookProfileDetailsById(orders[index].cookId)
                        // if (!cookName) {
                    orders[index].cookName = cookName.fullName
                        // }

                    let customerName = await CommonService.User.GetProfileIdByUserTypeId(orders[index].createdBy)
                        // if (!customerName) {
                    orders[index].customerName = customerName.fullName
                        // }
                }
            }
            return ResponseHelpers.SetSuccessResponse(orders, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            return next(error)
        }
    },
    GetOrderDetailsByOrderId: async(req, res, next) => {
        try {
            const { id } = req.user
            const { orderId } = req.params
            let orderDetails = await AdminService.Orders.GetOrderById(orderId)

            return ResponseHelpers.SetSuccessResponse(orderDetails, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    }
}

let Recipe = {
    GetAll: async(req, res, next) => {
        try {
            let result = await AdminService.Recipe.GetAll()
            let recipeDetailsToJSON = JSON.parse(JSON.stringify(result))
            for (const index in recipeDetailsToJSON) {
                const tags = []
                if (recipeDetailsToJSON.hasOwnProperty(index)) {
                    let tagData = JSON.parse(recipeDetailsToJSON[index].tags)
                    for (var i = 0; i < tagData.length; i++) {
                        tags.push({
                            [i]: tagData[i]
                        })
                    }
                    recipeDetailsToJSON[index].tags = tags
                }
            }
            if (!recipeDetailsToJSON) {
                return ResponseHelpers.SetErrorResponse('Unable to get recipies.', res)
            }
            return ResponseHelpers.SetSuccessResponse(recipeDetailsToJSON, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            return next(error)
        }
    },
    GetRecipeById: async(req, res, next) => {
        try {
            const recipeId = req.value.params.id
            const recipeDetails = await AdminService.Recipe.FindRecipeById(recipeId)
            if (!recipeDetails) {
                return ResponseHelpers.SetSuccessErrorResponse({ messgae: 'Recipe not found.' }, res, CommonConfig.STATUS_CODE.OK)
            }
            let recipeDetailsToJSON = JSON.parse(JSON.stringify(recipeDetails.Recipes[0]))
            const tags = []
            let tagData = JSON.parse(recipeDetailsToJSON.tags)
            for (var i = 0; i < tagData.length; i++) {
                tags.push({
                    [i]: tagData[i]
                })
            }
            recipeDetailsToJSON.tags = tags

            // const preprationMethod = await AdminService.Recipe.FindPreprationMethodByRecipeId(recipeId)
            const rating = JSON.parse(JSON.stringify(await CommonService.Recipe.FindRatingByRecipeId(recipeId)))
            recipeDetailsToJSON.rating = !rating[0].rating ? 0 : rating[0].rating
            const profileId = recipeDetailsToJSON.profileId
            const profileDetails = await CommonService.User.GetCookProfileDetailsById(profileId)
            const cookRecipes = await CommonService.Recipe.FindAllRecipeByCookIdExcludeSelectedRecipe(profileId, recipeId)
            let cookRecipesToJSON = JSON.parse(JSON.stringify(cookRecipes))
                // recipeDetailsToJSON.PreparationMethods = preprationMethod
            const result = {
                recipeDetails: recipeDetailsToJSON,
                cartItemDetails: null,
                profile: profileDetails,
                chefRecipes: cookRecipesToJSON
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    ConfirmRecipie: async(req, res, next) => {
        try {
            const { isVerified } = req.body
            const { id } = req.params
            let result = await AdminService.Recipe.VerifyRecipie({ isVerified: isVerified }, id)
            if (!result) {
                return ResponseHelpers.SetSuccessErrorResponse('Unable to process the request.', res, CommonConfig.STATUS_CODE.INTERNAL_SERVER_ERROR)
            }
            return ResponseHelpers.SetSuccessResponse({ message: result }, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    DeleteRecipe: async(req, res, next) => {
        try {
            const { id } = req.user
            const recipeId = req.value.params.id
            const result = await AdminService.Recipe.DeleteById(recipeId)
            if (!result) {
                return ResponseHelpers.SetSuccessErrorResponse({ message: 'Recipe not found.' }, res, CommonConfig.STATUS_CODE.OK)
            }
            return ResponseHelpers.SetSuccessResponse({ message: 'Recipe remove successfully.' }, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    Edit: async(req, res, next) => {
        try {
            const { id } = req.user
            const recipeId = req.value.params.id
            const recipeDetails = await AdminService.Recipe.FindRecipeById(recipeId)
            if (!recipeDetails) {
                return ResponseHelpers.SetSuccessErrorResponse({ messgae: 'Recipe not found.' }, res, CommonConfig.STATUS_CODE.OK)
            }
            const { currencySymbol } = await CommonService.User.GetCurrencySymbolByProfileId(recipeDetails.id)
            let recipeData = await AdminService.Recipe.Edit(req.body, recipeId, currencySymbol)
            if (!recipeData) {
                return next({
                    message: CommonConfig.ERRORS.CREATION,
                    status: CommonConfig.STATUS_CODE.BAD_REQUEST
                }, false)
            }
            return ResponseHelpers.SetSuccessResponse({ message: 'Your recipe updated successfully.' }, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            next(error)
        }
    },
    RecipeUpdateImage: async(req, res, next) => {
        try {
            // const baseUrl = req.protocol + '://' + req.get('host') + '/'
            const userId = req.user.id
            const mediaObjectId = req.value.params.id
            const { files } = req
            if (!files) {
                return ResponseHelpers.SetSuccessResponse({ message: 'Please select a valid recipe image.' }, res, CommonConfig.STATUS_CODE.CREATED)
            } else if (!files.recipe) {
                return ResponseHelpers.SetSuccessResponse({ message: 'Please select a valid recipe image.' }, res, CommonConfig.STATUS_CODE.CREATED)
            }
            // const profile = await CommonService.User.GetProfileIdByUserTypeId(userId)
            // const profileId = profile.id
            const recipeImage = await CommonService.User.CheckRecipeImageUploaded(mediaObjectId)
            if (!recipeImage) {
                return ResponseHelpers.SetSuccessResponse({ message: 'recipe image not uploaded.' }, res, CommonConfig.STATUS_CODE.OK)
            } else {
                let recipeImageFile = files.recipe[0]
                recipeImageFile.fileName = recipeImageFile.filename
                recipeImageFile.originalName = recipeImageFile.originalname
                recipeImageFile.mimeType = recipeImageFile.mimetype
                recipeImageFile.imageUrl = CommonConfig.FILE_LOCATIONS.RECIPE + recipeImageFile.filename,
                    delete recipeImageFile.filename
                delete recipeImageFile.originalname
                delete recipeImageFile.mimetype
                const result = await CommonService.User.UpdateRecipeImage(recipeImageFile, mediaObjectId, recipeImage)
                if (!result) {
                    return ResponseHelpers.SetSuccessResponse({ message: 'recipe image not updated.' }, res, CommonConfig.STATUS_CODE.OK)
                }
                return ResponseHelpers.SetSuccessResponse({
                    message: `recipe image updated.`,
                    profileUrl: result
                }, res, CommonConfig.STATUS_CODE.OK)
            }
        } catch (error) {
            next(error)
        }
    },

}
let Discount = {
    Add: async(req, res, next) => {
        try {
            if (!req.body.discountValue) {
                return ResponseHelpers.SetBadRequestResponse('Invalid Discount value.', res)
            }
            const discountCoupon = await CommonService.Discount.FindDiscountByValue(req.body.discountValue)

            if (discountCoupon != null) {
                return ResponseHelpers.SetSuccessErrorResponse({ messgae: 'Coupon Already Exist this Ammount.' }, res, CommonConfig.STATUS_CODE.OK)
            }
            var discountCode = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 8; i++) {
                discountCode += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            let discountCoupan = req.body
            discountCoupan.couponCode = discountCode
            discountCoupan.createdBy = req.user.id
            let result = await AdminService.Discount.Add(discountCoupan)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Unable to add unit.', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            return next(error)
        }
    },
    Edit: async(req, res, next) => {
        try {
            const discountCoupan = {
                discountValue: req.body.discountValue,
                id: req.body.id
            }
            const discountCoupon = await CommonService.Discount.FindDiscountByValue(req.body.discountValue)

            if (discountCoupon != null) {
                return ResponseHelpers.SetSuccessErrorResponse({ messgae: 'Coupon Already Exist this Ammount.' }, res, CommonConfig.STATUS_CODE.OK)
            }
            var discountCode = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 8; i++) {
                discountCode += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            discountCoupan.couponCode = discountCode
            const result = await AdminService.Discount.Edit(discountCoupan)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('unable to edit discount Coupan', res)
            }
            if (result.IsSuccess)
                return ResponseHelpers.SetSuccessResponse(result.Message, res, CommonConfig.STATUS_CODE.OK)
            else
                return ResponseHelpers.SetErrorResponse(result.Message, res, CommonConfig.STATUS_CODE.error)
        } catch (error) {
            next(error)
        }
    },
    Delete: async(req, res, next) => {
        try {
            const discountId = req.body.id
            const result = await AdminService.Discount.Delete(discountId)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('unable to delete Discount', res)
            }
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            next(error)
        }
    }
}

let AdminController = {
    Category: Category,
    Tag: Tag,
    SubCategory: SubCategory,
    Units: Units,
    Tax: Tax,
    Discount: Discount,
    Users: Users,
    Orders: Orders,
    Recipe: Recipe
}

module.exports = AdminController