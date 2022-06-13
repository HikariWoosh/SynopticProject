//Latitude/Longitude set up, location set to general area of Norwich for development purposes
window.lat = 52.629187161600164;
window.lng = 1.2970822386845213;

//Function to obtain device locaion using HTML5 location API
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updatePosition);
  }

  return null;
};

//Function to update browser location variables
function updatePosition(position) {
  if (position) {
    window.lat = position.coords.latitude;
    window.lng = position.coords.longitude;
  }
}

//Interval timer to periodically obtain the device location
setInterval(function(){updatePosition(getLocation());}, 5000);

//Function to return location object (latitude and longitude)
function currentLocation() {
  return {lat:window.lat, lng:window.lng};
};

/*
Define map and variables to hold the map and marker objects.

Initialise the calback that google maps JS api will call once its ready to load
*/
var map;
var mark;

var initialize = function() {
  map  = new google.maps.Map(document.getElementById('map-canvas'), {center:{lat:lat,lng:lng},zoom:12});
  mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});
};

window.initialize = initialize;

/*
Define a redraw event handler, this will be called whenever we get a change in position

First, set the latitude and longitude to the new values from the message received

Then invoke the appropriate methods on the map and marker objects to update position and recentre map.
*/

var redraw = function(payload) {
  lat = payload.message.lat;
  lng = payload.message.lng;

  map.setCenter({lat:lat, lng:lng, alt:0});
  mark.setPosition({lat:lat, lng:lng, alt:0});
};

/*
Now connect the map to PubNub.

Initialise the PubNub real-time data streaming functionality

Define channel name with expected channel that new position updates will arrive on

Instruct the PubNub library to subscribe to the channel
Attach redraw function as a listener to incoming events
*/

var pnChannel = "map-channel";

var pubnub = new PubNub({
  publishKey:   'pub-c-7b0a63d1-1d81-46c8-9df5-e0cd4e9112a8',
  subscribeKey: 'sub-c-2eb97cc0-dbd9-4009-9919-969e9c56f046'
});

pubnub.subscribe({channels: [pnChannel]});
pubnub.addListener({message:redraw});

/*
  JS interval timer, published new positions based on the current time.

  Every 500 milliseconds, anonymous callback function is invoked.
  This publishes a new latitude+longitude object
*/

setInterval(function() {
  pubnub.publish({channel:pnChannel, message:currentLocation()});
}, 5000);

//Draw circle

var antennasCircle;

function markProhibited(){
    antennasCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map,
    center: {
      lat: 52.629187161600164,
      lng: 1.2970822386845213
    },
    radius: 10 * 100
  });
  map.fitBounds(antennasCircle.getBounds());
}

window.onload = function(){
  markProhibited();
};

function errorMsg() {
  let status = document.querySelector("#statusMsg");
  status.classList.add("error");
  status.innerHTML = "You have entered a prohibted area!";
}

function checkInProhibted(){
  var distance = google.maps.geometry.spherical.computeDistanceBetween(antennasCircle.getCenter(), mark.getPosition());
  if(distance <= antennasCircle.getRadius()){
    errorMsg();
  }
}


window.setInterval(function () {
  checkInProhibted();
}, 3000);
