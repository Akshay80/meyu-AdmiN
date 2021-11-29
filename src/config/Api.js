import setting from './settings';

export default (() => {
  return {

    // Basic Auth
    'AUTH': setting.api.AUTH,

    // Auth
    login: `${setting.api.url}login`,
    forgotPassword: `${setting.api.url}forgot-password`,
    resetPassword: `${setting.api.url}resetPassword`,

    // user
    userProfile: `${setting.api.url}auth/profile`,
  }
})()