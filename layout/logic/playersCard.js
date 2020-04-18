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
  //Firebase watcher and initial loader
  dataref.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    playerCount++;

    //Full member list add as many as you want
    $(".players-select").append(
      "<option class='well'><span class='member-name'> " + "<span class='member text-warning'>"
      + "Player " + playerCount + "</span> " + "  @" + childSnapshot.val().name + " " + "</span><hr></option>"
    );
  }, function(errorObject) {
       console.log("Error: " + errorObject.code);
     }
  );
