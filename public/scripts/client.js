const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1611612975892
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1611699375892
  },
];

const createTweetElement = function(data) {
  let tweets = [];
  for (let post of data) {
    const currentUser = post.user;

    tweets.push($(`
      <article>
        <header>
          <img class="profilePic" src=${currentUser.avatars}">
          <address>${currentUser.name}</address>
          <address class="userHandle">${currentUser.handle}</address>
        </header>
        <div class="tweet">${post.content.text}</div>
        <footer>
          <time>${post.created_at}</time>
          <div class="actions">
            <img src="images/actions/flags.png">
            <img src="images/actions/retweet.png">
            <img src="images/actions/like.png">
          </div>
        </footer>
      </article>
    `));
  }

  return tweets;
};

$(document).ready(function(){  
  $(function() {
    const $button = $("#submit-tweet");

    $button.submit(function(event) {
      const input = $("#tweet-text").serialize();
      const inputOnly = input.slice(5);

      if (inputOnly === "" || inputOnly === null || decodeURI(inputOnly).trim().length === 0) {
        alert("ERROR: Submission empty. Please write something first.");
        event.preventDefault();
      } else if (inputOnly.length >= 140) {
        alert("ERROR: Submission over 140 characters. Please shorten it before submitting.");
        event.preventDefault();
      } else {
        $.post("/tweets/", input, () => {
          console.log("Form successfully submitted.");

          
        });
      }
    });
  });

  $.ajax('/tweets/', { method: 'GET' })
    .then(function(data) {
      const $tweet = createTweetElement(data);
      $(".feed").append($tweet);
  });
});