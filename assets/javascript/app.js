// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCY7FgHIfLvs0qC3oayCjCGpo6FoJH_pW8",
  authDomain: "hw-time-table.firebaseapp.com",
  databaseURL: "https://hw-time-table.firebaseio.com",
  projectId: "hw-time-table",
  storageBucket: "hw-time-table.appspot.com",
  messagingSenderId: "861438962218",
  appId: "1:861438962218:web:16a2b53d637799f3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("firebase intialized")
var database = firebase.database();


var addTrain = function() {
  
  var trainName = $("#input-name").val().trim();
  var trainDestination = $('#input-destination').val().trim();
  var trainFirstTrip = $('#input-first-trip').val().trim();
  var trainFrequency = $('#input-frequency').val().trim();
  
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrip: trainFirstTrip,
    frequency: trainFrequency
  };
  
  database.ref().push(newTrain);
  
  console.log("---------New Train---------")
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrip);
  console.log(newTrain.frequency);
  
  // TODO: Add success message that is not an alert box
  
  $("#input-name").val("");
  $('#input-destination').val("");
  $('#input-first-trip').val("");
  $('#input-frequency').val("");
};

$(document).ready(function() {
  // Add event handler to the button
  $('#add-train-btn').on('click' , function(event) {
    event.preventDefault();
    console.log("Click!");
    addTrain();
  });
});