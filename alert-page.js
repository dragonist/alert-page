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
		if(e){
			e.stopPropagation();
		}
	};

	Alert.prototype.setAnimation = function(type) {
		this.animation = type;
		// $(this.Container)[type]("slow", "linear");
		// fadeToggle
		$(this.Container).addClass("animation");
		$(this.Container).addClass("animation-"+type);
	};
	Alert.prototype.setSession = function(id) {
		var key = 'alert-page'+id;
		$(this.Container).data("key", key);
		localforage.getItem(key).then(function (result) {
			if(isThereDataAndExpired(result)){
				if(!result.show){
					var input = $(this.Container).find("input[type=checkbox]")[0];
					input.checked = true;
				}else{
					this.showAlert();
				}
			}else{
				result = {show:true, due:formDate(new Date())};
				localforage.setItem(key, result).then(this.showAlert());
			}
		}.bind(this));
	};


	Alert.prototype.setTemplate = function(templateId, context) {
		$(this.Container).append(this.buildTemplate(templateId, context));

	};
	
	Alert.prototype.buildTemplate = function(templateId, context) {
		var html = $(templateId).html();
		var template = Handlebars.compile(html);
	    return template(context);
	};
	Alert.prototype.setAfterClose = function(eventClass, callback) {
		$(this.Container).find(eventClass).on("click", callback);
	};

	function  isThereDataAndExpired(result) {
		if(result){
			if(result.due === formDate(new Date())){
				return true;
			}
		}
		return false;
	}

	function formDate (date) {
		var yyyy = date.getFullYear().toString();
		var mm = (date.getMonth()+1).toString();
		var dd  = date.getDate().toString();
		return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);
	}

	function close(e){
		if(Alert.activeOne){
			var checkbox = Alert.activeOne.find("input[type=checkbox]")[0];
			if(checkbox){
				var key = Alert.activeOne.data("key");
				localforage.getItem(key).then(function (result) {
					if(result.show === checkbox.checked){
						result.show = !checkbox.checked;
						localforage.setItem(key, result);
					}
				})
			}
			Alert.activeOne.removeClass("active");
			Alert.activeOne = null;

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