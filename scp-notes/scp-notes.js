
var editorOffset = 0;
var totalNotes;
var globOffset = 2;
var key;
var initialContent;

function Widget_scp_notes() {

	this.onReadyExtend = function() {

		key = this.$widgetDiv.parents('article').attr('pageId').split('/')[2];
		//key = 5815;

		//Find total notes for key.
		$.ajax({type:"GET",url:'proxy/scribe/notes/count?key='+key,dataType: "text"}).done(function(count){
			totalNotes = JSON.parse(count).count;
			loadNotes(0, globOffset, key, null);

			$('#add').click(function() {

				var noteWidth = $('#notes_ul div').outerWidth() + 10; 
				var ulOffset = parseInt($('#notes_ul').css('left')) - noteWidth;
				var $noteHtml = $('<div class="noteContainer"><div class="tab"><a class="cross" href="#" onClick="deleteNote(this);return false;" title="Delete..."></a>' + moment().format("MMMM Do YYYY, h:mm:ss a") + '<br/>SCP Portal</div><div class="note" id=' + "newNote" + editorOffset + ' contentEditable="true"><div name=placeholder>Edit me</div></div></div>');

				//Slide existing notes and add new
				$('#notes_ul:not(:animated)').animate({'left' : ulOffset},1500);
				$('#notes_ul').append($noteHtml);

				//Create editor inline
				noteId = 'newNote' + editorOffset 
	            createEditor(noteId);
	            editorOffset++

			});
		}).fail(function() { 
			$("#notes_ul").append("<div class='serviceError'>Notes service unavailable, please contact your system administrator</div>");
	 	});
	}
}

function slide(direction) {

    var noteWidth = $('#notes_ul div').outerWidth() + 10; 

    if(direction == 'left'){ 
    	var ulOffset = parseInt($('#notes_ul').css('left')) + noteWidth;
	  	if(globOffset < totalNotes){
    	 	loadNotes(globOffset,1,key, function(){
    	 		noteId = 'newNote' + editorOffset
            	createEditor(noteId);
    	 	});
    		globOffset ++   
    		   	
    		//$('#notes_ul:not(:animated)').animate({'left' : ulOffset},500);
    	
    	} else {$('#notes_ul:not(:animated)').animate({'left' : ulOffset},500);}        
    } else { 
        var ulOffset = parseInt($('#notes_ul').css('left')) - noteWidth;  
        $('#notes_ul:not(:animated)').animate({'left' : ulOffset},500);
    } 

}

function loadNotes(offset, limit, key, callback){

	$.ajax('proxy/scribe/notes?offset=' + offset + '&limit=' + limit + '&key=' + key + '&order=desc').done(function(notesArray) {
		for (var i = 0; i < notesArray.length; i++) {

			creationTime = notesArray[i].creationTime;
			creationTime = creationTime.replace('BST', 'GMT'); // moment.js issue - cannot pass BST timezone

			var $noteHtml = $('<div class="noteContainer '+ notesArray[i].group.replace(' ','') +'"><div class="tab"><a class="cross" href="#" onClick="deleteNote(this);return false;" title="Delete..."></a>' + moment(creationTime).format("MMMM Do YYYY, h:mm:ss a") + '<br/>' + notesArray[i].group + '</div><div saved="saved" class="note" id=' + "newNote" + editorOffset + ' uid=' + notesArray[i].id + ' contentEditable="true">' + notesArray[i].message + '</div></div>');
			$('#notes_ul, this.$widgetDiv').prepend($noteHtml);

			if (typeof callback === 'function' && notesArray[i].group != 'System Note') {
		        callback();
		    }
             editorOffset++   
		}
	});
}

function initEditors() {

	for (var i = 0; i < editorOffset; i++){
		noteId = 'newNote' + i	
		createEditor(noteId);
	}

}

function destroyEditors() {

	for (var i = 0; i < editorOffset; i++){
		noteId = 'newNote' + i	
		CKEDITOR.instances[noteId].destroy() //Throws JS errors - known issue: http://dev.ckeditor.com/ticket/10219
	}

}

function createEditor(editorId){

	CKEDITOR.inline(editorId);

	CKEDITOR.instances[editorId].on('focus', function(event) {  
			var element = event.editor.element.getAttribute( 'id' );
			initialContent = $('#' + element).html() 
		   $('#' + element).css("border-radius", "0px")

    });


    CKEDITOR.instances[editorId].on('blur', function(event) {  
        var element = event.editor.element.getAttribute( 'id' );
        var currentContent = $('#' + element).html()                                
       // alert($('#' + element).html())

        if (event.editor.element.getAttribute( 'saved' ) == "saved"){
			var uid = event.editor.element.getAttribute('uid');
			updateNote(currentContent, uid);
		} else {
			//alert(event.editor.element.text())
			saveNote(currentContent, event.editor.element);
		}     

		   $('#' + element).css("border-radius", "10px 0 10px 10px")

    });

}

function saveNote(content, thisElement){
	thisElement.setAttribute("saved", "saved");
	$.post("proxy/scribe/create", { message: content, group: "SCP Quote", key: key } );

}

function updateNote(currentContent, uid){

	if(initialContent != currentContent){
		$.ajax({url: 'proxy/scribe/' + uid, type: 'POST', data: { message: currentContent}});
	}

}

function deleteNote(element){

	uid = $(element).parent().siblings(".note").attr("uid");
	saved = $(element).parent().siblings(".note").attr("saved");
	var result = confirm("Permanently delete this note?");

	if (result == true && saved == "saved") {
		$(element).parent().parent().remove();
		$.ajax({url: 'proxy/scribe/' + uid, type: 'DELETE'});
	} else if (result == true) {
		$(element).parent().parent().remove();
	} 

	editorOffset--;
}