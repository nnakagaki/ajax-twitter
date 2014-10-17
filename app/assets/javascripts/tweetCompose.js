$.TweetCompose = function ($el) {
  var that = this;
  $el.on("submit", function (event) {
    event.preventDefault();
    that.disabled = false;
    that.submit($el);
  });

  $el.find("textarea").on("input", function (event) {

    var textarea = $el.find("textarea")
    $el.find("strong.chars-left").html(140 - textarea.val().length + " characters remains..." )
  })

};

$.TweetCompose.prototype.submit = function ($el) {
  if (!this.disabled) {
    this.disabled = true;
    var that = this;
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/tweets",
      data: $el.serializeJSON(),
      success: function (data) {
        console.log(data)
        console.log(data.user)


        that.diabled = false;
        $el.find("textarea").val("");
        $el.find("select").prop('selectedIndex',0);
        $el.find("strong.chars-left").html("140 characters remains...");

        var rawTemplate = $('#tweet-id').html();
        var templateFunc = _.template(rawTemplate);
        var stringHTML = templateFunc({tweet: data});
        $("#feed").prepend(stringHTML);
      }
    });
  }
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose($(this));
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});