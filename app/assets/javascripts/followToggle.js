$.FollowToggle = function ($el) {
  this.handleClick($el);
  this.render($el);
};

$.FollowToggle.prototype.render = function ($el) {
  this.followState = $el.attr("data-initial-follow-state");
  this.userId = $el.attr("data-user-id");
  if (this.followState === "true") {
    $el.html("unfollow");
  } else {
    $el.empty();
    $el.append("follow");
  }
};

$.FollowToggle.prototype.handleClick = function ($el) {
  this.followState = $el.attr("data-initial-follow-state");
  this.userId = $el.attr("data-user-id");
  var that = this;
  this.disabled = false;
  $el.on('click', function(event){
    console.log(that.followState)
    if (!that.disabled) {
      that.disabled = true;
      event.preventDefault();

      var type = that.followState === "true" ? "DELETE" : "POST";
      var followed = that.followState === "true" ? "false" : "true";
      $.ajax({
        type: type,
        dataType: "json",
        url: "/users/" + that.userId + "/follow",
        success: function(data){
          $el.attr("data-initial-follow-state", followed)
          that.render($el);
          that.disabled = false;
        }
      });

    }
  });
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle($(this));
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});