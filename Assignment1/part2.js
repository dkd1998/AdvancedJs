var form = document.getElementById("myform")

var output = {
    "name": "",
    "full_name": "",
    "private": "",
    "owner": {
        "login": "",
        "name": "",
        "followersCount": "",
        "followingCount": ""
    },
    "licenseName": "",
    "score": "",
    "numberOfBranch": ""
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    var search = document.getElementById("search").value;

    fetch("https://api.github.com/search/repositories?q={{input from text}}")
        .then((result) => result.json())
        .then((data) => {
            var sol = data.items;

            sol.forEach(ele => {
                if (search === ele.name) {
                    output["name"] = ele.name;
                    output["full_name"] = ele.full_name;
                    output["private"] = ele.private;
                    output["score"] = ele.score;
                    output["owner"].login = ele.owner.login;
                    var arc = ele.license;
                    if (ele.license !== null)
                        output["licenseName"] = ele.license.name;
                    else
                        output["licenseName"] = null;
                    fetch(ele.owner.url)
                        .then((result) => result.json())
                        .then((data) => {
                            var poq = data.name;
                            output["owner"].name = poq;
                        })
                    fetch(ele.owner.followers_url)
                        .then((result) => result.json())
                        .then((data) => {
                            var count = 0;
                            data.forEach(ele => {
                                count++;
                            });
                            output["owner"].followersCount = count;
                        })
                    output["owner"].followingCount = null;
                    output["numberOfBranch"] = null;
                }
            })
        })
        console.log(output);
})