(function () {

	
	function Alert (sContainer) {
		this.Container = document.querySelector(sContainer);
		$(this.Container).on("click", ".show-button", this.showAlert.bind(this));
	}

	Alert.prototype.showAlert = function(e) {
		if(Alert.activeOne){
			Alert.activeOne.removeClass("active");
			Alert.activeOne = null;
		}
		Alert.activeOne = $(this.Container);
		Alert.activeOne.addClass("active");
		e.stopPropagation();
	};


	function close(e){
		if(Alert.activeOne){
			Alert.activeOne.removeClass("active");
			Alert.activeOne = null;
			console.log("close");
		}
	}

	$(function () {
		$('html').on("click", close);
		$('.alert-destroy').on("click", close);
		$('.alert-message').on("click", function (e) {
		  e.stopPropagation();
		})
	});

	window.Alert = Alert;
})();