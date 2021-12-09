import setting from './settings';

export default (() => {
  return {

    // Basic Auth
    'AUTH': setting.api.AUTH,

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


    // Category
    category: `${setting.api.url}admin/category`,
    editCategory: `${setting.api.url}admin/editcategory`,
    // Categories
    categories: `${setting.api.url}common/category`,
    deletecategories: `${setting.api.url}admin/deletecategory`,

    //Chef  
    chefDetails: `${setting.api.url}admin/getallchef`,
    getchefDetails: `${setting.api.url}admin/getuserdetails/:id`,
    confirmChef: `${setting.api.url}admin/confirmchef/:id`,
  }
})()