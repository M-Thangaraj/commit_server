var express = require('express');
var app = express();

app.get('/api.github.com/repos/:owner/:reponame/commits/:sha', function(req, res) {
    var XMLHttpRequest = require('xhr2');
    var xhr = new XMLHttpRequest();
    var username = req.params.owner;
    var repo = req.params.reponame;
    var Sha = req.params.sha;
    const url=`https://api.github.com/repos/${username}/${repo}/commits/${Sha}`;
    xhr.open('GET', url, true);
    xhr.onload = function () {
       const data = JSON.parse(this.response);
      // console.log(data.parents[0].sha);
       //console.log('hai');
       res.send(data);
    }
    xhr.send();
 })

 app.get('/api.github.com/repos/:owner/:reponame/commits/:sha/diff', function(req, res) {
   var XMLHttpRequest = require('xhr2');
   var xhr = new XMLHttpRequest();
   var username = req.params.owner;
   var repo = req.params.reponame;
   var Sha = req.params.sha;
   const url=`https://api.github.com/repos/${username}/${repo}/commits/${Sha}`;
   xhr.open('GET', url, true);
   xhr.onload = function () {
      const data = JSON.parse(this.response);
      var parxhr = new XMLHttpRequest();
      var parSha = data.parents[0].sha;
      console.log(data.parents[0].sha);
    //  const parUrl =`https://github.com/timmywheels/agile-week/compare/35b2a34e2ce8599da7245c6c0c8eb04de5044e11...3b8a08842fdb032689f79969dcaa505eac0e4d87.diff`;
      const parUrl=`https://github.com/${username}/${repo}/compare/${parSha}...${Sha}.diff`;
      parxhr.open('GET', parUrl, true);
      parxhr.onload= function(){
          //const data1 =JSON.parse(this.response);
         // const ink =data1.diff_url;
          //console.log(ink);
          //res.redirect(`https://github.com/${username}/${repo}/compare/${parSha}...${Sha}.diff`);
        res.send(this.response);
          //res.send("<p>hai</p>")
         // ;
          
         //res.send("<p><a href ="ink">d</a></p>")
      }
      parxhr.send();
   }
   xhr.send();
})
 //https://api.github.com/repos/timmywheels/agile-week/commits/35b2a34e2ce8599da7245c6c0c8eb04de5044e11
// https://github.com/timmywheels/agile-week/commit/35b2a34e2ce8599da7245c6c0c8eb04de5044e11
app.listen(2000);






// var express = require('express');
// var router = require('./route.js');
// const app =express();
// app.use('/',router)

// // app.get('/',function (req,res){
// //     res.send('Haii');
// // });
// app.listen(3000);