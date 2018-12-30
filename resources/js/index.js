baseUrl = "http://localhost:5000/GetCrawlingUrls/"
methods = {
	"allLinks":"AllLinks",
	"onlyPages":"AllPages",
	"imageLinks":"ImagesLinks"
}

function getOnlyPages() {
	$("#fetch").attr("disabled",true);
	$("#fetch").text("Fetching....")
	var seedUrl = $("#seed_url").val();
	var depth = $("#depth").val();
	parameters = {"seed_url":seedUrl,"depth":depth}
	url = getFinalUrl(baseUrl,methods["onlyPages"],parameters);
	data = httpGet(url);
	$("#fetch").attr("disabled",null);
	$("#fetch").text("Fetch Links");
	list = createAList(data);
	setHtml("all_pages",list)
}

function getAllImages(){
	$("#fetch_images").attr("disabled",true);
	$("#fetch_images").text("Fetching....")
	var seedUrl = $("#seed_url").val();
	var depth = $("#depth").val();
	parameters = {"seed_url":seedUrl,"depth":depth}
	url = getFinalUrl(baseUrl,methods["allLinks"],parameters);
	data = httpGet(url);
	$("#fetch_images").attr("disabled",null);
	$("#fetch_images").text("Fetch Images");
	ShowImageGallary(getAllHtmlStringImages(data));
}

function getImagesLinks(link){
	parameters = {"url":link}
	url = getFinalUrl(baseUrl,methods["imageLinks"],parameters)
	imagesData = httpGet(url)
	strHtmlImages = getHtmlStringOfImages(imagesData);
	return strHtmlImages;
}

// $('ul#ol_page_list li').click(function(){
// 	var link_id = $(this).data("link_id");
// 	imageGallary();
// });

$(document).on('click','ul#ol_page_list li',function(){
	var link_id = $(this).data("link_id");
	var imagesList = getImagesLinks(link_id);
	ShowImageGallary(imagesList);
});

$(document).ready(function() {
    //ToDo Action  
    // init()
});