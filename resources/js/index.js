baseUrl = "http://localhost:5000/GetCrawlingUrls/"
methods = {
	"allLinks":"AllLinks",
	"onlyPages":"AllPages",
	"imageLinks":"ImagesLinks"
}

function getOnlyPages() {
	if (validateInput()){
		$("#fetch").attr("disabled",true);
		$("#fetch").text("Fetching....")
		var seedUrl = $("#seed_url").val();
		var depth = $("#depth").val();
		parameters = {"seed_url":seedUrl,"depth":depth}
		url = getFinalUrl(baseUrl,methods["onlyPages"],parameters);
		// data = httpGet(url);
		// data = httpGet2(url);
		var data = null;
		$.getJSON(url, function(response){
			if (response.Success){
				data = response.data;
		    	$("#fetch").attr("disabled",null);
				$("#fetch").text("Fetch Links");
				list = createAList(data);
				setHtml("all_pages",list)	
			}
			else{
				show_error(response.ErrMsg);
				$("#fetch").attr("disabled",null);
				$("#fetch").text("Fetch Links");
			}
	    });	
	}
	else{
		show_error("Please pass valid inputs");
	}
}

function getAllImages(){
	var data = null;
	$("#fetch_images").attr("disabled",true);
	$("#fetch_images").text("Fetching....")
	var seedUrl = $("#seed_url").val();
	var depth = $("#depth").val();
	parameters = {"seed_url":seedUrl,"depth":depth}
	url = getFinalUrl(baseUrl,methods["allLinks"],parameters);
	// data = httpGet(url);
	$.getJSON(url, function(response){
		if (response.Success){
			data = response.data;
			var  strHtmlAllImage = getAllHtmlStringImages(data);
			if (strHtmlAllImage == ""){
				show_error("No Images in this page");
			}
			else{
				ShowImageGallary(strHtmlAllImage);	
			}
			
			$("#fetch_images").attr("disabled",null);
			$("#fetch_images").text("Fetch Images");
		}
		else{
			show_error(response.ErrMsg)
			$("#fetch_images").attr("disabled",null);
			$("#fetch_images").text("Fetch Images");
		}
	});
	
}

function getImagesLinks(link){
	var imagesData = null;
	parameters = {"url":link}
	url = getFinalUrl(baseUrl,methods["imageLinks"],parameters)
	// imagesData = httpGet(url)
	$.getJSON(url, function(response){
		if(response.Success){
			imagesData = response.data;
			strHtmlImages = getHtmlStringOfImages(imagesData);
			if (strHtmlImages == ""){
				show_error("No image in this page")
			}
			else{
				ShowImageGallary(strHtmlImages);	
			}
			
		}
		else{
			show_error(response.ErrMsg);
		}
	});
	
}

$(document).on('click','ul#ol_page_list li',function(){
	var link_id = $(this).data("link_id");
	getImagesLinks(link_id);
	
});

$(document).ready(function() {
    //ToDo Action  
    // init()
});