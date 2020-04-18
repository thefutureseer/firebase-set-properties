//Initialize firebase

const config = {

}

firebase.initializeApp(config);

//Variable for the database
const dataref = firebase.database();

//Initial values
//Top of card show loca
var loca = "";

var name = "";
var score = "";
var comment = "";
var phone = "";



//capture button click
$("#payer-user").on("click", function(event) {
  event.preventDefault();
  
  //storing and retrieving scores & comments
  score = $("#score-input").val().trim();
  comment = $("#comment-input").val().trim();

  //Push to firebase
  dataref.ref().push({
    score: score,
    comment: comment,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
});

  var playerCount = 0;
  //Firebase watcher and initial load to Players card
  dataref.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
    //Add location to top
    $(".location").text("Todays location: " + childSnapshot.val().loca);

    playerCount++;

    //Full member list add as many as you want
    $("select.players-select, h2.member-list").append(
      "<option class='well'><span class='member-name'> " + "Player " + playerCount + "</span> " + 
      "<span class='member text-warning'>" + "  @" + childSnapshot.val().name + " " + 
      "</span><span>"+ score + "</span><hr></option>"
    );
  }, function(errorObject) {
       console.log("Error: " + errorObject.code);
     }
  );

    //Grab current player from drop down put info in card 
    // $(document).on("change", ".players-select", function() {
    //   alert($(this).find("option:selected").text());
    // });

    //alternate
    $(document).on("change", ".players-select", function() {
      $(".track-player").html(this).find("option:selected").val();
    });

  //TO DO LOAD THE PLAYERS NAMES etc
  