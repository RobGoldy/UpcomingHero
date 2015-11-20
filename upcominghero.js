$(document).ready(function(){
console.log("UpcomingHero succesfully loaded!");
//$(".left_section").remove();

var i = 0;
var skip = 0;
var skipuser = 0;
var uservotes = 0;
var currentUser = "";
var votedisabled = false;

function getChatMessage(msg){
	var amsg = msg;
	var user = amsg.children().children(".username").html();
	var amsghtml = amsg.html(); //Message
	amsghtml = amsghtml.replace("<p>","");
	amsghtml = amsghtml.replace("</p>"," ");
	amsghtml = amsghtml.replace('<a href="#" class="username">'+user+'</a>', '');
	return amsghtml;
}

function getChatUser(user){
	var user = user;
	if(user.children().children(".username").html()){
		currentUser = user.children().children(".username").html();
		return user.children().children(".username").html();
	}else{ return currentUser; }
}

function postMsg(msg){
	var message = msg;
	$("#chat-txt-message").val(message);
	var e = $.Event("keydown");
	e.which = 13;
	$("#chat-txt-message").trigger(e);
}

function sayhello(u){
	var user = u;
	var chatmsg = "Hello "+user+"!";
	postMsg(chatmsg);
}

function ping(){
	var chatmsg = "Pong!";
	postMsg(chatmsg);
}

function yolo(){
	var chatmsg = "Swag";
	postMsg(chatmsg);
}

function fb(){
	var chatmsg = "Make sure to like us on Facebook! https://www.facebook.com/UpcomingRecords";
	postMsg(chatmsg);
}

function skipvideo(vote){
	var vot = vote;
	$(".skip-el").trigger("click");
	if(vot = "vote"){ postMsg("Successful Vote. Video skipped!"); }
}

function voteskip(act){
	var action = act;
	switch(action){
		case (action == "start"): 
			skipuser = getTotalUser();
			votedisabled = true;
			postMsg("Voteskip started!");
			break;
		case (action =="end"): 
			if(skip > 0){skipvideo("vote"); uservotes = 0; skip = 0; skipuser = 0;}else{postMsg("Vote failed!"); uservotes = 0; skip = 0; skipuser = 0;}
			break;
		case (action == "yes"): 
			skip++; uservotes++;
			break;
		case (action == "no"): 
			skip--; uservotes++;
			break;
		default: 
			console.log("No Vote-Action");
			break;
	}
}

$('body').on('DOMNodeInserted', 'div.text', function () {
	var rank = $(this).parent().parent().parent().attr("class");
	console.log(rank);
	var userrank = "";
	var staff = false;

	if(rank.search('isMod') >= 0){userrank = "Mod"; staff = true;}
	if(rank.search('isVIP') >= 0){userrank = "VIP";}
	if(rank.search('isManager') >= 0){userrank = "Manager"; staff = true;}
	if(rank.search('isCo-owner') >= 0){userrank = "Co-owner"; staff = true;}
	if(rank.search('isResident-dj') >= 0){userrank = "Resident-dj";}
	if(rank.search('isOwner') >= 0){userrank = "Owner"; staff = true;}

	var msg = getChatMessage($(this));
	var user = getChatUser($(this));
	var commandlist = "!hello, !yolo, !ping, !skip (Staff only), !voteskip, !voteyes, !voteno, !commands";

	if(user != "hero"){
		if(msg.search('!hello') >= 0){ sayhello(user); }
		if(msg.search('!yolo') >= 0){ yolo(); }
		if(msg.search('!fb') >= 0){ fb(); }
		if(msg.search('!ping') >= 0){ ping(); }
		if(msg.search('!voteskip') >= 0){ if(votedisabled == false){voteskip("start");} }
		if(msg.search('!voteyes') >= 0){ voteskip("yes"); }
		if(msg.search('!voteno') >= 0){ voteskip("no"); }
		if(staff == true && msg.search('!skip') >= 0){ skipvideo(); }
		if(msg.search('!commands') >= 0){ postMsg(commandlist); }
	}
	if(skipuser > 0 && uservotes > 0 && skipuser == uservotes){voteskip("end"); votedisabled = false;}

	});

})
