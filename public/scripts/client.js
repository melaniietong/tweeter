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

$(document).ready(function() {
  $(function() {
    const $button = $("#submit-tweet");
    const textboxArea = $("#tweet-text");

    $button.submit(function(event) {
      $( ".empty-error" ).hide();
      $( ".over-error" ).hide();

      const input = textboxArea.serialize();
      const inputOnly = input.slice(5);

      event.preventDefault();

      if (inputOnly === "" || inputOnly === null || decodeURI(inputOnly).trim().length === 0) {
        $( ".empty-error" ).slideDown( "slow");
      } else if (inputOnly.length >= 140) {
        $( ".over-error" ).slideDown( "slow");
      } else {
        $.post("/tweets/", input, () => {
          textboxArea.val("");
          $(".counter").val("140");

          $.ajax('/tweets/', {method: 'GET'})
            .then(function(data) {
              // Gets the last submitted tweet.
              const submittedTweet = createTweetElement([data[data.length - 1]]); 

              $(".feed").append(submittedTweet);
          });
        });
      }
    });
  });

  $.ajax('/tweets/', {method: 'GET'})
    .then(function(data) {
      const tweet = createTweetElement(data);
      $(".feed").append(tweet);
    }
  );
});