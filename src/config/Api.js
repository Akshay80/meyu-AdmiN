import setting from "./settings";

export default (() => {
  return {
    // Basic Auth
    AUTH: setting.api.AUTH,

    // Auth
    login: `${setting.api.url}authenticateadmin`,
    logout: `${setting.api.url}auth/logout`,
    signup: `${setting.api.url}signup`,
    forgotPassword: `${setting.api.url}forgot-password`,
    resetPassword: `${setting.api.url}resetPassword`,
    changePassword: `${setting.api.url}auth/changepassword`,

    // user
    userProfile: `${setting.api.url}auth/profile`,
    viewuserProfile: `${setting.api.url}auth/profile`,
    changeProfileImage: `${setting.api.url}auth/profile-image`,

    // Customer
    customers: `${setting.api.url}admin/getusers`,
    getcustomerDetails: `${setting.api.url}admin/getuserdetails`,
    deletecustomers: `${setting.api.url}admin/user`,
    discontinueCustomer: `${setting.api.url}admin/confirmuser`,

    // Category
    category: `${setting.api.url}admin/category`,
    editCategory: `${setting.api.url}admin/editcategory`,
    categories: `${setting.api.url}common/category`,
    deletecategories: `${setting.api.url}admin/deletecategory`,
    catergoryById: `${setting.api.url}auth/category`,

    //Chef
    chefDetails: `${setting.api.url}admin/getallchef`,
    getchefDetails: `${setting.api.url}common/chef-profile`,
    confirmChef: `${setting.api.url}admin/confirmchef`,
    deleteChef: `${setting.api.url}admin/user`,

    // tags
    getAllTags: `${setting.api.url}common/tag`,
    addTag: `${setting.api.url}admin/tag`,
    editTag: `${setting.api.url}admin/edittag`,
    deleteTag: `${setting.api.url}admin/deletetag`,
    getTagId: `${setting.api.url}auth/tag`,

    // All Items
    allItemsList: `${setting.api.url}admin/getrecpies`,
    allItembyId: `${setting.api.url}admin/getrecpiedetails`,
    confirmItem: `${setting.api.url}admin/confirmrecipie`,
    deleteItem: `${setting.api.url}admin/recipe`,
    updateRecipe: `${setting.api.url}admin/recipe`,
    updateRecipeImage: `${setting.api.url}chef/recipe-image`,
    deleteRecipeImage: `${setting.api.url}admin/delete-image`,

    //Tax
    addTax: `${setting.api.url}admin/tax`,
    editTax: `${setting.api.url}admin/edittax`,
    getTax: `${setting.api.url}admin/gettaxes`,
    deleteTax: `${setting.api.url}admin/deletetax`,

    //Discount
    getAllCoupans: `${setting.api.url}common/genrate-discount-coupan`,
    addCoupans: `${setting.api.url}admin/genrate-discount-coupan`,
    editCoupans: `${setting.api.url}admin/genrate-discount-coupan`,
    deleteCoupans: `${setting.api.url}admin/delete-genrate-discount-coupan`,
    getCoupansByID: `${setting.api.url}common/genrate-discount-coupan`,

    //Orders
    getAllOrders: `${setting.api.url}admin/getorders`,
    getOrdersByID: `${setting.api.url}admin/getorderdetails`,

    // Dashboard
    dashboardService: `${setting.api.url}admin/dashboard`
  };
})();
