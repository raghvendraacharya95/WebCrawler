function httpGet(url){
var responseData = null
$.ajax({
        url: url,
        type: 'GET',
        // beforeSend: setHeader,
        async: false,
        dataType: 'json',
        success: function(response) {
            if (response.Success) {
                console.log("Success");
                responseData = response.data;
                
            } else {
                alert(response.ErrMsg);
                return;
            }
        },
        error: function(response) {
            alert(response.ErrMsg);
        },
        complete: function() {
            console.log("Inside complete function");            
        }
    });
return responseData;
}


function getFinalUrl(baseUrl,method,parameters){
    params = []
    baseUrl = baseUrl+method+"?"
    for (key in parameters){
        p = ""
        p = key+"="+parameters[key];
        params.push(p);
    }
    restUrl = params.join("&");
    return baseUrl+restUrl;
}

function setHtml(id,html){
$("#"+id).html(html);
}

function createAList(itemList){
    // $("#all_pages").html("");
    var ul = document.createElement('ul');
    ul.setAttribute('id','ol_page_list');
    ul.setAttribute('class','list-group')
    // itemList = ['a','b','c','d']
    itemList.forEach(renderItemList);
    function renderItemList(element, index) {
        var li = document.createElement('li');
        li.setAttribute('class','item');
        li.setAttribute('class','list-group-item')
        $(li).data("link_id",element)
        ul.appendChild(li);
        li.innerHTML=li.innerHTML + '<a href="#">'+element+'</a>';
    }
    return ul;
    console.log(ul)
}

function getHtmlStringOfImages(imageList){
    strImageHtml = ""
    imageList.forEach(createImagesHtml);
    function createImagesHtml(element,index){
        strImageHtml+='<img src="'+element+'" height="100" width="100"/>'
    }
    return strImageHtml;
}

function getAllHtmlStringImages(listAllLinks){
    allStrImageHtml = "";
    for (link in listAllLinks[0]){
        strHtml = getHtmlStringOfImages(listAllLinks[0][link])
        allStrImageHtml+=strHtml;
    }
    return allStrImageHtml;
}