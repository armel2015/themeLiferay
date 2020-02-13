<#setting url_escaping_charset="UTF-8">

<#assign pageUrlComplete = themeDisplay.getPortalURL() + themeDisplay.getURLCurrent() />

<script>
    function socialShare(media) {
     	var winHeight = 400;
     	var winWidth = 520;
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        switch(media) {
        	case "FB":
        		window.open('http://www.facebook.com/sharer.php?s=100&p[url]=' + "${pageUrlComplete}"+'&p[title]=' + "${the_title?url}", 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
        		break;
        	case "TW" :
        		window.open('http://twitter.com/share?url=' + "${pageUrlComplete}"+'&text=' + "${the_title?url}", 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
        		break;
        	case "LN" :
        		window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + "${pageUrlComplete}"+'&title='+ "${the_title?url}", 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
        		break;
        	default :
        		console.error("no social media");
        }
    }
</script>






<div class="socials-print">

	<#if pageUrl != "/conseiller">

		<a href="javascript:socialShare('FB')"><i class="fa fa-facebook" aria-hidden="true"></i></a>
		<a href="javascript:socialShare('TW')"><i class="fa fa-twitter" aria-hidden="true"></i></a>
		<a href="javascript:socialShare('LN')"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>

	</#if>

    <a class="printer" href="javascript:window.print()"><img src="${images_folder}/icons/print.png"></a>
</div>





