import setting from './settings';

export default (() => {
  return {

    // Basic Auth
    'AUTH': setting.api.AUTH,

    // Auth
    login: `${setting.api.url}login`,
    forgotPassword: `${setting.api.url}forgot-password`,
    resetPassword: `${setting.api.url}resetPassword`,
    changePassword: `${setting.api.url}auth/changepassword`,

    // user
    userProfile: `${setting.api.url}auth/profile`,
    viewuserProfile: `${setting.api.url}auth/profile`,
    changeProfileImage: `${setting.api.url}auth/profile-image`,
    
    // Customer
    customers: `${setting.api.url}admin/getusers`,


    // Category
    category: `${setting.api.url}admin/category`,
    editCategory: `${setting.api.url}admin/editcategory`,
    // Categories
    categories: `${setting.api.url}common/category`,
    deletecategories: `${setting.api.url}admin/deletecategory`,
    //Chef
    chefDetails: `${setting.api.url}admin/getallchef`
  }
})()