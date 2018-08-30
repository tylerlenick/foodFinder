// PAGE FUNCTIONS
$(document).ready(function() {
  // SIDENAV
  $(".sidenav").sidenav();
  // MODAL
  $(".modal").modal();
  // PARALLAX
  $(".parallax").parallax();

  $("#my-profile").on("click", function() {
    console.log("Going to user profile");
    $.ajax({
      type: "GET",
      url: "/api/restaurants",
      success: function(result) {
        $("#div1").html(result);
      }
    });
  });
});
