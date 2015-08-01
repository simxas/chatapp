/*
pasidaryti, kad paklikinus ant userio vardo atsidarytu chato langas susietas su tuo useriu.
Tada forma, kuri po submito siuncia zinute konkreciai tam useriui. Taip pat zinute issisaugo i array,
kuris dedamas i sessionStorage su pavadinimu to chato userio su kuriuo bendrauji.
Paspaudus ant kito userio, chatas uzsidaro ir atsidaro naujas. Patikrina ar yra sessionStorage.
*/
"use strict";

var socket = io(),
	//i sita talpinsiu visa current chata. O po to ji kisiu i sessionStorage naudodamas user varda
	currentChat = [],

	receivedChats = [],
	//useris su kuriuo dabar kalbu, reikalingas tam, kad galeciau emitinti varda i serva userio, kuriam
	//siunciu zinute.
	currentUser;



function openChat(item) {
	$("#chatWindow").show( "slow" );	
	//userio vardas su kuriuo dabar turi atvira chato langa
	$("#chatUser").html($(item).attr("id"));
	currentUser = $(item).attr("data-name");
	loadChat();
	// console.log(currentUser);
	// socket.emit("hello", {name: $(item).attr("id"), msg: "Zinutes tekstas", sex: sessionStorage.getItem("sex"), age: sessionStorage.getItem("age")});
}

function loadChat() {
	//isvalo uzkrovus zinuciu langa
	$("#chatMsgs").html('');
	loadChatsFromSession();
	//eina per visa array zinuciu ir jei randa dabartiniam atidarytam useriui priklausancia zinute
	//tada appendina ja i chato langa
	for (var i = 0; i < receivedChats.length; i++) {
		if( currentUser == receivedChats[i].from) {
			$("#chatMsgs").append( receivedChats[i].msg+"<br>" );
		}else if(currentUser == receivedChats[i].to) {
			$("#chatMsgs").append( receivedChats[i].from + " " + receivedChats[i].msgSent + "<br>" );
		}
		
	};//end of for loop
}//end of loadChat function

function updateSessionChat() {
	//cia receivedChats masyva kisiu i sessionStorage
	sessionStorage.setItem("chats",  JSON.stringify(receivedChats));
}
function loadChatsFromSession() {
	var storedData = sessionStorage.getItem("chats");
	if (storedData) {
		receivedChats = JSON.parse(storedData);
	}
}

socket.on("new_msg", function(data) {
	// $("#notifications").append();
	receivedChats.push(data);
	//pushinu viska i session storage
	updateSessionChat();
	if( currentUser == data.from) {
			$("#chatMsgs").append( data.msg+"<br>" );
	}//end of if
	
    console.log(receivedChats);
});

//Reikia butinai siusti userio is kurio eina zinute varda, dabar siunciu varda kuriam siunciama zinute
//nes taip veikia join metodas serveryje
$('form').submit(function () {
	socket.emit('chat_message', {msg: $('#m').val(), to: currentUser, from: sessionStorage.getItem("username"), sex: sessionStorage.getItem("sex"), age: sessionStorage.getItem("age"), city: sessionStorage.getItem("city")});
	receivedChats.push({msgSent: $('#m').val(), to: currentUser, from: sessionStorage.getItem("username")});
	//pushinu viska i session storage
	updateSessionChat();
	$("#chatMsgs").append(sessionStorage.getItem("username") + ' ' + $('#m').val() + '<br>');
	$('#m').val('');

	return false;
});

//dabar viskas dingsta jei padaromas page refresh, reikia viska talpinti i session storage, o ne tik i array