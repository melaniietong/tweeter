$(document).ready(function(){   
  $('#tweet-text').on('keyup', function() {
    const tweetLength = $(this).val().length;
    const maxCount = 140;
    const tweetSpaceLeft = maxCount - tweetLength;
    
    // Updates the counter with character space left.
    $(this).next().children(".counter").val(tweetSpaceLeft);

    if (tweetSpaceLeft < 0) {
      $(this).next().children(".counter").css("color", "red");
    } else {
      $(this).next().children(".counter").css("color", "");
    }
  });
});