$(function () {
	new Alert("#hello1").setAnimation("opacity");	// first edition + animation
	new Alert("#hello2").setAnimation("opacity");	// second edition
	new Alert("#hello3").setAnimation("opacity");	// third edition
	
	new Alert("#hello4").setTemplate("#alert-template", {"user":"erin", "email":"erin314@naver.com"});							// template custom
	new Alert("#hello5").setSession(1333);			// today not show check box
	new Alert("#hello6");							
});