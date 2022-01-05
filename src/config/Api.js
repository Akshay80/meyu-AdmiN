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

    // Category
    category: `${setting.api.url}admin/category`,
    editCategory: `${setting.api.url}admin/editcategory`,
    categories: `${setting.api.url}common/category`,
    deletecategories: `${setting.api.url}admin/deletecategory`,
    catergoryById: `${setting.api.url}auth/category`,

    //Chef
    chefDetails: `${setting.api.url}admin/getallchef`,
    getchefDetails: `${setting.api.url}common/chef-profile`,
    confirmChef: `${setting.api.url}admin/confirmchef/:id`,

    // tags
    getAllTags: `${setting.api.url}common/tag`,
    addTag: `${setting.api.url}admin/tag`,
    editTag: `${setting.api.url}admin/edittag`,
    deleteTag: `${setting.api.url}admin/deletetag`,
    getTagId: `${setting.api.url}auth/tag`,

    // Unit
    postUnit: `${setting.api.url}admin/unit`,
    putUnit: `${setting.api.url}admin/unit`,
    deleteUnit: `${setting.api.url}admin/deleteunit`,
    allUnit: `${setting.api.url}common/unit`,
    singleUnit: `${setting.api.url}auth/unit`,

    // All Items
    allItemsList: `${setting.api.url}admin/getrecpies`,
    allItembyId: `${setting.api.url}admin/getrecpiedetails`,
    confirmItem: `${setting.api.url}admin/confirmrecipie`,
  };
})();
