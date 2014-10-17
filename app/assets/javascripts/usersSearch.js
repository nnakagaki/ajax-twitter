$.UsersSearch = function ($el) {
  var that = this;
  $el.on('input', 'input', function(event){
    event.preventDefault();
    that.handleInput($el);
  });
};
$.UsersSearch.prototype.handleInput = function ($el) {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/users/search",
    data: {query: $el.find("input").val()},
    success: function(data){
      console.log(data)
      $el.find("ul").empty();
      data.forEach(function(user) {
        $el.find("ul").append("<li><a href='/users/"+ user.id + "'>" + user.username + "</a>&nbsp&nbsp&nbsp&nbsp&nbsp<button data-user-id='" +  user.id + "' data-initial-follow-state='" + user.followed + "' class='follow-toggle'></button></li>")
      });
      $("div.users-search ul button").followToggle();
    }
  });
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch($(this));
  });
};

$(function () {
  $("div.users-search").usersSearch();
});