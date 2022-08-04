const SigninSignupRoutes = require('express').Router();
const {signinController, signupController, verifyAccountController } = require('../controllers/signinsignup.controller');
const { result_validator } = require('../middleware/global_middleware');
const { token_parser } = require('../utilities/jwt_token');
const {signup_validator, signin_validator} = require('../validation/signinsignup.validation');

(() => {
    get_requests();
    post_requests();
})();

function post_requests() {
    SigninSignupRoutes.post("/signup", signup_validator(),result_validator, signupController);
    SigninSignupRoutes.post("/signin", signin_validator(),result_validator, signinController);
}

function get_requests() {
    SigninSignupRoutes.get("/verify-account", token_parser, verifyAccountController );
}

module.exports = SigninSignupRoutes