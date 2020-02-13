<!DOCTYPE html>

<#include init />

<#assign layoutDescription = themeDisplay.getLayout().getDescriptionCurrentValue() />

<#-- "#761724 Fix for clean naming of SEO title while using canonical URLs" -->
<#if pageTitle?? && pageSubtitle?? && (pageTitle == pageSubtitle)>
    <#assign the_title = pageTitle/>
</#if>

<#assign the_title = the_title + ' - ' + company_name/>

<html class="${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="fr">

<head>
    <title>${the_title}</title>
    <meta name="author" content="AGIPI">
    <meta name="copyright" content="AGIPI">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
	<meta property="og:type" content="website">
    <meta property="og:url" content="http://agipi.fr">
    <meta property="og:site_name" content="AGIPI">
    <meta property="og:title" content="${the_title}">
    <meta property="og:description" content="${layoutDescription}" />
    <meta name="twitter:title" content="${the_title}">
    <meta name="viewport" id="agipi-viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name = "format-detection" content = "telephone=no">
    <script type="text/javascript">
        if(screen.width < 360){
            var ratio = screen.width / 360;
            document.getElementById('agipi-viewport').setAttribute('content','initial-scale=' + ratio + ', user-scalable=no, width=360')
        }
         var isSignedIn = ('${themeDisplay.isSignedIn()?c}' == 'true');
         var hasAdherentRole = ('${hasAdherentRole?c}' == 'true');
    </script>
    
    <@liferay_util["include"] page=top_head_include />


    <script>
        define._amd = define.amd;
        define.amd = false;
    </script>
    <script type="text/javascript" src="${javascript_folder}/jquery.inputmask.bundle.js" ></script>
    <script type="text/javascript" src="${javascript_folder}/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="${javascript_folder}/matchHeight.js"></script>
    <script type="text/javascript" src="${javascript_folder}/slick.min.js"></script>
    <script type="text/javascript" src="${javascript_folder}/objectFitPolyfill.basic.min.js"></script>

    <script>
        define.amd = define._amd;
    </script>

    <script type="text/javascript" src="${javascript_folder}/lightslider.js" ></script>
    <script type="text/javascript" src="${javascript_folder}/jqplot/jquery.jqplot.min.js"></script>
    <script type="text/javascript" src="${javascript_folder}/jqplot/plugins/jqplot.dateAxisRenderer.js"></script>
    <script type="text/javascript" src="${javascript_folder}/jqplot/plugins/jqplot.canvasTextRenderer.js"></script>
    <script type="text/javascript" src="${javascript_folder}/jqplot/plugins/jqplot.canvasAxisLabelRenderer.js"></script>
    <script type="text/javascript" src="${javascript_folder}/jqplot/plugins/jqplot.cursor.js"></script>
    <script type="text/javascript" src="${javascript_folder}/jqplot/plugins/jqplot.barRenderer.js"></script>
    <script type="text/javascript" src="${javascript_folder}/jqplot/plugins/jqplot.categoryAxisRenderer.js"></script>
    <script type="text/javascript" src="${javascript_folder}/jquery.cookie.js"></script>
    <script type="text/javascript" src="${javascript_folder}/zoombox.js"></script>
    <script type="text/javascript" src="${javascript_folder}/waypoints.js"></script>
    <script type="text/javascript" src="${javascript_folder}/lightslider.js" ></script>
    <script type="text/javascript" src="${javascript_folder}/jquery.dotdotdot.min.js"></script>

    <script type="text/javascript" src="${javascript_folder}/jqplot/plugins/jqplot.donutRenderer.js"></script>
    <script type="text/javascript" src="${javascript_folder}/gridly/jquery.gridly.js"></script>
    <script type="text/javascript" src="${javascript_folder}/jqplot/plugins/jqplot.highlighter.js"></script>
    <!-- Google Tag Manager -->
    <#assign gtmId = propsUtil.get("com.agipi.google.tag.manager.id")/>
	<script>
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','${gtmId}');</script>
	<!-- End Google Tag Manager -->
    
    <link rel="stylesheet" href="${css_folder}/print.css" media="print">
   	<link rel="stylesheet" href="${css_folder}/ie.css">
    <link rel="stylesheet" href="${css_folder}/jquery-ui.css">
    <link rel="stylesheet" href="${css_folder}/gridly/jquery.gridly.css" type="text/css" />
    <#include "ext_lib_js.ftl">
</head>

<body class="${css_class}" id="agipi">

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<#include "ext_lib_html.ftl">

<@liferay_ui["quick-access"] contentId="#main-content" />

<@liferay_util["include"] page=body_top_include />

<#if is_signed_in && isShowControlMenu>
    <@liferay.control_menu />
</#if>

<div class="container-fluid" id="wrapper">
    <header class="clearfix">

        <div id="cookie-handler" class="hidden">
            <@liferay_portlet["runtime"] defaultPreferences="" portletProviderAction=portletProviderAction.VIEW
                    instanceId="COOKIE_HANDLER_WQJ123" portletName="cookiehandler_WAR_comagipiportlet" />
        </div>

    	<div id="cookie-message" class="cookie-message-wrapper content-wapper hidden">
            <#assign VOID = freeMarkerPortletPreferences.setValue("displayStyle", "ddmTemplate_COOKIE_MESSAGE") />
            <#assign VOID = freeMarkerPortletPreferences.setValue("selectionStyle", "manual") />
            <@liferay_portlet["runtime"]
                    defaultPreferences="${freeMarkerPortletPreferences}"
                    portletProviderAction=portletProviderAction.VIEW
                    instanceId="COOKIE_MESSAGE_R6ZJ35"
                    portletName="com_liferay_journal_content_web_portlet_JournalContentPortlet" />
            ${freeMarkerPortletPreferences.reset()}
        </div>
    
        <div id="top-header" class="reset desktop-only clearfix">
            <div class="content-wrapper">
                <div class="top-header__slogan">
                    <h4><@liferay.language key="agipi.theme.header.title" /></h4>
                </div>
                <div class="top-header_member">

                    <#if isExtranetUser>
                        <#include "extranet/member_profil_block.ftl">
                        <#include "extranet/non_distributable_popup.ftl">
                    <#else>

                        <a class="member-space" href="${propsUtil.get('com.agipi.header.link.espace.adherent')}">
                            <img class="member-icon" src="${images_folder}/icons/adh_icon.svg">
                            <img class="member-icon_hover" src="${images_folder}/icons/adh_icon_hover.svg">
                            <span class="text"><@liferay.language key="agipi.theme.header.myspace" /></span>
                        </a>
                        <a class="become-member" href="${propsUtil.get('com.agipi.header.link.espace.conseiller')}">
                            <img class="member-icon" src="${images_folder}/icons/cons_icon.svg">
                            <img class="member-icon_hover" src="${images_folder}/icons/adh_icon_hover.svg">
                            <span class="text"><@liferay.language key="agipi.theme.header.member" /></span>
                        </a>

                    </#if>

                </div>
                <div class="clearfix"></div>
            </div>
        </div>

		<#include "navigation.ftl">

    </header>
    
	<div>
		<#if pageUrl != "/home">
			<div class="reset background-white breadcrumb-socials">
	            <div class="content-wrapper clearfix">

                    <#if !isExtranet>
                        <#include "social.ftl">
                    </#if>

			        <nav id="breadcrumbs" class="breadcrumb breadcrumb-horizontal desktop-only">
			        	<@liferay.breadcrumbs />
				    </nav>
				    
	            </div>
	        </div>
		</#if>
		
		
        
        <#if selectable>
                <@liferay_util["include"] page=content_include />
        <#else>
                ${portletDisplay.recycle()}

                ${portletDisplay.setTitle(the_title)}

                <@liferay_theme["wrap-portlet"] page="portlet.ftl">
                        <@liferay_util["include"] page=content_include />
                </@>
        </#if>
	</div>

    <#include "footer.ftl">
    <@liferay_portlet["runtime"]
        portletProviderAction=portletProviderAction.VIEW
        portletName="announcementpopup_WAR_comagipiportlet"
        queryString="action=showPopup"
        />
</div>

<@liferay_util["include"] page=body_bottom_include />

<@liferay_util["include"] page=bottom_include />

</body>

</html>


