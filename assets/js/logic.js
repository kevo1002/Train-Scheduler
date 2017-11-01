// Initialize Firebase
var config = {
  apiKey: "AIzaSyBMR4S-lIuo7akZ8bkUeH81Fq2MMiawKSM",
  authDomain: "train-scheduler-2fc2c.firebaseapp.com",
  databaseURL: "https://train-scheduler-2fc2c.firebaseio.com",
  projectId: "train-scheduler-2fc2c",
  storageBucket: "train-scheduler-2fc2c.appspot.com",
  messagingSenderId: "1064217887876"
};
firebase.initializeApp(config);
var trainData = firebase.database();

  // 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI (What's a GUI? ))
  // 3. Button for adding trains
  $("#add-train-btn").on("click", function() {

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainUnix = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" ojbect for holding train data
    var newTrain = {

      name: trainName,
      destination: destination,
      firstTrain: firstTrainUnix,
      frequency: frequency
    };

    // Uploads train data to the database
    trainData.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(firstTrainUnix);
    console.log(newTrain.frequency);

    // Alert
    alert("train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    // Determine when the next train arrives.
    return false;
  });

  // 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  trainData.ref().on("child_added", function(childSnapshot, prevChildkey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    var tMinutes = tFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the current time
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    console.log(tMinutes);
    console.log(tArrival);
    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });
