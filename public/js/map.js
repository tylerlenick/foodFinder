//Snazzy maps styling array
var snazzy = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36
      },
      {
        color: "#000000"
      },
      {
        lightness: 40
      }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#000000"
      },
      {
        lightness: 16
      }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 20
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 17
      },
      {
        weight: 1.2
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 20
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 21
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 17
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 29
      },
      {
        weight: 0.2
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 18
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 16
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 19
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 17
      }
    ]
  }
];

function initMap() {

  var userLocation;
  var restaurant = [];
  var userlatlng = [];
  var restlatlng = [];
  var restlocation;

  //Get custom geolocation through html5 for map settings below
  function getLocation() {
    if (navigator.geolocation) {
      // Nest showPosition inside getLocation
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  // Show position function renders user's location too nested Google Maps HTTP requests
  function showPosition(position) {
    // user's current latitude and longitude
    var lati = position.coords.latitude;
    var long = position.coords.longitude;

    // push user's position into global userlatlng array for reference outside initMap
    userlatlng.push(lati, long);
    // userLocation object for Maps renderer
    userLocation = { lat: lati, lng: long };

    // =================== YELP ================= //

    // Client side POST request to stored back end API built for App
    $.post("/api/yelp", { latitude: lati, longitude: long }, function(data) {
      //Push a random retaurant into the restaurant array
      // Data returns an array of 10 restaurant objects
      // create a yelpSearch variable that grabs a random restaurant from data array
      var yelpSearch = data[Math.floor(Math.random() * data.length)];
      console.log(yelpSearch);
      restaurant.push(yelpSearch);
      //Push the restaurant coordintes into the restlatlng array
      restlatlng.push(
        yelpSearch.coordinates.latitude,
        yelpSearch.coordinates.longitude
      );
      //Define the restaurant location as an object with the coordinates
      var restLocation = {
        lat: yelpSearch.coordinates.latitude,
        lng: yelpSearch.coordinates.longitude
      };

      // DISPLAY RESTAURANT DATA ON PAGE
      $("#rest-name").html(yelpSearch.name);
      $("#rest-city").html(yelpSearch.location.city);
      //Breakup the titles and stats to style them
      //Rating
      var yelpRating = $("<p>").attr("class", "ratingStat").text(yelpSearch.rating);
      // var ratingTitle = $("<p>").attr("class", "rating-title");
      $("#rest-rating").append(yelpRating);
      //Price
      var yelpPrice = $("<p>").attr("class", "ratingStat").text(yelpSearch.price);
      $("#rest-price").append(yelpPrice);
      //ReviewCount
      var yelpReview = $("<p>").attr("class", "ratingStat").text(yelpSearch.review_count);
      $("#rest-review").append(yelpReview);
      //Load yelp image
      $("#rest-image").attr("src", yelpSearch.image_url);
      //Restaurant OPEN or CLOSED
      if (yelpSearch.is_closed === false) {
        var open = $("<p>").attr("class", "statusOpen").text("open");
        var currently = $("<p>").attr("class", "status-title").text("currently");
        $("#rest-open").append(currently);
        $("#rest-open").append(open);
      } else {
        var closed = $("<p>").attr("class", "statusClosed").text("closed");
        var currently = $("<p>").attr("class", "status-title").text("currently");
        $("#rest-open").append(currently);
        $("#rest-open").append(open);
      }
      //Phone # Styling
      var phone = $("<p>").attr("class", "status-title").text("phone");
      var yelpPhone = $("<p>").attr("class", "yelpPhone").text(yelpSearch.display_phone);
      $("#rest-phone").append(phone);
      $("#rest-phone").append(yelpPhone);
      //Populates the restaurant category type regardless of how many there are
      console.log(yelpSearch.categories);
      for (var i = 0; i < yelpSearch.categories.length; i++) {
        var badgeSpan = $("<div>").attr("class", "new badge");
        var badgeText = $("<p>").attr("class", "p-small");
        var badgeType = yelpSearch.categories[i].alias;
        badgeText.append(badgeType);
        badgeSpan.append(badgeText);
        //Targets the holder div where the badges go
        $("#rest-type").append(badgeSpan);
        console.log(badgeSpan);
        console.log(badgeText);
        console.log(badgeType);
      }
      //Address breakdown
      var addressTitle = $("<p>").attr("class", "status-title").text("Address");
      var address1 = $("<h5>").text(yelpSearch.location.display_address[0]);
      var address2 = $("<h5>").text(yelpSearch.location.display_address[1]);
      $("#rest-address").html(addressTitle);
      $("#rest-address").append(address1);
      $("#rest-address").append(address2);
      
      //Button event handler
      $("#tryLater").on("click", function (event) {
        event.preventDefault();
        console.log("Restaurant added to database.");
        var toastHTML = "<h6 class='teal z-depth-5 center-align right' style='padding:15px'>Restaurant added to User Profile.</h6>"
        M.toast({html: toastHTML}, {displayLength: 4000})
        $.post("/restaurants", yelpSearch, function () {
          console.log("Restaurant added to database.");
        });
      });

      //Initialize google map
      map = new google.maps.Map(document.getElementById("map"), {
        center: restLocation,
        disableDefaultUI: true,
        styles: snazzy,
        zoom: 10
        //   gestureHandling: "none"
      });

      //Enable css styling for the google markers
      var myoverlay = new google.maps.OverlayView();
      myoverlay.draw = function() {
        //this assigns an id to the markerlayer Pane, so it can be referenced by CSS
        this.getPanes().markerLayer.id = "markerLayer";
      };
      myoverlay.setMap(map);

      // Google directions api
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route(
          {
            origin: userlatlng.toString(),
            destination: restlatlng.toString(),
            travelMode: "DRIVING"
          },
          function(response, status) {
            if (status === "OK") {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response,
                suppressMarkers: true
              });
              var leg = response.routes[0].legs[0];
              makeMarker(leg.start_location, icons.start, "title", map);
              makeMarker(leg.end_location, icons.end, "title", map);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }

      // Set the marker locations
      function makeMarker(position, icon, title, map) {
        new google.maps.Marker({
          position: position,
          map: map,
          icon: icon,
          title: title
        });
      }

      //Stylize the icons
      var icons = {
        start: new google.maps.MarkerImage(
          // URL
          "../images/Logo-Export/FF-User-Icon.png",
          // (width,height)
          new google.maps.Size(62, 61),
          // The origin point (x,y)
          new google.maps.Point(0, 0),
          // The anchor point (x,y)
          new google.maps.Point(22, 32)
        ),
        end: new google.maps.MarkerImage(
          // URL
          "../images/Logo-Export/Food-Finder-Map-Marker.png",
          // (width,height)
          new google.maps.Size(51, 69),
          // The origin point (x,y)
          new google.maps.Point(0, 0),
          // The anchor point (x,y)
          new google.maps.Point(22, 32)
        )
      };

      calculateAndDisplayRoute(directionsService, directionsDisplay);
      directionsDisplay.setMap(map);
    });
  }

  // Call getLocation which fires all nested functions
  getLocation();

  $("#refresh-location").on("click", function () {

    initMap();
    console.log("Generating new restaurant.");
  });
}
console.log(initMap);