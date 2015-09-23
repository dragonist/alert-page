$(function () {
	var alertBox = [
		new Alert("#hello1"),
		new Alert("#hello2"),
		new Alert("#hello3"),
		new Alert("#hello4"),
		new Alert("#hello5"),
		new Alert("#hello6")
	]
	alertBox[0].setAnimation("opacity");
	alertBox[1].setAnimation("opacity");
	alertBox[2].setAnimation("opacity");

	alertBox[3].setTemplate("#alert-template", {"user":"erin", "email":"erin314@naver.com"});							// template custom
	
	alertBox[4].setSession(1333);			// today not show check box

	alertBox[5].setAfterClose(".event-button", function (e) {
		alert("you click :"+ e.target.innerHTML);
		alertBox[e.target.innerHTML].showAlert();
	});						
});