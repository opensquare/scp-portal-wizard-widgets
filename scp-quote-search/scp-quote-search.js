function Widget_scp_quote_search() {
	
	this.onReadyExtend = function() {
		var pageId = this.$widgetDiv.parents('article').attr('pageId');
		var args = this.$widgetDiv.parents('article').attr('args');
		
		pw.notifyChannelOfEvent('scp-page.setPageTitles', { pageId: pageId, title: 'Quotes Search' });
		
		var widget = this;
		this.$widgetDiv.find('.napier-search-input').click(function() {
			if(this.value==''){
				napierSearchClear($(this).closest('div').find('.napier-search-results'));
			};
			return true;
		});
		this.$widgetDiv.find('form').submit(function() {
			var val = widget.$widgetDiv.find('.napier-search-input').val();
			if(val!=''){
				pw.notifyChannelOfEvent('scp-page.setPageArgs', { pageId: pageId, args: val });
				napierSearch(val);
			} else {
				napierSearchClear($(this).closest('div').find('.napier-search-results'));
			};
			return false;
		});
		
		napierSearch(args);
	}
	
	function napierSearch(terms) {
		if(typeof(terms) != 'undefined') {
			// quick check if just calcrefs
			var calcref = parseInt(terms,10);

			if(isNaN(calcref)){
				// Do a general quicksearch
				napierQuickSearch(terms);
			} else {
				var calcref = terms.split(',');
	  			$('.napier-search-results').html('<ul class="search-results"></ul>');

				for (var i=0;i<calcref.length;i++){ 
					// Iterate through numbers
					var calc = +calcref[i];
					if(isNaN(calc)){
						var calc = calcref[i].split('-');
						if(calc.length == 2){
							if (Math.max(calc[0],calc[1]) - Math.min(calc[0],calc[1]) > 50) {alert(calcref[i] + ' number range is too large')} else {;
								for (var x=Math.min(calc[0],calc[1]);x<=Math.max(calc[0],calc[1]);x++){
									napierSearchCalc(x);
								}
							}
						};
					} else {
						// Get a single calc
						napierSearchCalc(calc);
			  		};
				};
			};
		} else {
			napierSearchClear();
		};
	}
	
	function napierQuickSearch(terms){
		var endpoint = 'proxy/napier/';
		$('.napier-search-results').html('<ul class="search-results"><span class="loading"></span></ul>');
		$('.napier-search-results ul').load(endpoint+'search/quickSearch='+terms+' calc', function(){
			// Turn xml into LIs
			var data = $(this).html();
			data = data.replace(/<calc><calcref>/g,'<li calcref="');
			data = data.replace(/<\/calcref>/g,'">');
			data = data.replace(/<source>/g,'<span>');
			data = data.replace(/<\/calc>/g,'<\/span><a class="button">show<\/a><\/li>');
			$(this).html(data);
			// Find some interesting data and display it
			$(this).find('quickSearch').each(function(){
				var qsTerms = $(this).text();
				qsTerms = qsTerms.split(',');
				$(this).before('<span>'+qsTerms[0]+'</span><span>'+qsTerms[1]+'</span><span>'+qsTerms[2]+'</span><span>'+qsTerms[3]+'</span>');
			});
			$(this).find('li[calcref]').each(function(){
				var ref= $(this).attr('calcref');
				$(this).children('a.button').attr('href','#quote/show/'+ref);
			});
		});
	}
	
	function napierSearchCalc(calc){
		var endpoint = 'proxy/napier/'
		$('.napier-search-results ul').append('<li calcref="'+calc+'"><span class="loading"></span></li>');
		$('li[calcref="'+calc+'"]').load(endpoint+calc, function(){
			// Find some interesting data and display it
			var xml = $.parseXML($(this).find('calcdata').text());
			$(this).append('<span>'+$(xml).find('title').first().text()+' '+$(xml).find('firstName').first().text()+' '+$(xml).find('surname').first().text()+'</span>');
			$(this).append('<span>'+$(xml).find('postcode').first().text()+'</span>');
			$(this).append('<span>'+$(xml).find('vehDesc').first().text()+'</span>');
			$(this).append('<span class="reg">'+$(xml).find('reg').first().text()+'</span>');
			var xml = $.parseXML($(this).find('calcResponse').text());
			$(this).append('<span class="currency">'+$(xml).find('annualPremium').first().text()+'</span>');

			$(this).append('<a class="button" href="#quote/show/'+calc+'">show</a>');}
		);
	}
	
	function napierSearchClear(el) {
		if(typeof(el) != 'undefined') {
			$(el).html('<section class="placeholder"><h2>Enter some search terms above and press Go</h2></section>');
		};
	}

}