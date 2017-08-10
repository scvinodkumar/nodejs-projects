exports.home=function(req,res){
  res.render('home',{title:'iLoveMyCity',
                    headline:'Great Cities in this world!!!'
                    });
                  }


exports.city=function(req,res){
    var cityName=req.params.city;
    var title,heading;
    var imageCount=4;

    if(cityName==='newyork'){
       title="New York";
       heading="New York, USA: Bigger and more advanced technology";
	   imageCount=6;
    }
    else if(cityName==='london'){
       title="London";
       heading="London: London is easily the best city on the planet.";
    }
    else if(cityName==='paris'){
       title="Paris";
       heading="Paris: Such wonderful, cultural, historical, capital of fashion, of haute couture, of gastronomy, of arts.";
    }
    else if(cityName==='tokyo'){
       title="Tokyo";
       heading="Tokyo: Everybody is so friendly";
    }
    else if(cityName==='losangeles'){
       title="Los Angeles";
       heading="Los Angeles: The entire area has some amazing sights and attractions";       
    }

    res.render('city',{
        title:title,
        headline:heading,
        city:cityName,
        numberOfImages:imageCount});
  }
