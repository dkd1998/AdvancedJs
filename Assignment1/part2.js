var form = document.getElementById("myform")

var ans = {
    "name": "",
    "full_name": "",
    "private": "",
	"owner":{
  		"login":"",
		"name":"",
        "followersCount":"",
        "followingCount":""
    },
    "licenseName":"",
    "score":"",
    "numberOfBranch":""
}

form.addEventListener('submit',function(e){
    e.preventDefault();

    var search = document.getElementById("search").value;
    
    fetch("https://api.github.com/search/repositories?q={{input from text}}")
    .then((result) => result.json())
    .then((data) => {
        var sol = data.items;
        sol.forEach(element => {
            if(search === element.name){
                ans["name"] = element.name;
                ans["full_name"] = element.full_name;
                ans["private"] = element.private;
                ans["score"] = element.score;
                ans["owner"].login = element.owner.login;
                var arc = element.license;
                if(element.license !== null)
                    ans["licenseName"] = element.license.name;
                else
                    ans["licenseName"] = null;
                fetch(element.owner.url)
                .then((result) => result.json())
                .then((data) => {
                    var poq = data.name;
                    ans["owner"].name = poq;
                })
                fetch(element.owner.followers_url)
                .then((result) => result.json())
                .then((data) => {
                    var count = 0;
                    data.forEach(element => {
                        count++;
                    });
                    ans["owner"].followersCount = count;
                })
                ans["owner"].followingCount = null;
                ans["numberOfBranch"] = null;
            }      
        })
    })
    console.log(ans);
})