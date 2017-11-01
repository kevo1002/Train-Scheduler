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
  });
