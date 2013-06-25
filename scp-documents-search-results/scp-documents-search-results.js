function Widget_scp_documents_search_results() {

	this.channel = null;

	this.initExtend = function() {
		this.channel = this.$widgetDiv.attr("channel");
		pw.addListenerToChannel(this, this.channel);
	}
	
	this.handleEvent = function(channel, event) {
		//this.loadHTMLWithParams("searchValue=" + event.searchValue +"%25");
		//alert('here!');
		//this.loadHTMLWithParams("searchValue=" + encodeURIComponent('%25'+ event.searchValue +'%25'));
		docSearch(event.searchValue);
	}
		
	function docSearch(searchTerm) {
		var $searchResultsContainer = $('[channel="docSearch"]').parent().find('.search-results');
		var url = 'proxy/mailmerger/jobs/search/' + encodeURIComponent('%'+ searchTerm +'%');

		$.ajax(url).done(function(searchResultsArray) {
			var searchResultsHtml = '';

			for (var i = 0; i < searchResultsArray.length; i++) {
				searchResultsHtml = searchResultsHtml + '<li class="'+searchResultsArray[i].status+'" ref="'+searchResultsArray[i].id+'">' + '<span>'
					+ searchResultsArray[i].template +'</span>' + '<span>' + searchResultsArray[i].description + '</span>' + '<span>' +
					 moment(new Date(searchResultsArray[i].date)).format("DD/MM/YYYY") + '</span>' +
					 '<a class="button" target="Document" href=' + 'proxy/mailmerger/output/document/'+searchResultsArray[i].id+'/0' +'>show</a></li>';
			}

			$searchResultsContainer.append('<ul>'+searchResultsHtml+'</ul>');
		});
	}

}

