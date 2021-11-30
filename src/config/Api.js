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
    
    // Customer
    customers: `${setting.api.url}admin/getusers`
  }
})()