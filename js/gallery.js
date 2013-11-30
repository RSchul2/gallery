function initGallery(name,source,target){gallery=new gallery(name,source,target).init()}
function gallery(name,source,target)
{
var that= this
this.source=source
this.target=target
this.name=name
this.init =function()
	{
	$(target).append('<div id="'+name+'"><img id="spinner" src="images/style/spinner.gif"/></div>')
	this.loadData(this.build)
	}

this.build = function()
	{	
	$('#spinner').remove();
	$('#'+that.name).append('<div class="imageContainer" id="'+that.name+'-images"></div>')
	$('#'+that.name).append('<menu id="'+that.name+'-menu"></menu>')
	$('#'+that.name+'-menu').append('<a id="'+that.name+'-menu-prev">prev </a>')
	$('#'+that.name+'-menu').append('<a id="'+that.name+'-menu-next">next </a>')
	$('#'+that.name+'-menu').append('<a id="'+that.name+'-menu-rotate">rotate </a>')
	$('#'+that.name+'-menu').append('<a id="'+that.name+'-menu-rotate-stop">stop </a>')
	$('#'+that.name+'-menu-rotate-stop').click(function(){that.clearRotate()})
	$('#'+that.name+'-menu-prev').click(function(){that.prev(this)})
	$('#'+that.name+'-menu-next').click(function(){that.next(this)})
	$('#'+that.name+'-menu-rotate').click(function(){that.rotate()})
	$.each(that.data.imageData,
		   function(i){
			   $('#'+that.name+'-images').append('<div id="'+that.name+'-'+i+'" class="galleryImage" style="display:none"></div>')
			   $.each(that.data.imageData[i],function(key,value)
					{	
					if(key=="src")
						{$('#'+that.name+'-'+i).append('<img src='+value+'>')}
					else
						{
							//$('#'+that.name+'-'+i).append('<div class='+key+'>'+value+'</div>')
						}
					}
					)								  	
			   }
			)
	$('#gallery-'+that.name).children().first().css({"display":"block"})
	$('#gallery').children().first().children().first().addClass("active")
	that.show("1")
}
	
this.hide = function()
	{}

this.show = function(elementNumber)
	{
	$('#gallery-image'+elementNumber).css({"display":"block"})
	}

this.prev=function()
	{
	current=$('.active');
	prev=$('.active').prev();
	if (prev.length==0)
	{
	prev=$('.active').parent().children().last()
	}
	current.fadeOut().removeClass("active")
	prev.fadeIn().addClass("active")}
	


this.next=function()
	{
	current=$('.active');
	next=$('.active').next();
	if (next.length==0)
	{
	next=$('.active').parent().children().first()
	}
	console.log(next)
	current.fadeOut().removeClass("active")
	next.fadeIn().addClass("active")}

this.rotate=function()
	{this.next()
	rotate=window.setTimeout(function(){that.rotate()}, 1000);
	}

this.clearRotate=function()
	{
	window.clearTimeout(rotate);
	}
	
this.loadData = function(callback)
	{
	$.getJSON(that.source, function(data){that.data=data;callback()})
	}
}