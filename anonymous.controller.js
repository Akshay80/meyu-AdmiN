const AnonymousService = require('../services/anonymous.service')
const CommonService = require('../services/common.service')
const CommonConfig = require('../../../configurations/helpers/common-config')
const { ResponseHelpers, AuthenticationHelpers } = require('../../../configurations/helpers/helper')
const fetch = require('node-fetch')
const { OAuth2Client } = require('google-auth-library')
const { cli } = require('winston/lib/winston/config')
const Config = require('../../../configurations/main')
const client = new OAuth2Client(Config.Google.Oauth2client.key)
let Anonymous = {
    FbCheck: async(req, res, next) => {
        try {
            const { facebookId, facebookEmailId } = req.body
            const fbData = await CommonService.User.CheckFacebookAlreadyLinked(facebookId, facebookEmailId)
            const msg = fbData ? 'Facebook account already linked with other account.' : null
            return ResponseHelpers.SetSuccessResponse({
                facebookExists: !!fbData,
                message: msg
            }, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    FbSignIn: async(req, res, next) => {
        try {

            const { phone, facebookId, accessToken, userRole, otp } = req.body
            let urlGraphFacebbok = `https://graph.facebook.com/v12.0/${facebookId}/?fields=id,name,first_name,last_name,email,picture&access_token=${accessToken}`
            const response = await fetch(urlGraphFacebbok);
            const fbData = await response.json();
            let userId
            if (fbData.error) {
                return ResponseHelpers.SetErrorResponse('Unable to login with facebook.', res)
            }
            const isFacebookUserExists = await CommonService.User.CheckUserRegisteredWithFacebookId(facebookId, fbData.email)
            if (!isFacebookUserExists) {
                const otpVerify = await CommonService.User.OtpVerifyByPhoneNumber(phone, otp)
                if (!otpVerify) {
                    return ResponseHelpers.SetSuccessErrorResponse({ message: 'Invalid Otp.' }, res, CommonConfig.STATUS_CODE.CREATED)
                }
                const facebookDetails = {
                    phone: phone,
                    facebookId: facebookId,
                    firstName: fbData.first_name,
                    lastName: fbData.last_name,
                    email: fbData.email,
                    imageUrl: fbData.picture.data.url,
                    userRole: userRole
                        // verified: verified
                }
                const facebookUser = await AnonymousService.AddFacebookUser(facebookDetails)
                if (!facebookUser) {
                    return ResponseHelpers.SetErrorResponse('Unable to login with facebook.', res)
                }
                userId = facebookUser.id

            } else {
                userId = isFacebookUserExists.id
            }
            // const userProfileSelected = await CommonService.User.CheckUserProfileUpdatedByFacebookId(facebookId, fbData.email)
            // if (!userProfileSelected) {
            //     return ResponseHelpers.SetSuccessResponse({ isValidLogin: false, facebookId: facebookId, message: 'Profile is not selected. Please select profile.' }, res, CommonConfig.STATUS_CODE.OK)
            // }
            let userDetails = await CommonService.GetUserDetailsByUserTypeId(userId)
            let userData = {
                id: userDetails.id,
                email: userDetails.emailId || userDetails.facebookEmailId,
                fullName: `${userDetails.Profile.firstName}` + `${' '}` + `${userDetails.Profile.lastName}`,
                userRole: userDetails.userRole,
                profileUrl: userDetails.Profile.profileUrl,
                hasProfile: userDetails.hasProfile,
                profileSelected: userDetails.profileSelected,
                currencySymbol: userDetails.currencySymbol || null
            }
            let result = await CommonService.GenerateToken(userDetails.userInfo, userData)
            result.isValidLogin = true
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    GoogleSignIn: async(req, res, next) => {
        try {

            const { tokenId, phone, userRole, otp } = req.body
            const ticket = await client.verifyIdToken({ idToken: tokenId })
            const payload = ticket.getPayload();
            let userId
            if (payload && payload.email_verified == true) {

                const isGoogleUserExists = await CommonService.User.CheckUserRegisteredWithGoogleId(payload.sub, payload.email)
                const googleId = payload.sub
                if (!isGoogleUserExists) {
                    const otpVerify = await CommonService.User.OtpVerifyByPhoneNumber(phone, otp)
                    if (!otpVerify) {
                        return ResponseHelpers.SetSuccessErrorResponse({ message: 'Invalid Otp.' }, res, CommonConfig.STATUS_CODE.CREATED)
                    }
                    const googleDetails = {
                        phone: phone,
                        googleId: googleId,
                        firstName: payload.given_name,
                        lastName: payload.family_name,
                        email: payload.email,
                        imageUrl: payload.picture,
                        userRole: userRole
                            // verified: verified
                    }
                    const googleUser = await AnonymousService.AddGoogleUser(googleDetails)
                    if (!googleUser) {
                        return ResponseHelpers.SetErrorResponse('Unable to login with Google.', res)
                    }
                    userId = googleUser.id
                        // return ResponseHelpers.SetSuccessResponse({ isValidLogin: false, facebookId: facebookId, message: 'Profile is not selected1. Please select profile.' }, res, CommonConfig.STATUS_CODE.OK)
                } else {
                    userId = isGoogleUserExists.id
                }
                // const userProfileSelected = await CommonService.User.CheckUserProfileUpdatedByGoogleId(googleId, payload.email)
                // if (!userProfileSelected) {
                //     return ResponseHelpers.SetSuccessResponse({ isValidLogin: false, googleId: googleId, message: 'Profile is not selected. Please select profile.' }, res, CommonConfig.STATUS_CODE.OK)
                // }
                let userDetails = await CommonService.GetUserDetailsByUserTypeId(userId)
                let userData = {
                    id: userDetails.id,
                    email: userDetails.emailId || userDetails.googleEmailId,
                    fullName: `${userDetails.Profile.firstName}` + `${' '}` + `${userDetails.Profile.lastName}`,
                    userRole: userDetails.userRole,
                    profileUrl: userDetails.Profile.profileUrl,
                    hasProfile: userDetails.hasProfile,
                    profileSelected: userDetails.profileSelected,
                    currencySymbol: userDetails.currencySymbol || null
                }
                let result = await CommonService.GenerateToken(userDetails.userInfo, userData)
                result.isValidLogin = true
                return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
            } else {
                return ResponseHelpers.SetErrorResponse('Unable to login with Google.', res)
            }
        } catch (error) {
            next(error)
        }
    },
    SignUp: async(req, res, next) => {
        try {
            const registrationData = req.body
            if (!registrationData || !registrationData.user || !registrationData.address) {
                return ResponseHelpers.SetSuccessErrorResponse('Invalid request.', res, CommonConfig.STATUS_CODE.CREATED)
            }
            const checkUserEmailExist = await CommonService.User.CheckUserEmailIdExist(registrationData.user.email)
            if (checkUserEmailExist) {
                return ResponseHelpers.SetSuccessErrorResponse({ message: 'Email Id already registered.' }, res, CommonConfig.STATUS_CODE.CREATED)
            }
            if (registrationData.user.userRole === 4) {
                let result = await AnonymousService.SignUpAdmin(registrationData, req.files)
                if (!result) {
                    return ResponseHelpers.SetSuccessErrorResponse('Unable to register user.', res, CommonConfig.STATUS_CODE.OK)
                }
                return ResponseHelpers.SetSuccessResponse({ message: 'User Created successfully! wait for admin aprovel.' }, res, CommonConfig.STATUS_CODE.CREATED)
            }
            const otpVerify = await CommonService.User.OtpVerifyByPhoneNumber(registrationData.user.phone, registrationData.user.otp)
            if (!otpVerify) {
                return ResponseHelpers.SetSuccessErrorResponse({ message: 'Invalid Otp.' }, res, CommonConfig.STATUS_CODE.CREATED)
            }

            const checkFacebook = await CommonService.User.CheckUserHasProfileByFacebookId(registrationData.user.email)
            if (checkFacebook) {
                return ResponseHelpers.SetSuccessErrorResponse({ message: 'Facebook already linked to account.' }, res, CommonConfig.STATUS_CODE.CREATED)
            }
            const checkGoogle = await CommonService.User.CheckUserHasProfileByGoogleId(registrationData.user.email)
            if (checkGoogle) {
                return ResponseHelpers.SetSuccessErrorResponse({ message: 'Google already linked to account.' }, res, CommonConfig.STATUS_CODE.CREATED)
            }
            // if (registrationData.user.userRole === 1) {
            //     if (registrationData.user.description.trim() === '') {
            //         return ResponseHelpers.SetSuccessErrorResponse({ message: 'Description can not be empty.' }, res, CommonConfig.STATUS_CODE.BAD_REQUEST)
            //     }
            // }

            let result = await AnonymousService.SignUp(registrationData, req.files)
            if (!result) {
                return ResponseHelpers.SetSuccessErrorResponse('Unable to register user.', res, CommonConfig.STATUS_CODE.OK)
            }
            result.type = true
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.CREATED)
        } catch (error) {
            next(error)
        }
    },
    CheckUserEmailAndPassword: async(req, res, next) => {
        try {
            const { username, password } = req.body
            const userExist = await CommonService.User.CheckUserEmailIdExist(username)
            if (!userExist) {
                return ResponseHelpers.SetSuccessResponse({
                    flag: 0,
                    message: 'Email not exist in our database.'
                }, res, CommonConfig.STATUS_CODE.OK)
            }
            const checkUserHasLogin = await CommonService.User.CheckUserHasLogin(userExist.id)
            if (!checkUserHasLogin) {
                return ResponseHelpers.SetSuccessResponse({
                    flag: 1,
                    message: 'Email already registered, Please reset your password'
                }, res, CommonConfig.STATUS_CODE.OK)
            }
            const checkUserLogin = await CommonService.User.ValidateUserCredentials(userExist.id, password)
            if (!checkUserLogin) {
                return ResponseHelpers.SetSuccessResponse({
                    flag: 1,
                    message: 'Email already registered, Please reset your password'
                }, res, CommonConfig.STATUS_CODE.OK)
            }

            // generate token and redirect to dashboard
            const userDetails = {
                userId: userExist.id,
                createdBy: userExist.id,
                tokenId: false,
                tokenStatus: false
            }
            const result = await AnonymousService.Authenticate(userDetails)
            if (!result) {
                return ResponseHelpers.SetNotFoundResponse('Missing email and/or password.', res)
            }
            result.type = false
            result.flag = 2
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    AuthenticateUser: async(req, res, next) => {
        try {
            if (req.user.token && !req.tokenStatus) {
                const result = await CommonService.InvalidateResetPasswordTokenData(req.user.id)
                if (!result) {
                    return ResponseHelpers.SetErrorResponse('Unable to process request.', res)
                }
                return ResponseHelpers.SetForbiddenResponse('jtw token expired', res)
            }
            const userDetails = {
                userId: !req.tokenStatus ? req.user.id : false,
                createdBy: req.user.createdBy,
                tokenId: req.tokenStatus ? req.user.id : false,
                tokenStatus: !!req.tokenStatus
            }
            const result = await AnonymousService.Authenticate(userDetails)
            if (!result) {
                return ResponseHelpers.SetNotFoundResponse('Missing email and/or password.', res)
            }
            result.type = !req.user.randomKey
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    SendOtp: async(req, res, next) => {
        try {
            console.log(req.body.phone);
            const result = await CommonService.UserModel.GetDetailsByEmail(req.body, req.body.phone)
            if (!result) {
                return ResponseHelpers.SetErrorResponse('Invalid Phone Number.', res)
            }
            const response = await AnonymousService.SendOtpSms(result)
            return ResponseHelpers.SetSuccessResponse(response, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    SendOtpCreatedAccount: async(req, res, next) => {
        try {
            const result = await CommonService.UserModel.GetDetailsByEmail(req.body, req.body.phone)
            if (result) {
                return ResponseHelpers.SetErrorResponse('Phone Number already registered!', res)
            }
            let response
            if (req.body.user) {
                const { email, phone, userRole } = req.body.user
                response = await AnonymousService.SendOtpSmsCreatedAccount(email, phone, userRole)
            } else {
                const { email, phone, userRole } = req.body
                response = await AnonymousService.SendOtpSmsCreatedAccount(email, phone, userRole)
            }

            return ResponseHelpers.SetSuccessResponse(response, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    ResetPassword: async(req, res, next) => {
        try {
            let flag = true
            const { email, phone } = req.body
            if (!email && !phone) {
                return ResponseHelpers.SetSuccessResponse({ message: 'Missing email/phone address.' }, res, CommonConfig.STATUS_CODE.OK)
            }
            console.log('req.resetPasswordGenerated', req.resetPasswordGenerated);
            console.log('req.tokenStatus', req.tokenStatus);
            console.log('req.tokenData', req.tokenData);
            if (!req.resetPasswordGenerated && !req.tokenStatus && !req.tokenData) {
                const userModel = await CommonService.UserModel.GetDetailsByEmail(email, phone)
                if (!userModel) {
                    return ResponseHelpers.SetSuccessResponse({ message: 'user not exists.' }, res, CommonConfig.STATUS_CODE.OK)
                }
                const tempPassword = await CommonService.Keys.GeneratePassword()
                const uniqueKey = await CommonService.Keys.RandomKeys.GenerateUnique16DigitKey()
                const token = await AuthenticationHelpers.GenerateTokenForResetPassword(userModel.userInfo, uniqueKey, false)
                const data = await AnonymousService.AddResetPasswordDetails({
                    email: userModel.emailId || userModel.facebookEmailId || userModel.googleEmailId,
                    phone: userModel.phone,
                    tempPassword: tempPassword,
                    randomKey: tempPassword,
                    token: token,
                    uniqueKey: uniqueKey,
                    createdBy: userModel.id
                }, email, phone, null)
                if (!data) {
                    flag = false
                }
            } else if (req.resetPasswordGenerated && !req.tokenStatus && !req.tokenData) {
                const userModel = await CommonService.UserModel.GetDetailsByEmail(email, phone)
                const tempPassword = await CommonService.Keys.GeneratePassword()
                const uniqueKey = await CommonService.Keys.RandomKeys.GenerateUnique16DigitKey()
                const token = await AuthenticationHelpers.GenerateTokenForResetPassword(userModel.userInfo, uniqueKey, false)
                const result = await AnonymousService.AddResetPasswordDetails({
                    email: userModel.emailId || userModel.facebookEmailId || userModel.googleEmailId,
                    phone: userModel.phone,
                    tempPassword: tempPassword,
                    randomKey: tempPassword,
                    token: token,
                    uniqueKey: uniqueKey,
                    createdBy: userModel.id
                }, email, phone, { tokenStatus: req.tokenStatus, tokenId: req.tokenId })
                if (!result) {
                    flag = false
                }
            } else if (req.resetPasswordGenerated && req.tokenData && req.tokenStatus) {
                const data = await AnonymousService.SendResetPasswordKeyToMail(req.tokenData.email, email, phone)
                if (!data) {
                    flag = false
                }
            }
            if (!flag) {
                return ResponseHelpers.SetErrorResponse('Unable to process your request.', res)
            }
            if (email) {
                return ResponseHelpers.SetSuccessResponse({
                    email: email,
                    message: CommonConfig.SUCCESS.EMAIL_SENT,
                }, res, CommonConfig.STATUS_CODE.OK)
            } else {
                return ResponseHelpers.SetSuccessResponse({
                    phone: phone,
                    message: CommonConfig.SUCCESS.SMS_SENT,
                }, res, CommonConfig.STATUS_CODE.OK)
            }

        } catch (error) {
            next(error)
        }
    },
    ChangePassword: async(req, res, next) => {
        try {
            const userDetails = {
                id: req.user.id,
                email: req.user.email,
                password: req.body.password
            }
            await CommonService.ChangePassword(userDetails)
            return ResponseHelpers.SetSuccessResponse(CommonConfig.SUCCESS.PASSWORD_CHANGED, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    GuestLogin: async(req, res, next) => {
        try {
            const guestDetails = {
                userRole: 8,
                isGuest: true
            }
            let result = await CommonService.Token.GuestLoginToken(guestDetails)
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
    AuthenticateAdmin: async(req, res, next) => {
        try {
            if (req.user.token && !req.tokenStatus) {
                const result = await CommonService.InvalidateResetPasswordTokenData(req.user.id)
                if (!result) {
                    return ResponseHelpers.SetErrorResponse('Unable to process request.', res)
                }
                return ResponseHelpers.SetForbiddenResponse('jtw token expired', res)
            }
            const userDetails = {
                userId: !req.tokenStatus ? req.user.id : false,
                createdBy: req.user.createdBy,
                tokenId: req.tokenStatus ? req.user.id : false,
                tokenStatus: !!req.tokenStatus
            }
            const result = await AnonymousService.AuthenticateAdmin(userDetails)
            console.log(result);
            if (!result) {
                return ResponseHelpers.SetSuccessErrorResponse({ message: 'Unauthorised access.' }, res, CommonConfig.STATUS_CODE.UNAUTHORIZED)
            }
            result.type = !req.user.randomKey
            return ResponseHelpers.SetSuccessResponse(result, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },

    PaymentIntentsnew: async(req, res, next) => {
        try {
            // const { id } = req.user
            const { amount,paymentMethodType } = req.body;
            // Some example payment method types include `card`, `ideal`, and `alipay`.
			
			const customer = await stripe.customers.create({
						email: req.body.email,
						//source: token.id,
						//name: 'Debraj Sarkar'
					})
					
            const params = {
                payment_method_types: [paymentMethodType],
                amount,
                currency: 'sgd', 
				customer : customer.id
            }

            // If this is for an ACSS payment, we add payment_method_options to create
            // the Mandate.
            if (paymentMethodType === 'acss_debit') {
                params.payment_method_options = {
                    acss_debit: {
                        mandate_options: {
                            payment_schedule: 'sporadic',
                            transaction_type: 'personal',
                        },
                    },
                }
            }


            const paymentIntent = await stripe.paymentIntents.create(params);

            // Send publishable key and PaymentIntent details to client
            const paymentIntentData = {
                clientSecret: paymentIntent.client_secret,
            }

            return ResponseHelpers.SetSuccessResponse(paymentIntent, res, CommonConfig.STATUS_CODE.OK)
        } catch (error) {
            next(error)
        }
    },
	
	PaymentNew: async(req, res, next) => {
        try {
			/*const token = await stripe.tokens.create({
						card: {
							number: '4242424242424242',
							exp_month: 2,
							exp_year: 2023,
							cvc: '314',
						},
					});*/
			
			  
			const customer = await stripe.customers.create({
						email: req.body.email,
						//source: token.id,
						name: 'Debraj Sarkar',
						address: {
							line1: 'TC 9/4 Old MES colony',
							postal_code: '452331',
							city: 'Indore',
							state: 'Madhya Pradesh',
							country: 'India',
						}
					})
			if(customer){					
				const charge = await stripe.charges.create({
						amount: 2500,     // Charing Rs 25
						description: 'Meyu Chef Product',
						currency: 'sgd',
						customer: customer.id
					})
				if(charge){
					return ResponseHelpers.SetSuccessResponse(charge, res, CommonConfig.STATUS_CODE.OK)
				}
				/*(charge) => {
					//res.send("Success")  // If no error occurs
					return ResponseHelpers.SetSuccessResponse(charge, res, CommonConfig.STATUS_CODE.OK)
				})
				.catch((err) => {
					res.send(err)       // If some error occurs
				})*/
			}
			
			
		} catch (error) {
            next(error)
		}
        
    }
}

let AnonymousController = {
    Anonymous: Anonymous
}

module.exports = AnonymousController