// dashboard.js

$(document).ready(function() {

	var backPictVisible = false;
	$("i.feed-viewable").click(function() {

		backPictVisible = !backPictVisible;
		$(this).toggleClass("fa-eye-slash fa-eye");

		if ( backPictVisible ){
			$(".dash-display").css("background-color", "rgba(44, 44, 47, 0.25)");
			GoogleChartBackVisible(false);
			// $(".google-dash-background").css("background-color", "rgba(44, 44, 47, 0.25)");
		}
		else {
			$(".dash-display").css("background-color", "rgba(44, 44, 47, 1.0)");
			// $(".google-dash-background").css("background-color", "rgba(255, 255, 255, 1.0)");
			GoogleChartBackVisible(true);
		}
	});

	var gaVisible = true;
	$(".analytics-click").click(function() {


		if ( !gaVisible ){
			gapi.analytics.ready(function() {
				// console.log("Rerendering viewSelector hopefully");
				viewSelector.emit('viewChange', viewSelector);
			});

			// console.log(viewSelector);

		}
		// console.log("Google analytics button was pressed");
		$( ".google-analytics-dash" ).slideToggle( "slow", function() {
			gaVisible = ! gaVisible;
    	// Animation complete.
  	});

	});

	function GoogleChartBackVisible( visible ){
		if( visible ){
			$(".google-dash-background").css({
				"background-color": "rgba(255, 255, 255, 1.0)",
				"color": "black",
				"border-color": "#ddd"
			});
			// Chart.defaults.global.scaleLineColor= "rgba(0,0,0,.1)";
		}
		else {
			$(".google-dash-background").css({
				"background-color": "rgba(44, 44, 47, 0.25)",
				"color": "white",
				"border-color": "rgba(44, 44, 47, 0.25)"
			});
			$(".ViewSelector2-item select").css("color", "black");
			// Chart.defaults.global.scaleLineColor= "rgba(248,248,255,.1)";
		}
	}
});
