
Parse.initialize("6MQR8G7nxeInwGvZ0Q8wg33SFJEb53pDx8uD2Xvc", "N5tGk2hvHE3ScR4IsqUt9COpPPbgRc1r9E0b8c4h");

$(document).ready(function(){

	setTimeout(function(){
		$('body').ready(function (){
			$('#loader').toggle( "bounce", { times: 3 }, 2100 );
		});
	},1000);

	setTimeout(
		function(){
			$('body').ready(function (){
				$('#login').fadeIn('slow');
			});
		},3500);

	function animate(oldPage,newPage) {
		setTimeout(
			function(){
				$('body').ready(function (){
					$(oldPage).fadeOut(700);
				});
			},700);

		setTimeout(
			function(){
				$('body').ready(function(){
					$(newPage).fadeIn('slow');
				});
			},1500);
	}

	
	$('h5').click(function(){
		//signUp();
		animate('#login','#signUp');
	});

	$('h6').click(function(){
		//backto();
		animate('#signUp','#login');
	});

	$('button').fadeTo( 200 ,0.7);

	$('button').mouseenter(function(){
        $(this).fadeTo('fast', 1);
    });

    $('button').mouseleave(function(){
        $(this).fadeTo('fast', 0.7);
    });

	$('#loginbtn').click(function(){
		logon();
	});

	$('#signUpbtn').click(function(){
		sign();
	});

    $('#login').draggable();
    $('#signUp').draggable();
    $('#big').draggable();

});


function login1 (username) {
	
	setTimeout(function(){$('body').ready(function (){$('#login').fadeOut(500);});},1000);

	setTimeout(function(){$('body').ready(function (){$('#big').fadeIn('slow');});},2000);

	setTimeout(
		function(){
			$('body').ready(function (){
				$('#header').fadeIn('slow');
			});
		},3000);

	/*var currentUser = Parse.User.current();
	if (currentUser) {
	    $("#userr").append(username);
	}*/
	$("#userr").text(username);
}

// Get values
var $username = $("#username"),
    $password = $("#password"),

    $newName = $('#newName'),
    $firstPass = $('#newPass'),
    $secondPass = $('#repeat')
    $email = $('#email');

var username = $username.val(),
    password = $password.val(),

    newName = $newName.val(),
    firstPass = $firstPass.val(),
    secondPass = $secondPass.val(),
    email = $email.val();

var compare = function(first, second){

	this.first = first;
	this.second = second;

	this.result = function(){
		if(this.first === this.second){
			result = this.first;
		}
		else{
			result = "error";
		}
	}
};

var newPerson = function(name, pass, email){
	this.username = name;
	this.password = pass;
	this.email = email;
};

var comparePass = new compare(firstPass, secondPass);


//Logon
function logon() {
	var $username = $("#username"),
    	$password = $("#password");
	
	var username = $username.val(),
    	password = $password.val();

	Parse.User.logIn(username, password, {
		  success: function(user) {
		    login1(username);
		    console.log('Logged in');
		  },

		  error: function(user, error) {
		 	function error() {
				$('#username').addClass('error');

				$('#username').click(function(){
					$(this).removeClass('error');
				});

				$('#password').addClass('error');

				$('#password').click(function(){
					$(this).removeClass('error');
				});

				$( "#login" ).effect("shake");

			};
		    error();
		  }
		});
};

function sign() {

	var	$newName = $('#newName'),
    	$firstPass = $('#newPass'),
    	$secondPass = $('#repeat')
    	$email = $('#email');
	
	var newName = $newName.val(),
    	firstPass = $firstPass.val(),
    	secondPass = $secondPass.val(),
    	email = $email.val();

    console.log(newName + firstPass + secondPass + email);

    // Validate
		
		if (newName.length == 0) {
			
			alert("Type in your new Username");
		}

		else if (firstPass.length == 0) {
			alert("Type in your new Username");
		}

		else if (email.length == 0) {
			alert("Type in your email");
		}

		/*else if (firstPass === secondPass) {
			//alert("Wrong username or password! Please try again.");
			alert("Password mismatch!");
		}*/

		else {
			sss();
		}

		function sss () {

			var user = new Parse.User();

			user.set("username", newName);
			user.set("password", secondPass);
			user.set("email", email);
			
			 
			user.signUp(null, {
			  success: function(user) {
			    
			    alert("You have successfully signed up now! Go back and login with your new Username and Password!");
			    
			    sendEmail(newName, email);
			    
			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		}

	/*
		var query = new Parse.Query(Parse.User);
		query.equalTo(userame, newName);  // find all the women
		query.find({
		  success: function(women) {
		    chosenName = newUsername;
		  },
		  error: function(){
		  	alert('That username has already been taken!');
		  }
		});
	*/
};



YUI().use('node', function(Y) {
	
	var ListItem, 
	query,
	noTasksMessage = Y.one('#no-incomplete-message'),
	submitBtn = Y.one("#list-item-submit"),
	incompleteItemList = Y.one('#incomplete-items'),
	completeItemList = Y.one('#complete-items'),
	input = Y.one("#list-input");
	
	

	/*signUp.on('click', function(e){

		Parse.User.newserr()= {

		}

		var query = new Parse.Query(Parse.User);
		query.equalTo(userame, chosenName);  // find all the women
		query.find({
		  success: function(women) {
		    chosenName = newUsername;
		  },
		  error: function(){
		  	alert('That username has already been taken!');
		  }
		});


	});*/

	//Handle Click Event
	submitBtn.on('click', function(e) {
		
		//Save the current Todo
		var text = Y.one('#list-input').get('value');
		var ListItem = Parse.Object.extend("ListItem");
		var listItem = new ListItem();

		listItem.set("content", text);
		listItem.set("isComplete", false);
		
		//Once it is saved, show it in the list of todo's.
		listItem.save(null, {
		  success: function(item) {
				noTasksMessage.addClass('hidden');
		    var content = Y.Lang.sub(Y.one('#todo-items-template').getHTML(), {
					content: item.get('content'),
					id: item.id,
					isComplete: item.get('isComplete')
				});
				incompleteItemList.append(content);
				input.set('value', '').focus();
		  },
		  error: function(gameScore, error) {
				alert("Error when saving Todos: " + error.code + " " + error.message);
		  }
		});
	});
	
	
	
	//Get 10 most recent incomplete Todos.
	ListItem = Parse.Object.extend("ListItem");
	query = new Parse.Query(ListItem);
	query.equalTo('isComplete', false)
	query.limit = 10;
	query.descending('createdAt');
	query.find({
	  success: function(results) {
			if (results.length > 0) {
				noTasksMessage.addClass('hidden');
			}
			//Append each of the incomplete tasks to the Incomplete List
			Y.Array.each(results, function(val, i, arr) {
				var content = Y.Lang.sub(Y.one('#todo-items-template').getHTML(), {
					content: val.get('content'),
					id: val.id,
					isComplete: false
				});
				incompleteItemList.append(content);
			});
			
			//When the checkbox is clicked for any of the items in the incomplete list, update it as complete.
			incompleteItemList.delegate('click', function (e) {
				var self = this;
				query = new Parse.Query(ListItem);
				query.get(self.one('input').get('id'), {
				  success: function(item) {
				    item.set('isComplete', true);
						item.save();
						self.remove();

						if (incompleteItemList.all('li').size() >= 1) {
							noTasksMessage.removeClass('hidden');
						}
						
				  },
				  error: function(object, error) {
						alert("Error when updating todo item: " + error.code + " " + error.message);
				  }
				});
			}, 'li');
	  },
	  error: function(error) {
	    alert("Error when retrieving Todos: " + error.code + " " + error.message);
	  }
	});
	
});	