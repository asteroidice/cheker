var ref = new Firebase("https://cheker.firebaseio.com/");

$(document).ready(init);

$('#newDes').bind('keyup', function(e) {
    if ( e.keyCode === 13 )
      add();
});

function init() {
  // Retrieve new posts as they are added to our database
  ref.on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    $('#checklist').append('<h6><input id=' + snapshot.key() + ' type="checkbox"><label class="Checklist" for=' + snapshot.key() + '>' + newPost.des + '</label><button id="'+ snapshot.key() + 'Edit" style="color:grey;display:none;">edit</button>  <button id="'+ snapshot.key() + 'Del" style="color:red;display:none;">delete</button></h6>');
    document.getElementById("" + snapshot.key()).checked = newPost.check;
    $("#" + snapshot.key()).click(function() {
      update(snapshot.key())
    });
    $("#" + snapshot.key() + "Del").click(function() {
      deleteCheck(snapshot.key());
    });
    $("#" + snapshot.key() + "Edit").click(function() {
      editChek(snapshot.key());
    });
    $("#" + snapshot.key()).parent().hover(
      function () {
        $("#" + snapshot.key() + "Del,#" + snapshot.key() + "Edit").show();
      },
      function () {
        $("#" + snapshot.key() + "Del,#" + snapshot.key() + "Edit").hide();
      }
    );


  });
}

/*function login() {
  myFirebaseRef.createUser({
  email    : ,
  password : "correcthorsebatterystaple"
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});
init();
}*/

function deleteCheck(id) {
  ref.child(id).set({});
  $("#"+ id).parent().remove();
}

function update(id) {
  if($('#' + id).is(":checked")) {
    ref.child(id).update({
      check: true
    });
  } else {
    ref.child(id).update({
      check: false
    });
  }
}

function editChek(id) {
  var content = $("#"+id).parent().children(".Checklist").html();
  $("#"+id).parent().children(".Checklist").hide().after("<input type='text'></input><button>done</button>  ");
  $("#"+id).parent().children(".Edit").hide()
  $("#"+id).parent().children("input").val(content);
}

function add() {
  ref.push({
    des: $("#newDes").val(),
    check: false
  },function(error) {
  if (error) {
    alert("Data could not be saved." + error);
  } else {
    $("#newDes").val('');
  }
});

}
