//Initialize firebase

const config = {

}

firebase.initializeApp(config);

//Variable for the database
const dataref = firebase.database();

//Initial values
var name = "";
var phone = "";
var email = "";
var loca = "";
var comment = "";

//capture button click
$("#add-user").on("click", function(event) {
  event.preventDefault();
  
  //storing and retrieving users
  name = $("#name-input").val().trim();
  phone = $("#phone-input").val().trim();
  email = $("#email-input").val().trim();
  loca = $("#location-input").val().trim();
  comment = $("#comment-input").val().trim();

  //Push to firebase
  dataref.ref().push({
    name: name,
    phone: phone,
    email: email,
    loca: loca,
    comment: comment,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
});
  var playerCount = 0;
  //Firebase watcher and initial loader
  dataref.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    playerCount++;

    //Full member list
    $(".full-member-list").append("<div class='well'><span class='member-name'> " + 
    "<span class='member text-warning'>"+ "Player " + playerCount + "</span> " + "  @" + childSnapshot.val().name + " "
      + "</span><span class='member-dateAdded'>" 
      + "<span class='member text-warning'>" + "Note :  #"+ "</span>" + childSnapshot.val().comment+ "</span></div>")
  }, function(errorObject) {
       console.log("Error: " + errorObject.code);
     }
  );
