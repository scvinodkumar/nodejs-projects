exports.home=function(req,res){
  res.render('home',{title:'iLoveMyCity',
                    headline:'We showing greatest cities in this world!!!'
                    });
                  }


exports.city=function(req,res){
    var cityName=req.params.city;
    var title,heading;
    var imageCount=4;

    if(cityName==='cityone'){
       title="City One";
       heading="Where love is in the air";
    }
    else if(cityName==='citytwo'){
       title="City Two";
       heading="Good talkers are only found in Paris";
    }
    else if(cityName==='citythree'){
       title="City Three";
       heading="Buzz, Beautiful architecture and Football";
    }
    else if(cityName==='cityfour'){
       title="City Four";
       heading="Sparkling, Still, Food, Gorgeous";
	   imageCount=6;
    }
    else if(cityName==='cityfive'){
       title="City Five";
       heading="Come to New York to become someone new";       
    }

    res.render('city',{
        title:title,
        headline:heading,
        city:cityName,
        numberOfImages:imageCount});
  }
