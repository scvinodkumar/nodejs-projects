var express				=	require('express')
  , util              	=   require('util')
  , session 			= 	require('express-session')
  , cookieParser 		= 	require('cookie-parser')
  , bodyParser 			= 	require('body-parser')
  , flash 				= 	require('connect-flash')
  , multer 				= 	require('multer')
  , passport        	=   require('passport')
  //, FacebookStrategy  	=   require('passport-facebook').Strategy
 // , config            	=   require('./configuration/config')
//, mysql             	=   require('mysql')
  , morgan       		= 	require('morgan')
  , mongoose 			= 	require('mongoose');
   

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration   


/*
//Define MySQL parameter in Config.js file.
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.username,
  password : config.password,
  database : config.database
});
*/

var app=express();

app.set('view engine','ejs');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


var sessionStore 	= 	new session.MemoryStore;
var upload 			= 	multer({ dest: 'images/'});

app.use(cookieParser());
app.use(session({
	cookie: { maxAge: null },
	store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'ilovescotchscotchyscotchscotch'
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(flash());

app.use(function(req, res, next){	
	res.locals.usersActive = '';
	if (req.isAuthenticated()) {
		console.log(req.user);
		res.locals.usersActive = req.user;
	}
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

var routes=require('./routes/route.js');

	

app.get('/',getLoggedIn,routes.index);
app.get('/products',getLoggedIn,routes.products);
app.get('/articles',getLoggedIn,routes.articles);
app.get('/view/:id',getLoggedIn,routes.view);
app.get('/category/:id',getLoggedIn,routes.category_view);
app.get('/search',getLoggedIn,routes.search);
app.post('/search',routes.search);
app.post('/comments/:id/saveComment',routes.savecomment);
app.get('/register',getLoggedIn,routes.register);
app.post('/register',upload.single('picture'),routes.registerSubmit);

app.get('/login', isNotLoggedIn, routes.login);
app.get('/profile', isLoggedIn, routes.profile);
app.get('/logout', isLoggedIn, routes.logout);

//For facebook authetication...
// send to fb to do the authentication
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/'
	})
);
// For logged-in users..
app.get('/connect/facebook/callback',
	passport.authorize('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));

//For twitter authetication...
// send to twitter to do the authentication
app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
// handle the callback after twitter has authenticated the user
app.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect : '/profile',
		failureRedirect : '/'
	})
);
 // handle the callback after twitter has authorized the user
app.get('/connect/twitter/callback',
	passport.authorize('twitter', {
		successRedirect : '/profile',
		failureRedirect : '/'
	})
);

// google ---------------------------------
// send to google to do the authentication
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
// the callback after google has authenticated the user
app.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect : '/profile',
		failureRedirect : '/'
	})
);
// the callback after google has authorized the user
app.get('/connect/google/callback',
	passport.authorize('google', {
		successRedirect : '/profile',
		failureRedirect : '/'
	})
);

// facebook -------------------------------
/*
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
*/
       

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
        return next();

    res.redirect('/');
}
function getLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
	return next();
}


var port = process.env.PORT || 8080;

var server=app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});
module.exports=app;