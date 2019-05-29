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

var database = firebase.database();

// var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");

var addTrain = function() {
  
  var trainName = $('#input-name').val().trim();
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
  
  database.ref().on('child_added' , function(childSnapshot) {
    console.log(childSnapshot.val());
    
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTrip = childSnapshot.val().firstTrip
    var trainFrequency = childSnapshot.val().frequency;

    var trainTime = moment(trainFirstTrip , 'HH:mm').subtract(1, 'years').format('HH:mm');

    var deltaT = moment().diff(moment(trainTime , 'HH:mm') , 'minutes');
    var remaining = deltaT % trainFrequency;
    var timeUntil = trainFrequency - remaining;
    var nextTrain = moment().add(timeUntil , 'minutes').format('HH:mm');

    console.log("---------Train Data---------")
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
    console.log(nextTrain);
    console.log(timeUntil);

    var lineName = $('<td/>').text(trainName);
    var serviceTo = $('<td/>').text(trainDestination);
    var runningEvery = $('<td/>').text(trainFrequency + "min");
    var nextArrival = $('<td/>').text(nextTrain + "hrs");
    var eta = $('<td/>').text(timeUntil + "mins");

    var newRow = $('<tr/>').append(lineName , serviceTo , runningEvery , nextArrival , eta);
    
    $('#schedule-table > tbody').append(newRow);

  })

});