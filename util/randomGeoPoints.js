function randomLocaiton(min_distance, max_distance, lat1, lon1) {
  var lat = (lat1 * Math.PI) / 180;
  var lon = (lon1 * Math.PI) / 180;
  var earth_radius = 6371000.0;
  var distance = Math.sqrt(
    Math.random() * (Math.pow(max_distance, 2) - Math.pow(min_distance, 2)) +
      Math.pow(min_distance, 2)
  );

  var delta_lat = (Math.cos(Math.random() * Math.PI) * distance) / earth_radius;
  console.log("delta_lat " + delta_lat);
  var sign = Math.floor(Math.random() * 2) * 2 - 1;
  var delta_lon =
    sign *
    Math.acos(
      (Math.cos(distance / earth_radius) - Math.cos(delta_lat)) /
        (Math.cos(lat) * Math.cos(delta_lat + lat)) +
        1
    );
  console.log("delta_lon " + delta_lon);

  var resultLat = ((lat + delta_lat) * 180) / Math.PI;
  var resultLon = ((lon + delta_lon) * 180) / Math.PI;

  console.log("resultLat " + resultLat);
  console.log("resultLon " + resultLon);
}

randomLocaiton(20000, 32000, 40.758, -73.9855);
