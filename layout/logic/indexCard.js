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
};

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

    //Full member list add as many as you want
    $(".full-member-list").append("<div class='well'><span class='member-name'> " + 
     "<span class='member text-warning'>"+ "Player " + playerCount + "</span> " + "  @" 
     + childSnapshot.val().name + " " + "</span>" + "<br>" +
     "<span class='member text-danger' placeholder='good, bad, ugly ..'>" + "Note :  #" 
     + childSnapshot.val().comment+ "</span><hr></div>");

     $("#name-input").val(" ");
     $("#phone-input").val("");
     $("#email-input").val("");
     $("#location-input").val("");
     $("#comment-input").val("");

  }, function(errorObject) {
       console.log("Error: " + errorObject.code);
     }
  );