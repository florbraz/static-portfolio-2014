App.Utils = {
	BorderRadius: function() {
		// adds a border-radius to the browsers without its support
		if(!Modernizr.borderradius){
			loadScript('/js/jquery.corner.js', function(){
				$('[data-border-radius]').each(function(){
					$(this).corner('round ' + $(this).data('border-radius'));
				});
			});        
		}    
	},
	CreateCookie : function (name, value, days) {
		  var expires;
		  if (days) {
		      var date = new Date();
		      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		      expires = "; expires=" + date.toGMTString();
		  }
		  else expires = "";
		  document.cookie = name + "=" + value + expires + "; path=/";
	},
	IsIE: function() {
		// detect IE (using for testing, since the lt-ie classes won't work on newer versions / simulated older versions)
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	},
	IsMobile: function() {
		if ($(window).width() + App.Utils.ScrollWidth() < 768) {
			return true;
		} else {
			return false;
		}
	},
	IsMobileVertical: function() {
		if ($(window).width() + App.Utils.ScrollWidth() <= 380) {
			return true;
		} else {
			return false;
		}
	},
	IsMobileHoriz: function() {
		if ($(window).width() + App.Utils.ScrollWidth() > 380 && $(window).width() + App.Utils.ScrollWidth() < 768) {
			return true;
		} else {
			return false;
		}
	IsTablet: function() {
		if ($(window).width() + App.Utils.ScrollWidth() >= 768 && $(window).width() + App.Utils.ScrollWidth() < 1280) {
			return true;
		} else {
			return false;
		}
	},
	IsTabletVertical: function() {
		if ($(window).width() + App.Utils.ScrollWidth() >= 768 && $(window).width() + App.Utils.ScrollWidth() < 1024) {
			return true;
		} else {
			return false;
		}
	},
	IsTabletHoriz: function() {
		if ($(window).width() + App.Utils.ScrollWidth() >= 1024 && $(window).width() + App.Utils.ScrollWidth() < 1280) {
			return true;
		} else {
			return false;
		}
	},
	IsDesktop: function() {
		if ($(window).width() + App.Utils.ScrollWidth() >= 1280) {
			return true;
		} else {
			return false;
		}
	},
	Maxlength: function() {

        	var ver = window.navigator.appVersion;
            ver = ver.toLowerCase();

	        if ( ver.indexOf("android 4.1") >= 0 ){            

	            var idMaxLengthMap = {};

	            //loop through all input-text and textarea element
	            $.each($(':text, textarea, :password'), function () {
	                var id = $(this).attr('id'),
	                    maxlength = $(this).attr('maxlength');

	                //element should have id and maxlength attribute
	                if ((typeof id !== 'undefined') && (typeof maxlength !== 'undefined')) {
	                    idMaxLengthMap[id] = maxlength;

	                    //remove maxlength attribute from element
	                    $(this).removeAttr('maxlength');

	                    //replace maxlength attribute with onkeypress event
	                    $(this).attr('onkeypress','if(this.value.length >= maxlength ) return false;');
	                }
	            });

	            //bind onchange & onkeyup events
	            //This events prevents user from pasting text with length more then maxlength
	            $(':text, textarea, :password').bind('change keyup', function () {
	                var id = $(this).attr('id'),
	                    maxlength = '';
	                if (typeof id !== 'undefined' && idMaxLengthMap.hasOwnProperty(id)) {
	                    maxlength = idMaxLengthMap[id];
	                    if ($(this).val().length > maxlength) {

	                        //remove extra text which is more then maxlength
	                        $(this).val($(this).val().slice(0, maxlength));
	                    }
	                }
	            });
	        }
    
		},
		Odd: function(element) {
			$(element).parent().children(':odd').addClass('odd');
		},
		Placeholder: function() {
			//placeholder
			if(!Modernizr.input.placeholder){

				$('[placeholder]').focus(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
						input.removeClass('placeholder');
					}
				}).blur(function() {
					var input = $(this);
					if (input.val() == '' || input.val() == input.attr('placeholder')) {
						input.addClass('placeholder');
						input.val(input.attr('placeholder'));
					}
				}).blur();
				$('[placeholder]').parents('form').submit(function() {
					$(this).find('[placeholder]').each(function() {
						var input = $(this);
						if (input.val() == input.attr('placeholder')) {
							input.val('');
						}
					});
				});
			}
		},
		ScrollWidth: function() {
		    var outer = document.createElement("div");
		    outer.style.visibility = "hidden";
		    outer.style.width = "100px";
		    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

		    document.body.appendChild(outer);

		    var widthNoScroll = outer.offsetWidth;
		    // force scrollbars
		    outer.style.overflow = "scroll";

		    // add innerdiv
		    var inner = document.createElement("div");
		    inner.style.width = "100%";
		    outer.appendChild(inner);        

		    var widthWithScroll = inner.offsetWidth;

		    // remove divs
		    outer.parentNode.removeChild(outer);

		    return widthNoScroll - widthWithScroll;
		}
}