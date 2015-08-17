(function () {
	function Alert (sContainer) {
		this.Container = document.querySelector(sContainer);
		this.alertBox = this.Container.querySelector(".alert-box");
		$(this.Container).on("click", ".alert-button", this.showAlert.bind(this));

	}
	Alert.prototype.showAlert = function(e) {
		$(this.Container).toggleClass("active");
		// $().$()????
		
	};


	window.Alert = Alert;
})();