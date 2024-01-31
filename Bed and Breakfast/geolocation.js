// https://www.freecodecamp.org/news/how-to-get-user-location-with-javascript-geolocation-api/
// https://www.youtube.com/watch?v=916M64DuRnk

function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
     
      var userLat = position.coords.latitude;
      var userLng = position.coords.longitude;
  
      
      var bbLat = 52.1387608;
      var bbLng = -10.270535999999993;
  
      
      var distance = calculateDistance(userLat, userLng, bbLat, bbLng);
  
     
      var distanceElement = document.getElementById("distance");
      distanceElement.innerHTML = "You are " + distance + " km away from our bed and breakfast in Dingle County Kerry.";
    });
  }
  
  function calculateDistance(userLat, userLng, bbLat, bbLng) {
    var R = 6371; 
    var dLat = deg2rad(bbLat - userLat);  
    var dLng = deg2rad(bbLng - userLng); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(bbLat)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return d.toFixed(2); 
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
