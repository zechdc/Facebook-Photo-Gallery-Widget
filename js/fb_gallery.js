$(document).ready(function() 
{	
	var app_id = $('#fb_gallery').attr('app_id');
	var page_id = $('#fb_gallery').attr('page_id');

	//init the gallery
	$('#fb_gallery').append('<img id="loading_gallery" src="/images/ajax-loader.gif" />');
	$('#fb_gallery').append('<ul id="albums"></ul>');
	$('#fb_gallery').append('<div id="fb-root"></div>');

	FB.init({
		appId  : app_id,
	});

	FB.api('/' + page_id + '/albums', function(response){show_albums(response)});

	//display albums
	function show_albums (response) 
	{
		//hide main loader
		$('#loading_gallery').hide();

		//loop through each album
		$.each(response.data, function(key, value)
		{
			//create html structure
	    	var html = '' +
			'<li id="album_' + key + '"> ' +
				'<a href="#" class="album_link_' + key + '"><img id="album_cover_' + key + '" /></a>' +
				'<img id="loading_' + key + '" src="/images/ajax-loader.gif" />' +
				'<a href="#" class="album_link_' + key + '"><h2>' + value.name + '</h2></a>' +
				'<p>' + value.count + ' photos</p>' +
			'</li>';

    		$('#albums').append(html);

    		//construct the album cover html
    		FB.api('/' + value.cover_photo + '', function(response)
    		{
    			//if there is no cover art, assume the album is empty or doesn't exist and hide it.
    			//TODO: Handle better, like display a default place holder.
    			if(!response.picture)
	    		{
	    			$('#album_' + key).hide();	
	    		}else{
	    			$('#loading_' + key).hide();
	    			$('#album_cover_' + key).attr("src", response.picture);
	    		}
    		});

    		//register click event
    		$('.album_link_' + key).click(function(event) 
    		{
    			event.preventDefault();
				show_albums_photos(value.id);
			});

		});
	}


	//get all photos for an album and hide the album view
	function show_albums_photos (album_id)
	{
		$('#loading_gallery').show();

		$('#albums').hide();

		//check to see if the album has already been loaded. Unhide or create it
		if ( $('#album_' + album_id).length > 0 ) 
		{
			//album photos have already been loaded, just unhide it.
			$('#album_' + album_id).show();
			console.log('created');
		}else
		{	
			//album photos have not been loaded, do so now.

			//create album_photos dom element
			$('#fb_gallery').append('<ul class="gallery clearfix" id="album_' + album_id + '"></ul>');

			//creat back button
			$('#album_' + album_id).append('<a href="#" id="back_btn_' + album_id + '">Back To Albums</a>');

			//create click event for back button
			$('a#back_btn_' + album_id).click(function(event)
			{
				event.preventDefault();
				$('#album_' + album_id).hide();
				$('#albums').show();
			});

			//get all photos for an album
			FB.api('/' + album_id + '/photos', function(response)
			{
				//loop through each photo and append it to the page
				$.each(response.data, function(key, value)
				{
					//create html structure
			    	var html = '\
					<li id="photo_' + value.id + '"> \
						<a class="lightbox" href="' + value.source + '"> \
							<img id="photo_thumb_' + value.id + '" src="' + value.picture + '" /> \
						</a> \
					</li>';

	    			$('#album_' + album_id).append(html);

	    			//add lightbox functionality
	    			$('#album_' + album_id + ' .lightbox').lightBox();
				});

				//after .each loop hide loading gif
				$('#loading_gallery').hide();
			});
		}
	}



});