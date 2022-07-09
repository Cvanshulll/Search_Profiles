console.log("hello");

var base = "https://codeforces.com/api/user.info?handles=";

const search = document.getElementById("search");
const profile = document.getElementById("profile");
const form = document.getElementById("form");
const button = document.getElementById("btn1");
var api_url;


function getUser(user) {
    
        api_url = base+user;
        console.log(api_url);
        getapi(api_url);
}



// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    if(response.status!=200)
    {
        showEmpty('');
    }
    // Storing data in form of JSON
    var data = await response.json();
    if(data.status=='FAILED')
    {
        showEmpty(data.comment.slice(9));
    }
    console.log(data.status);
   
        if(base=="https://codeforces.com/api/user.info?handles=")
        codeforcesUserCard(data);
    else if(base=="https://api.github.com/users/")
        githubUserCard(data),
        getRepos(url);
    else if(base=="https://competitive-coding-api.herokuapp.com/api/codechef/")
        codechefUserCard(data);    
    // showAvatar(data);
    // showDetails(data);
    
}
// Calling that async function
getapi(api_url);

function showEmpty(msg)
{
    const errorCard = `<div class="errorCard col mt-5 d-flex justify-content-center"><h1>${msg}</h1></div>`;
    profile.innerHTML = errorCard;       
}

function getUserId(platform)
{
    if(platform=='github')
    {
        base = "https://api.github.com/users/";
        console.log(api_url)
        search.placeholder = "Enter your Github handle";
    }
    if(platform=='codeforces')
    {
        base = "https://codeforces.com/api/user.info?handles=";
        search.placeholder = "Enter your Codeforces handle";
    }
    if(platform=='codechef')
    {
        base = "https://competitive-coding-api.herokuapp.com/api/codechef/";
        search.placeholder = "Enter your Codechef handle";
    }
}

async function getRepos(username) {
    
    const response = await fetch(api_url+'/repos?sort=created');
        var data = await response.json();
        addReposToCard(data);
    
}

function githubUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const avatar = user.avatar_url;
    console.log(avatar);
    const userCard = `
    <div class="userCard  row-sm">
        <div class="avatar col d-flex justify-content-center ">
            <img src= "${avatar}" alt="${userID}" >
        </div>
        <div class="details col d-flex justify-content-center">
        <h2>${userID}</h2>
        </div>
        <div class="col d-flex justify-content-center">
            ${userBio}
        </div>
        <div class="col d-flex justify-content-center">
            <ul style="list-decoration:none;">
            <li class="d-flex justify-content-center">${user.followers} &nbsp;<strong>Followers</strong></li>
            <li class="d-flex justify-content-center">${user.following}&nbsp; <strong>Following</strong></li>
            <li class="d-flex justify-content-center">${user.public_repos}&nbsp; <strong>Repos</strong></li>
            </ul>
        </div>
    </div>
  </div>
    `;

    profile.innerHTML = userCard;
    
}

function codeforcesUserCard(data)
{

    const userName = data.result[0].handle;
    console.log(userName);
    var avatar = data.result[0].titlePhoto;
    var rank = data.result[0].rank;
    var rankColor="black";
    if(rank=="pupil")
    {
        rankColor="#008000";
    }
    else if(rank=="newbie")
    {
        rankColor="#808080";
    }
    else if(rank=="specialist")
    {
        rankColor="#03a89e";
    }
    else if(rank=="expert")
    {
        rankColor="#0000ff";
    }	
    else if(rank=="legendary grandmaster")
    {
        rankColor="#ff0000";
    }
    else if(rank=="international master")
    {
        rankColor="#ff8c00";
    }
    else if(rank=="candidate master")
    {
        rankColor="#a0a";
    }
    else if(rank=="master")
    {
        rankColor="#ff8c00";
    }
    else if(rank=="Grandmaster")
    {
        rankColor="#ff0000";
    }
    
    var curr = data.result[0].rating;
    const userCard = `
    <div class="userCard  row-sm">
        <div class="avatar col d-flex justify-content-center ">
            <img src= "${avatar}" alt="${userName}" >
        </div>
        <div class="details col d-flex justify-content-center">
            <h2 > ${userName} &nbsp;</h2>
            <h5 id="rank" style="color:${rankColor}"> ${rank}</h5>
            </div>
            <div class="col d-flex justify-content-center">
                <p> Ratings[Max/Curr]:&nbsp;   <strong style="color:red; font-size:20px;"> ${data.result[0].maxRating}</strong>/${curr}</p>    
            </div>
        </div>
    </div>
    `;

    profile.innerHTML = userCard;
}

function codechefUserCard(data)
{
    const username = data.user_details.username;
    console.log(username);
    const rating = data.rating;
    console.log(rating);
    const name =data.name;
    const userCard = `
    <div class="userCard row-sm">
        <div class="avatar col d-flex justify-content-center ">
            <img src= "images/codechef.jpg" alt="${data.user_details.name}" >
        </div>
        <div class="details col d-flex justify-content-center">
            <h2 > ${data.user_details.username} &nbsp;</h2>
            <h4 style="color:blue;"> ${data.stars}</h4>
        </div>
        <div class="details col d-flex justify-content-center">
        <ul>
        <li class="d-flex justify-content-center">Rating: &nbsp;<strong> ${data.rating} </strong></li>
        <li class="d-flex justify-content-center">Problems Fully Solved:&nbsp; <strong> ${data.fully_solved.count}</strong></li>
        <li class="d-flex justify-content-center">Name: ${data.user_details.name}</li>
      </ul>
        </div>
            
        </div>
    </div>
    `;
    
    profile.innerHTML = userCard;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl);
        })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    
    console.log(user);
    if(user)
    {
        getUser(user);

        search.value='';
    }
    
});

function changeBg(color)
{
    if(color=='purple')
    {
        document.body.style.backgroundColor = '#9DAAF2';
        document.getElementById(color).style.boxShadow = '0px 0px 10px #9DAAF2';
    }
    else if(color=='yellow')
    {
        document.body.style.backgroundColor = '#F4DB7D';
        document.getElementById(color).style.boxShadow = '0px 0px 10px #9DAAF2';
    }
    else if(color=='grey')
    {
        document.body.style.backgroundColor = '#C39EA0';
        document.getElementById(color).style.boxShadow = '0px 0px 10px #9DAAF2';
    }
}
