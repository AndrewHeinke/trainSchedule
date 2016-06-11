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

	// Store everything into a variable.
	var trainName = snapshot.val().name;
	var trainDestination = snapshot.val().destination;
	var firstTrain = snapshot.val().start;
	var trainFrequency = snapshot.val().frequency;

  var firstMoment = moment(firstTrain, "HH:mm").subtract(1, "years");

  // calc difference in times
  var diffTime = moment().diff(moment(firstMoment), "minutes");

  // Time apart
  var tRemainder = diffTime % trainFrequency;

  // Minutes Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  // Append information to html table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
