/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing 
           the web-pages DOM content as argument */
		var title = document.getElementById("tn15title").firstElementChild.firstChild.textContent.trim();
		var rating = document.getElementById("tn15rating").querySelector(".starbar-meta").firstElementChild.innerHTML.trim();
		rating = rating.substring(0, rating.length - 3);

		var content = document.getElementById("tn15content");
		var x = content.querySelectorAll("div.info > h5");
		
		var genre = "?";
		var runtime = "?";
		var i;
		for (i = 0; i < x.length; i++) {
			if (x[i].innerHTML == "Genre:") { 
				var genresList = x[i].nextElementSibling.querySelectorAll("a");
				var j;
				genre = genresList[0].innerHTML.trim();
				for (j = 1; j < genresList.length-1; j++) {
					genre = genre + " | " + genresList[j].innerHTML.trim();
				}
			} else if (x[i].innerHTML == "Runtime:") { 
				runtime = x[i].nextElementSibling.innerHTML.trim(); 
				runtime = runtime.substring(0, runtime.length - 4);
			}
			
		}
		var response = {
			title : title,
			url : document.URL,
			genre : genre,
			rating : rating,
			runtime : runtime
		};
		sendResponse(response);
    }
});
