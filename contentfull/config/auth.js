// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '309164076189226', // your App ID
        'clientSecret'    : 'd2669287d574570db5cec6d23821a530', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
		//'callbackURL'     : 'https://contentfull-demo.herokuapp.com/auth/facebook/callback',
        'profileURL'	  : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email,picture.type(normal),gender'
    },

	
    'twitterAuth' : {
        'consumerKey'        : 'zsLe2nDrJ6vUNj6jFktu7uNy5',
        'consumerSecret'     : 'ObZlaBLkpQgJJSWoSgyQGWsAzI1Muh2iNPYSjA0z6bqI7Xhsjx',
        'callbackURL'        : 'http://127.0.0.1:8080/auth/twitter/callback'
	   //'callbackURL'     : 'https://contentfull-demo.herokuapp.com/auth/twitter/callback',
    },

    
	'googleAuth' : {
        'clientID'         : '500454076814-66pghe1c00dqgrjopdbggceg5bmh8639.apps.googleusercontent.com',
        'clientSecret'     : 'odkRvHRSTWU3bCl2pyOchENx',
        'callbackURL'      : 'http://127.0.0.1:8080/auth/google/callback'
		//'callbackURL'     : 'https://contentfull-demo.herokuapp.com/auth/google/callback',
    }
	

};
