var trainData = new Firebase('https://train-tracker-66cbf.firebaseio.com');

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
	var firstTrain = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("HH:mm");
	var trainFrequency = $("#frequencyInput").val().trim();

  // // Get current time to calc minutes away
  var currentTime = moment().format("HH:mm");
  console.log("Current Time: " + currentTime);

  // calc difference in times
  var diffTime = moment().diff(moment(firstTrain), "minutes");
  console.log("Difference in time: " + diffTime);

  // Time apart
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  // Minutes Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("Minutes Till Train: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));

  var newTrain = {
		name: trainName,
		destination: trainDestination,
		start: firstTrain,
		frequency: trainFrequency
	};

  // Upload train data to database
  trainData.push(newTrain);

  // alert successful add
  swal({title: "Chooo Choo!", text: "You have successfully added a train!", type: "success", confirmButtonColor: "#2ecc71",   confirmButtonText: "Okay", closeOnConfirm: true });

  clearInputs();
	return false;

  });

  trainData.on("child_added", function(snapshot, prevChildKey){

	console.log(snapshot.val());

	// Store everything into a variable.
	var trainName = snapshot.val().name;
	var trainDestination = snapshot.val().destination;
	var firstTrain = snapshot.val().start;
	var trainFrequency = snapshot.val().frequency;

  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + firstTrain + "</td></tr>");

  });
