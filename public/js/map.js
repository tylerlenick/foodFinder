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

    $.post("/map", {
      userLocation: {
        latitude: lati,
        longitude: long
      }
    });

    userLocation = { lat: lati, lng: long };

    console.log(userLocation);

    //Initialize google map with styling & marker
    map = new google.maps.Map(document.getElementById("map"), {
      center: userLocation,
      disableDefaultUI: true,
      styles: snazzy,
      zoom: 14
      //   gestureHandling: "none"
    });

    var fFMapIcon = "../images/Logo-Export/Food-Finder-Map-Marker.png";
    var marker = new google.maps.Marker({
      position: userLocation,
      map: map,
      icon: fFMapIcon,
      optimized: false
    });

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
  }
}
console.log(initMap);
// ==================== YELP ================ //

// =================== ZOMATO =============== //
