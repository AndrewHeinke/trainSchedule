var trainData = new Firebase("https://train-tracker-66cbf.firebaseio.com/");


// Clears all form input fields
function clearInputs() {
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#frequencyInput").val("");
}


// Button for adding trains
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var firstTrain = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("HHmm");
	var trainFrequency = $("#frequencyInput").val().trim();

  // Get current time to calc minutes away
  var timeNow = moment().format("HHmm");


  // Object to hold train data
  var newTrain = {
		name: trainName,
		destination: trainDestination,
		start: firstTrain,
		frequency: trainFrequency,
    minsAway: minutesAway
	};

  // Upload train data to database
  trainData.push(newTrain);

  console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency);
  console.log(newTrain.minsAway);

  swal({title: "Chooo Choo!",   text: "You have successfully added a train!",   type: "success", confirmButtonColor: "#2ecc71",   confirmButtonText: "Okay", closeOnConfirm: true });

  clearInputs();
	return false;

  });

  trainData.on("child_added", function(snapshot, prevChildKey){

	console.log(snapshot.val());

	// Store everything into a variable.
	var trainName = snapshot.val().name;
	var trainDestination = snapshot.val().role;
	var firstTrain = snapshot.val().start;
	var trainFrequency = snapshot.val().rate;
  var minutesAway = snapshot.val().rate;

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + firstTrain + "</td><td>" + trainFrequency + "</td><td>" + minutesAway + "</td>");

  });
