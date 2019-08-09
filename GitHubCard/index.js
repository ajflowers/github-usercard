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
    //console.log(response);
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
  card.className = 'card';

  //additional inner divs added for stretch purposes
  const cardMain = document.createElement('div');
  cardMain.style.display = 'flex';

  card.appendChild(cardMain);


  const cardFriends = document.createElement('div');
  cardFriends.style.display = 'flex'
  cardFriends.classList.add('friends', `github-${user.login}`);
  card.appendChild(cardFriends);
  //note unique classes for each - relevant
  

  //image
  const cardImg = document.createElement('img');
  cardImg.setAttribute('src', user.avatar_url);
  cardImg.setAttribute('alt', `${user.name}'s GitHub profile picture`);
  
  cardMain.appendChild(cardImg);

  //info div
  const cardInfo = document.createElement('div');
  cardInfo.className = 'card-name';

  cardMain.appendChild(cardInfo);

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
  cardFollowers.append(`Followers: ${user.followers} `);
  
  cardInfo.appendChild(cardFollowers);

  //followers
  const cardFollowing = document.createElement('p');
  cardFollowing.append(`Following: ${user.following} `);

  cardInfo.appendChild(cardFollowing);

  //bio
  const cardBio = document.createElement('p');
  cardBio.append(`Bio: ${user.bio}`);

  cardInfo.append(cardBio);

  // STRETCH: adding clickable spans for expanding cards
  // show followers
  const followersButton = document.createElement('span');
  followersButton.append('(show)');
  followersButton.addEventListener('click', (e) => {
    //toggles span text, calls function if appropriate
    if (followersButton.textContent === '(show)') {
      //note both spans will toggle as we will show only one category of contacts below at a time
      followersButton.textContent = '(hide)';
      followingButton.textContent = '(show)'; 
      getChildCards(user.login, user.name, 'followers');
      } else { 
      //if now hide button, click hides followers as well as toggling text
      cardFriends.style.display = 'none';
      followersButton.textContent = '(show)'
    }
  });
  followersButton.classList.add(`followers-${user.login}`)
  
  cardFollowers.append(followersButton);

  // show following
  // same but reverse followers/following
  const followingButton = document.createElement('span');

  followingButton.append('(show)');
  followingButton.addEventListener('click', (e) => {
    if (followingButton.textContent === '(show)') {
      followingButton.textContent = '(hide)';
      followersButton.textContent = '(show)'
      getChildCards(user.login, user.name, 'following');
    } else {
      cardFriends.style.display = "none";
      followingButton.textContent = '(show)'
    }
  });
  followingButton.classList.add(`following-${user.login}`)

  
  cardFollowing.append(followingButton);


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


// const testCard = makeCard('ajflowers');
// console.log(testCard);


// //console.log(followersArray);

// followersArray.forEach(follower => {
//   getCard(follower);
// })


// STRETCH ATTEMPT 1
// UNCOMMENT BELOW

// function meAndTheSquad (name) {
// const nameList = [name];
// axios.get(`https://api.github.com/users/${name}/followers`)
//   .then((response) => {
//     response.data.forEach(follower => {
//       nameList.push(follower.login);
//     })
//     console.log(nameList);
//   })
//   .then(() => {
//     nameList.forEach(person => {
//       getCard(person);
//     })
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }
// meAndTheSquad('ajflowers');

//UNCOMMENT ABOVE

// STRETCH ATTEMPT 2
// mixing collapsible cards w/ retrieval of followers/following data

// starting with coded list of users


// function to add user cards within existing user cards
// called by getChildCards
function childCard(parent, child) {
  
  // selector will target parent card's friends div only
  let target = document.querySelector(`.github-${parent}`);
  
  // note extra class added - prevents nesting more than 2 cards deep 
  // separate class instead of child property in case we want to add more styling
  axios.get(`https://api.github.com/users/${child}`)
    .then((response) => {
      let newChild = makeCard(response.data);
      newChild.classList.add('child-card');
      target.appendChild(newChild);
    })
    .catch((err) => {
      console.log(err);
    })
}




// function to identify users following or followed
// called by event listeners on parent cards
// type will be "following" or "followers" from listener
function getChildCards(login, name, type) {
  
  // same selector for parent's div where new cards to go
  let target = document.querySelector(`.github-${login}`);
  let childList = []
  
  //pull followers/following
  axios.get(`https://api.github.com/users/${login}/${type}`)
    .then((response) => {
      //build array of usernames we need cards for
      childList = response.data.map(person => person.login);
      console.log(childList);
      
      //friends div reset
      //clears out any prior content in target div
      while (target.lastChild) {
        target.removeChild(target.lastChild)
      }

      //restore visibility if previously hidden
      target.style.display = 'flex'

      //add header for new content
      const resultHeader = document.createElement('div');
      resultHeader.className = 'subheader'
      if (type === 'followers') {
        resultHeader.append(`Users following ${name} `);
      } else {
        resultHeader.append(`${name}'s followers`);
      }
      
      //add for bigger "hide" to click
      const resultSpan = document.createElement('span');
      resultSpan.textContent = `(hide ${type})`


      resultSpan.addEventListener('click', (e) => {
        //hide div on click
        target.style.display = 'none';
        //reset buttons on card
        let btnA = document.querySelector(`followers-${user.login}`);
        let btnB = document.querySelector(`following-${user.login}`);
        btnA.textContent = '(show)'
        btnB.textContent = '(show)'

      })

      resultHeader.appendChild(resultSpan);
      target.appendChild(resultHeader);
    })
    .then(() => {
      //pass each usernames in list to card function with destination
      childList.forEach(friend => {
        childCard(login, friend);
      })
    })
    .catch((err) => {
      console.log(err)
    })

}

namesArray.forEach(name => {
  getCard(name);
})


/* -----NOTES-----
add search box and button to top div
change spans to buttons
*/
