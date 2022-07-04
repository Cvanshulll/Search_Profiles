console.log("hello");

var api_url = "";
// console.log(api_url);


function enterUsername() {
    var x = document.getElementById("username");
    var username = x.value;
    if(username != "") 
    {
        show();
        api_url = "https://codeforces.com/api/user.info?handles="+username;
        console.log(api_url);
        getapi(api_url);
    }
    else{
        
        showEmpty();
    }
}

function showEmpty()
{
    var profile = document.getElementsByClassName("profile")[0];
        profile.style.display = "none";
}
function show()
{
    var profile = document.getElementsByClassName("profile")[0];
        profile.style.display = "visible";
}

// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    showAvatar(data);
    showDetails(data);

}
// Calling that async function
getapi(api_url);


function showAvatar(data) {
    var avatar = data.result[0].titlePhoto;
    var img = document.createElement("img");
    img.src = avatar;
    img.style.borderRadius = "10%";
    img.style.resize = "contain";
    img.style.boxShadow = "0px 0px 10px grey";
    document.getElementsByClassName("imageDiv")[0].appendChild(img);
}

function showDetails(data)
{
    showUserName(data);
    showRatings(data);
}


function showUserName(data)
{
    var handle = data.result[0].handle;
    var name = document.createElement("h1");
    name.innerHTML = "Username: ";

    var span = document.createElement("span");
    span.innerHTML = handle;
    span.style.color = "blue";
    name.appendChild(span);

    var rank = data.result[0].rank;
    var span2 = document.createElement("span");
    span2.innerHTML = ` (${rank})`;
    span2.style.fontFamily = "sans-serif";
    name.appendChild(span2);
    document.getElementsByClassName("username")[0].appendChild(name);
    name.style.fontSize = "30px";
}

function showRatings(data)
{
    var maxRate = data.result[0].maxRating;
    var maxRating = document.createElement("h1");
    maxRating.innerHTML = "Max-Rating: ";
    maxRating.style.fontSize = "20px";

    var span = document.createElement("span");
    span.innerHTML = maxRate;
    span.style.color = "blue";
    span.style.fontSize = "30px";
    maxRating.appendChild(span);

    
    document.getElementsByClassName("username")[0].appendChild(maxRating);
    
}

