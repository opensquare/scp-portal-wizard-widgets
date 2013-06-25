function Widget_scp_quote_show() {
	
	this.onReadyBeforeChildImport = function() {
		var pageId = this.$widgetDiv.parents('article').attr('pageId');
		var calcId = pageId.split('/')[2];
		pw.notifyChannelOfEvent('scp-page.setPageTitles', { pageId: pageId, title: 'Quote Show', subTitle: 'Calc ' + calcId });

		$('.widget[name="quote-forms"]', this.$widgetDiv).attr('calcref', calcId);
	}

	this.onReadyExtend = function() {

 		var ref = document.URL.substring(document.URL.lastIndexOf("/") + 1);
		var url = 'proxy/napier/' + ref;
		var nodeHTML = "";
	
		$.ajax({url:url, dataType: "html"}).done(function(result) {
			//Main napier response obj
			xmlDoc = $.parseXML(result)
			$jXML = $(xmlDoc)
			$response = $jXML.find( "calcResponse" ).text();
			$data = $jXML.find( "calcData" ).text();
			//Embedded data string xml
			if($data != ""){
				dataXML = $.parseXML($data)
				$jXMLData = $(dataXML)
				$data = $jXMLData.find( "calcData" ).contents();
				var dataHTML ="<details class='quoteData'><summary class='main calc'>Calc Data</summary>";
				dataHTML = dataHTML + parseNode($data) +"</details><br/>"
				$('.napierCalc').append(dataHTML);
				nodeHTML = "";
			}			
			//Embedded response string xml
			if($response != ""){
				responseXML = $.parseXML($response)
				$jXMLResponse = $(responseXML)
				$quote = $jXMLResponse.find( "calcElement" ).contents();
				var responseHTML ="<details open class='quoteData'><summary class='main response'>Response Data</summary>";
				responseHTML = responseHTML + parseNode($quote) + "</details><br/>"
				$('.napierCalc').append(responseHTML);
			}
		});

		function parseNode(node){
			node.each(function(){
				if(this.nodeType === 1 && this.childNodes.length != 0){
					if(this.childNodes.length === 1){
						//Top level relevant text node
						displayNodeValue = "null";
						if(typeof (this.childNodes[0]) != 'undefined'){
							displayNodeValue = this.childNodes[0].nodeValue;
						}
						nodeHTML = nodeHTML + "<div><span class='property-label'>" + 
						 (this.localName).replace(/([A-Z])/g, ' $1') + 
						 "</span><span class='property-value'>" + 
						 displayNodeValue + "</span></div>";
					} else {
						//Nesting
						displayAttributeValue =  this.nodeName;
						if(typeof (this.attributes[0]) != 'undefined'){
							displayAttributeValue = this.attributes[0].nodeValue;
						}
						nodeHTML = nodeHTML + "<details class='nestedData'><summary>" + displayAttributeValue + "</summary>"
						$(this.childNodes).each(function(){
							parseNode($(this));
						})
						nodeHTML = nodeHTML + "</details>"
					}
				}
			})
			return nodeHTML;
		}	
	};
}
