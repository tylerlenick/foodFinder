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

var userLocation;
var restaurant = [];
var latlng = [];

function initMap() {
  //Get custom geolocation through html5 for map settings below
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  getLocation();

  function showPosition(position) {
    var lati = position.coords.latitude;
    var long = position.coords.longitude;

    latlng.push(lati, long);
    userLocation = { lat: lati, lng: long };

    //Initialize google map with styling & marker
    map = new google.maps.Map(document.getElementById("map"), {
      center: userLocation,
      disableDefaultUI: true,
      styles: snazzy,
      zoom: 16
      //   gestureHandling: "none"
    });

    // Displaying the directions on map
    // directionsDisplay.setMap(map);

    var fFMapIcon = "../images/Logo-Export/Food-Finder-Map-Marker.png";
    var marker = new google.maps.Marker({
      position: userLocation,
      map: map,
      icon: fFMapIcon,
      optimized: false
    });

    // GOOGLE DIRECTIONS API

    // var directionsService = new google.maps.DirectionsService;
    // var directionsDisplay = new google.maps.DirectionsRenderer;

    //-----------------------------
    //Enable css styling for the google marker
    var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function() {
      //this assigns an id to the markerlayer Pane, so it can be referenced by CSS
      this.getPanes().markerLayer.id = "markerLayer";
    };
    myoverlay.setMap(map);
    //-----------------------------

    console.log(marker);

    // =================== YELP ================= //

    $.post("/api/yelp", { latitude: lati, longitude: long }, function(data) {
      // console.log(data);
      var yelpSearch = data[Math.floor(Math.random() * data.length)];
      restaurant.push(yelpSearch);
      console.log(yelpSearch);

      // DISPLAY RESTAURANT DATA ON PAGE

      $("#rest-name").html(yelpSearch.name);
      $("#rest-city").html(yelpSearch.location.city);
      $("#rest-rating").html("Rating: " + yelpSearch.rating);
      $("#rest-price").html("Price: " + yelpSearch.price);
      $("#rest-review").html("Review Count: " + yelpSearch.review_count);
      $("#rest-image").attr("src", yelpSearch.image_url);
      if (yelpSearch.is_closed === false) {
        $("#rest-open").html("Currently: OPEN");
      } else {
        $("#rest-open").html("Currently: CLOSED");
      }
      $("#rest-phone").html("Phone:" + yelpSearch.display_phone);
      $("#rest-type-1").html(yelpSearch.categories[0].title);
      $("#rest-type-2").html(yelpSearch.categories[1].title);
      $("#rest-address").html(yelpSearch.location.display_address);
    });
  }
  console.log(latlng);
  console.log(restaurant);
  // ======================GOOGLE DIRECTIONS======================= //

  // function googleDirections(restaurant) {
  //   console.log("test line 253");
  //   axios
  //     .get("https://maps.googleapis.com/maps/api/directions/json?", {
  //       params: {
  //         origin: latlng,
  //         destination: restaurant.location,
  //         key: "AIzaSyCrV31VZyCCvCWc5a9Mx4E-JFr4ERsP-Ek"
  //       }
  //     })
  //     .then(function(response) {
  //       console.log(response);
  //     });
  // }

  // googleDirections(restaurant);
}
console.log(initMap);
