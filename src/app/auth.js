/* eslint-disable */
import {CognitoAuth, StorageHelper} from 'amazon-cognito-auth-js';
import IndexRouter from '../router/index';
import UserInfoStore from './user-info-store';
import UserInfoApi from './user-info-api';


const CLIENT_ID = process.env.VUE_APP_COGNITO_CLIENT_ID;
const APP_DOMAIN = process.env.VUE_APP_COGNITO_APP_DOMAIN;
const USERPOOL_ID = process.env.VUE_APP_COGNITO_USERPOOL_ID;
const REDIRECT_URI = process.env.VUE_APP_COGNITO_REDIRECT_URI;
const REDIRECT_URI_SIGNOUT = process.env.VUE_APP_COGNITO_REDIRECT_URI_SIGNOUT;
const APP_URL = process.env.VUE_APP_APP_URL;
// console.log(CLIENT_ID);
// console.log(APP_DOMAIN);
// console.log(USERPOOL_ID);
// console.log(REDIRECT_URI);
// console.log(REDIRECT_URI_SIGNOUT);
// console.log(APP_URL);
console.log("P:" + process.env.VUE_APP_COGNITO_REDIRECT_URI_SIGNOUT);
var authData = {
    ClientId : CLIENT_ID, // Your client id here
    AppWebDomain : APP_DOMAIN,
    TokenScopesArray : ['openid', 'email'],
    RedirectUriSignIn : REDIRECT_URI,
    RedirectUriSignOut : REDIRECT_URI_SIGNOUT,
    UserPoolId : USERPOOL_ID,
}

var auth = new CognitoAuth(authData);
auth.userhandler = {
    onSuccess: function(result) {
        console.log("On Success result", result);
        UserInfoStore.setLoggedIn(true);
        UserInfoApi.getUserInfo().then(response => {
            IndexRouter.push('/');
        });
        
        
    },
    onFailure: function(err) {
        UserInfoStore.setLoggedOut();
        IndexRouter.go({ path: '/error', query: { message: 'Login failed due to ' + err } });
    }
};

function getUserInfoStorageKey(){
    var keyPrefix = 'CognitoIdentityServiceProvider.' + auth.getClientId();
    var tokenUserName = auth.signInUserSession.getAccessToken().getUsername();
    var userInfoKey = keyPrefix + '.' + tokenUserName + '.userInfo';
    return userInfoKey;
}

var storageHelper = new StorageHelper();
var storage = storageHelper.getStorage();
export default{
    auth: auth,
    login(){
        auth.getSession();
    },
    logout(){
        if (auth.isUserSignedIn()) {
            var userInfoKey = this.getUserInfoStorageKey();
            auth.signOut();

            storage.removeItem(userInfoKey);
        }
    },
    getUserInfoStorageKey,

}