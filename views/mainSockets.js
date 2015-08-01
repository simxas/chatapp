"use strict";
//========================================
// useriu informacijos 
// manipuliacijos dalis
//========================================
var users = [],
	socket = io();

function updateUsersList(users){
	//isvalau pries appendindamas, taip isvengiu pasikartojimu
	$("#users").html('');
	for (var a= 0; a < users.length; ++a) {
		//nustatau ir ismetu kliento username is visu useriu array
		if(sessionStorage.getItem("username") != users[a].userName){
			//nustatau lyti
			if(users[a].sex == "female"){
				$("#users").append('<div id="'+users[a].userName+''+users[a].age+'" style="cursor:pointer" data-name="'+users[a].userName+'" onclick="openChat(this)"><i class="fa fa-venus"></i> '+users[a].userName+''+users[a].age+' '+users[a].city+'</div><br>');
			}else if(users[a].sex == "male"){
				$("#users").append('<div id="'+users[a].userName+''+users[a].age+'" style="cursor:pointer" data-name="'+users[a].userName+'" onclick="openChat(this)"><i class="fa fa-mars"></i> '+users[a].userName+''+users[a].age+' '+users[a].city+'</div><br>');
			}
		}		
	};		
}




//========================================
// socketu dalis
//========================================

socket.on('connect', function () {
	sessionId = socket.io.engine.id;
	// console.log('Connected ' + sessionId);

	/*
	siunciu i serveri visa informacija apie prisijungusi useri, 
	kuri siaip talpinama pas klienta session storage.
	*/
	socket.emit('join', {
						id: sessionId, 
						userName: sessionStorage.getItem("username"), 
						age: sessionStorage.getItem("age"), 
						sex: sessionStorage.getItem("sex"),
						city: sessionStorage.getItem("city")
						}
	);//end of emit
});

socket.on('newConnection', function (data) {    
	updateUsersList(data.users);
	// console.log(data.users);

});

socket.on('userDisconnected', function(data) {
	// $("#users").html('');
	// $('#' + data.id).remove();
	//panaikinu atsijungusi useri is useriu listo
	users = _.without(users,_.findWhere(users, {id: data.id}));
	updateUsersList(data.users);
});

