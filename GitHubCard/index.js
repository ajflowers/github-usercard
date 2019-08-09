/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


axios.get('https://api.github.com/users/ajflowers')
  .then((response) => {
    console.log(response);
    console.log(response.data);
    // console.log(testObj);
  })
  .catch((err) => {
    console.log(err);
  })



const cards = document.querySelector('.cards');
// console.log(cards);

const makeCard = function (user) {

  //card - outer div to return
  const card = document.createElement('div');
  card.className = "card";

  //image
  const cardImg = document.createElement('img');
  cardImg.setAttribute('src', user.avatar_url);
  cardImg.setAttribute('alt', `${user.name}'s GitHub profile picture`);
  
  card.appendChild(cardImg);

  //info div
  const cardInfo = document.createElement('div');
  cardInfo.className = 'card-name';

  card.appendChild(cardInfo);

  //name
  const cardName = document.createElement('h3');
  cardName.className = 'name';
  cardName.append(user.name);

  cardInfo.appendChild(cardName);
  
  //login
  const cardLogin = document.createElement('p');
  cardLogin.className = 'username';
  cardLogin.append(user.login);
  
  cardInfo.appendChild(cardLogin);

  //location
  const cardLocation = document.createElement('p');
  cardLocation.append(`Location: ${user.location}`);
  
  cardInfo.appendChild(cardLocation);

  //profile
  const cardProfile = document.createElement('p');
  cardProfile.append("Profile: ");

  cardInfo.appendChild(cardProfile);

  //profile link - APPENDS TO PROFILE NOT INFO
  const cardProfLink = document.createElement('a');
  cardProfLink.append(user.html_url);
  cardProfLink.setAttribute("href", user.html_url);
  
  cardProfile.appendChild(cardProfLink);

  //followers
  const cardFollowers = document.createElement('p');
  cardFollowers.append(`Followers: ${user.followers}`);

  cardInfo.appendChild(cardFollowers);

  //followers
  const cardFollowing = document.createElement('p');
  cardFollowing.append(`Following: ${user.following}`);

  cardInfo.appendChild(cardFollowing);

  //bio
  const cardBio = document.createElement('p');
  cardBio.append(`Bio: ${user.bio}`);

  cardInfo.append(cardBio);

  //return card
  return card;
}



function getCard(username) {
  axios.get(`https://api.github.com/users/${username}`)
  .then((response) => {
    let newCard = makeCard(response.data);
    cards.appendChild(newCard);
  })
  .catch((err) => {
    console.log(err);
  })
}


getCard('ajflowers');

//console.log(followersArray);

followersArray.forEach(follower => {
  getCard(follower);
})

