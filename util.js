// util.js

var util = {};

util.parseError = function(errors){
    var parsed = {};
    if(errors.name == 'ValidationError'){
        for(var name in errors.errors){
            var ValidationError = errors.errors[name];
            parsed[name] = { message:ValidationError.message };
        }
    }
    else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0){
        parsed.username = { message:'This username already exists!' };
    }
    else {
        parsed.unhandled = JSON.stringify(errors);
    }
    return parsed; 
}
util.isLoggedin = function(req, res, next){
    if(req.isAuthenticated()){
      next();
    } 
    else {
      req.flash('errors', {login:'Please login first'});
      res.redirect('/login');
    }
}
util.noPermission = function(req, res){
    req.flash('errors', {login:"You don't have permission"});
    req.logout();
    res.redirect('/login');
}

util.getRecruitmentQueryString = function(req,res,next){
  res.locals.getRecruitmentQueryString = function(isAppended=false, overwrites={}){
    var queryString = '';
    var queryArray = [];
    var searchType = overwrites.searchType?overwrites.searchType:(req.query.searchType?req.query.searchType:'');
    var searchText = overwrites.searchText?overwrites.searchText:(req.query.searchText?req.query.searchText:'');

    if(searchType) queryArray.push('searchType='+searchType);
    if(searchText) queryArray.push('searchText='+searchText);

    if(queryArray.length>0) queryString = (isAppended?'&':'?') + queryArray.join('&');

    return queryString;
  }
  next();
}
module.exports = util;