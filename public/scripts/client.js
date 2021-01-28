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
    const textboxArea = $("#tweet-text");

    $button.submit(function(event) {
      const input = textboxArea.serialize();
      const inputOnly = input.slice(5);

      event.preventDefault();

      if (inputOnly === "" || inputOnly === null || decodeURI(inputOnly).trim().length === 0) {
        document.getElementsByClassName("submit-error")[0].innerHTML = "⚠️ Empty. Please write something first.";
      } else if (inputOnly.length >= 140) {
        document.getElementsByClassName("submit-error")[0].innerHTML = "⚠️ Over 140 characters. Please shorten your submission.";
      } else {
        $.post("/tweets/", input, () => {
          document.getElementsByClassName("submit-error")[0].innerHTML = "";
          textboxArea.val("");

          $.ajax('/tweets/', { method: 'GET' })
            .then(function(data) {
              const submittedTweet = createTweetElement([data[data.length-1]]); // Gets the last submitted tweet.
              $(".feed").append(submittedTweet);
          });
        });
      }
    });
  });

  $.ajax('/tweets/', { method: 'GET' })
    .then(function(data) {
      const tweet = createTweetElement(data);
      $(".feed").append(tweet);
  });
});