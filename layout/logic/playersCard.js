//Initialize firebase

const config = {
  apiKey: "AIzaSyDOB8s4ge4SI1FejaQHDgfWD_QggbDjmlo",
  authDomain: "settle-34657.firebaseapp.com",
  databaseURL: "https://settle-34657.firebaseio.com",
  projectId: "settle-34657",
  storageBucket: "settle-34657.appspot.com",
  messagingSenderId: "961536366124",
  appId: "1:961536366124:web:c50f42e52b048c1351e389",
  measurementId: "G-PEGVT2R2ER"
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

    //Full member list in select box
    $("select.players-select").append(
      "<option class='well'><span class='member-name'> " + "Player " + playerCount + "</span> " + 
      "<span class='member'>" + "  @" + childSnapshot.val().name + " " + 
      "</span><hr></option>"
    );

        //Full member list in select box
        $(".member-list").append(
          "<div class='well'><span class='member-name'> " + "Player " + playerCount + "</span> " + 
          "<span class='member text-warning'>" + "  @" + childSnapshot.val().name + " " + 
          "</span><span class='score text-success'>" + " score : " + score + "</span><hr></div>"
        );

  }, function(errorObject) {
       console.log("Error: " + errorObject.code);
     }
  );

    //alternate
    $(document).on("change", ".players-select", function() {
      $(".track-player").html(this).find("option:selected").val();
    });

  //TO DO LOAD THE PLAYERS NAMES etc
  