// Center horrizontal for less than 360px devices
function centerPage(){
    if(viewport().width < 360){
        var decal = (360 - viewport().width)/2;
        $('body').animate({ scrollLeft:  decal});
    }
}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function errorMessage(inputInError, errorText){
    inputInError.next('.error-text').text( errorText );
}

function clearError(elem){
    $(elem).removeClass('error');
    $(elem).next('.error-text').text("");
}


function contactForm(){
    displayAdhesionNumber();

    $('input:radio[name="contactObjet"]').change(
        function(){
            $('#contact-info-about').parent().hide();
            $('#contact-claim-about').parent().hide();
            if (this.checked && this.value == 'info') {
                $('#contact-info-about').parent().show();
            }
            else if (this.checked && this.value == 'claim'){
                $('#contact-claim-about').parent().show();
            }
        });

    $('input:radio[name=contactMember]').change(
        function () {
            displayAdhesionNumber()
        }
    );

    function displayAdhesionNumber() {
        if ($('input:radio[name=contactMember]:checked').val() == 'oui') {
            $('#contact-member-number').show();
            $('#contact-member-number').prev(".label").show();
        }else{
            $('#contact-member-number').hide();
            $('#contact-member-number').prev(".label").hide();
            $('#contactNumeroAdherent\\.errors').empty();
        }
    }
}

function isDesktop(){
    if("matchMedia" in window) {
        return window.matchMedia("(min-width: 1025px)").matches;
    }
    else{
        return $(window).innerWidth() > 1024;
    }
}

function isMobile(){
    if("matchMedia" in window) {
        return window.matchMedia("(max-width: 720px)").matches;
    }
    else{
        return $(window).innerWidth() <= 720;
    }
}

function menu(){
    // for the different menu on the homepage
    var isHomepage = $('#main-menu').hasClass("homepage");

    // menu desktop to menu mobile
    $(window).on('ready resize load scroll', function(){
        if(isDesktop()){
            if($(this).scrollTop() > 78){
                $('#main-menu').addClass("fixed");
                $('#left-menu').addClass('left-menu-elastick');
                $('#main-menu').removeClass("homepage");
                $('header').css('height','180px');
                $("#main-menu .menu-link.extra").show();
                if(! $("#cookie-message").hasClass('hidden')){
                    $('#cookie-message').hide();
                    $('#wrapper').css("padding-top", "180px");
                }
            } else {
                $("#main-menu .menu-link.extra").hide();
                $('#main-menu').removeClass("fixed");
                $('#left-menu').removeClass('left-menu-elastick');
                if( !$("#cookie-message").hasClass('hidden')){
                    var heightElement = $('#cookie-message').height();
                    $('#wrapper').css("padding-top",  (heightElement + 180));
                    $('#cookie-message').show();
                }
            }

            if(isHomepage) {
                if($(this).scrollTop() > 78){
                    $('#main-menu').addClass("fixed");
                    $('#main-menu').removeClass("homepage");
                    $('header').css('height','180px');
                    $("#main-menu .menu-link.extra").show();
                } else {
                    $("#main-menu .menu-link.extra").hide();
                    $('#main-menu').removeClass("fixed");
                    $('#main-menu').addClass("homepage");
                }
            }

            if (isSignedIn) {
                if($(this).scrollTop() > 78){
                    $('#top-header .top-header_member').hide();
                    $("#main-menu .top-header_member").show();
                } else {
                    $("#main-menu .top-header_member").hide();
                    $('#top-header .top-header_member').show();

                }
            }

            // hide menu mobile in desktop
            $("#menu-mobile").removeClass("open");
            $('#main-menu .burger-btn').removeClass("open");
        }
        else{
            $('#main-menu').addClass("fixed");
            $('header').css('height','60px');
            $("#main-menu .menu-link.extra").show();
            // hide menu desktop in mobile
            $('#main-menu .level2').removeClass('open');
        }
    });

    //Cookie message
    var confirmedCookieName = "COOKIE_MESSAGE_CONFIRMED";
    $("#cookie-message .close-message").click(function(e){
        $("#cookie-message").addClass("hidden");
        $('.home-block .content-wrapper').removeClass('exendCookies');
        $(".container-fluid").removeClass("cookie-padding");
        $("#agipi .search").removeClass("cookie-margin-mobile");
        $("#agipi #menu-mobile").removeClass("cookie-padding-mobile");
        $('.breadcrumb-socials').removeClass('cookie-show').addClass('cookie-hide');
        addCookie(confirmedCookieName, "true");
        marginIfCookie();
        if($(window).width() > 1024) {
            $('#wrapper').css('padding-top', '160px');
        } else {
            $('#wrapper').addClass('comlite-hide-cookies');
        }
        e.preventDefault();
    });
    var confirmedCookie = getCookie(confirmedCookieName);
    if (confirmedCookie != "true" &&
        (!$('#cookie-message-block').hasClass('emptyCookie') || (isSignedIn && !hasAdherentRole))) {
        $("#cookie-message").removeClass("hidden");
        $(".container-fluid").addClass("cookie-padding");
        $("#agipi .search").addClass("cookie-margin-mobile");
        $("#agipi #menu-mobile").addClass("cookie-padding-mobile");
    }

}

function menuDesktop(){
    // for the different menu on the homepage
    var isHomepage = $('#main-menu').hasClass("homepage");

    $("#main-menu .menu-link.search .search-menu-btn, #main-menu .menu-link.search .search-btn-right").click(function(e){
        if(isDesktop()){
            if(!$(this).parent().hasClass('open')){
                $(this).parent().addClass('open');
            }
            else{
                $("#main-menu .menu-link form.search-form").submit();
            }
        }
    });


    $('#main-menu .menu-link a').on('click', function(e){
        var id = $(this).data('id');

        if($('#main-menu .level2[data-id="'+id+'"]').length > 0 ){
            e.preventDefault();
        }
        $('#main-menu').removeClass("homepage");
        $('#main-menu .level2').removeClass('open');


        if( id ){
            $('#main-menu .level2[data-id="'+id+'"]').addClass('open');
        }
    });


    $("#main-menu, #main-menu .level1, #main-menu .level2, #main-menu .level2 .col").on('click', function(e){
        if(e.target == this){
            $('#main-menu .level2').removeClass('open');
            if(isHomepage && $(window).scrollTop() <= 78){
                $('#main-menu').addClass("homepage");
            }
        }
    });


    $('#main-menu').on('mouseleave', function(){
        $('#main-menu .level2').removeClass('open');
        $('#main-menu').removeClass('homenew');
        if(isHomepage && $(window).scrollTop() <= 78){
            $('#main-menu').addClass("homepage");
        }
    });
}

function mouseover() {
    $('#main-menu .menu-link a[href]').on('mouseover', function(e){
        if($('#main-menu').hasClass('homepage')) {
            $('#main-menu').removeClass('homenew').addClass('homepage');
        }
        if($('#main-menu').hasClass('fixed')) {
            $('#main-menu').removeClass('homepage homenew');
        }
        else {
            $('#main-menu').removeClass('');
        }
    });

    if($('#main-menu').hasClass('')) {
        $('#main-menu .menu-link a:not([href]), #main-menu .menu-link a[href]').on('mouseover', function(e){
            $('#main-menu').removeClass('homenew homepage').addClass('');
        });
    }
}
function backOfice() {
    var isBack = $('body').hasClass('has-control-menu');
    var isHomepage = $('#main-menu').hasClass("homepage");

    $("#main-menu .menu-link.search .search-menu-btn, #main-menu .menu-link.search .search-btn-right").click(function(e){
        if(isDesktop()){
            if(!$(this).parent().hasClass('open')){
                $(this).parent().addClass('open');
            }
            else{
                $("#main-menu .menu-link form.search-form").submit();
            }
        }
    });

    $('#main-menu .menu-link a').on('click', function(e) {
        $('#main-menu .level2').removeClass('open');
        var id = $(this).data('id');
        if (id) {
            $('#main-menu .level2[data-id="' + id + '"]').toggleClass('open');
        }
    });
}

function menuMobile(){
    $('#main-menu .burger-btn').click(function(){
        $(this).toggleClass('open');
        $("#menu-mobile").toggleClass("open");
    });

    $("#main-menu .menu-link.inBurger").each(function(){
        if($("#menu-mobile").text().indexOf($(this).text()) === -1){
            var cloneItem = $(this).clone();
            var cloneSubMenu = $("#main-menu .level2[data-id='"+$("a", this).data('id')+"']").clone();
            if (cloneItem.hasClass('search')) {
                cloneItem.removeClass('with-arrow');
            }
            cloneItem.removeClass("desktop-only");
            cloneItem.removeClass('with-arrow');
            if (cloneSubMenu.size()) {
                cloneItem.addClass('with-arrow');
            }
            $("#menu-mobile").append(cloneItem);
            $("#menu-mobile").append(cloneSubMenu);
        }
    });

    $("#menu-mobile .menu-link:not('.search')").on("click", function(e){
        if($(this).next(".level2").length > 0){
            e.preventDefault();
        }
    });

    $("#menu-mobile .search-btn-right").on('click', function(){
        $("#menu-mobile form.search-form").submit();
    });


    $('.spaces-access-menu').on("click", function(e){
        $('.spaces-access-block').toggleClass('open');
        e.preventDefault();
    });

    // click outside the spaces-access-block hide it
    $(document).mouseup(function(e) {
        var container = $('.spaces-access-block');
        var button = $('.spaces-access-menu');
        if (!container.is(e.target) && container.has(e.target).length === 0 && !button.is(e.target) && button.has(e.target).length === 0) {
            container.removeClass('open');
        }
    });

}

function slider(){
    $(".content-slider").lightSlider({
        loop:true,
        keyPress:true,
    });
    var showGallery = true;
    if(isMobile()){
        showGallery = false;
    }
    $('.image-gallery').lightSlider({
        gallery:showGallery,
        item:1,
        slideMargin: 0,
        auto:false,
        loop:true,
        onSliderLoad: function() {
            $('#image-gallery').removeClass('cS-hidden');
        }
    });
}


function zoombox(){
    if(isDesktop()){
        $('a.zoombox').zoombox({
            theme       : 'zoombox',        //available themes : zoombox,lightbox, prettyphoto, darkprettyphoto, simple
            opacity     : 0.8,              // Black overlay opacity
            duration    : 500,              // Animation duration
            animation   : true,             // Do we have to animate the box ?
            gallery     : true,             // Allow gallery thumb view
            autoplay    : false,            // Autoplay for video
        });
    }

}

function scrollToAnchor(){
    $('a[href*="#detail_uc_"],a[href="#agipi"]').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            var menuHeight = 90;
            if(!isDesktop()){
                menuHeight = 60;
            }
            if($('.thin-menu:visible').length > 0){
                menuHeight += 60;
            }
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - menuHeight
                }, 1000);
                return false;
            }
        }
    });
}

function activeThinMenuOnScroll(){
    if($('.thin-menu:visible').length > 0){
        var scrollNav = $('div[id*="detail_uc_"]');
        scrollNav.waypoint(function(direction) {
            if (direction === 'down') {
                $('.thin-menu a').removeClass('active');
                $('.thin-menu a[href="#'+$(this)[0].element.id+'"]').addClass('active');
            }
        }, {
            offset: '40%'
        });
        scrollNav.waypoint(function(direction) {
            if (direction === 'up') {
                $('.thin-menu a').removeClass('active');
                $('.thin-menu a[href="#'+$(this)[0].element.id+'"]').addClass('active');
            }
        }, {
            offset: '0'
        });
    }

}

function stickyThinMenu(){
    if($('.thin-menu:visible').length > 0){
        var menuHeight = 89;
        // need onload to get the real top position (after css load)
        $(window).on('load',function(){
            posThinMenu = $('.thin-menu').offset().top;
        });
        posThinMenu = 999999; // default value before page load
        $(window).on('load scroll',function(){
            if( ($(window).scrollTop() + menuHeight) >= posThinMenu ){
                $('.thin-menu').parent().parent().addClass("sticky-thin-menu");
                $('.thin-menu').parent().parent().next().css('marginTop','62px');
            }
            else{
                $('.thin-menu').parent().parent().removeClass("sticky-thin-menu");
                $('.thin-menu').parent().parent().next().css('marginTop','0');
            }
        });
    }
}

function listActuFilter() {
    $("#filter-list-actu").change(function() {
        window.location.href = $(this).val().replace(/^.*\/\/[^\/]+/, '');
    });
}


function marginIfCookie(){
    if(isDesktop()){
        if(! $("#cookie-message").hasClass('hidden')){
            var heightCookieBar = $("#cookie-message").height() + 20;
            var paddingTopWrapper = $('#wrapper').css("padding-top");
            var valuePadding = paddingTopWrapper.replace('px','');
            var newPadding = +valuePadding + +heightCookieBar;
            $('#wrapper').css("padding-top", newPadding + "px");
        }
    }
}

function pressSpace() {

    var nativePagnULs = $('.press-space .taglib-page-iterator .dropdown-menu');

    var maxQntPages = 0;
    jQuery.each(nativePagnULs, function( index, paginationList ) {
        var currQnt = $(paginationList).find("li").length;
        if (currQnt > maxQntPages) {
            maxQntPages = currQnt;
        }
    });

    if (maxQntPages > 0) {
        initCommonPagination(maxQntPages)
    }

    $('#common-press-pagination').on('click', 'li', function() {

        $(this).parent().find('span').removeClass('active-pagination');
        $(this).find('span').addClass('active-pagination');
        var pageNumber = $(this).attr('data-page-number');

        var contentParams = '';
        var allPressContainers = $('.press-space .press-block');
        jQuery.each(allPressContainers, function( index, pressContainer ) {

            var pressPortletId = $(pressContainer).find(".portlet").attr("id").replace(/^portlet_/, '');
            var queryString = "p_p_id=" + pressPortletId + "&p_p_lifecycle=0"
                + "&p_p_state=normal&p_p_mode=view&_" + pressPortletId + "_delta=3"
                + "&p_r_p___resetCur=false&_" + pressPortletId + "_cur=" + pageNumber;
            if (!contentParams) {
                contentParams += queryString;
            } else {
                contentParams += ("&" + queryString);
            }

        });

        window.location.search = "?" + contentParams + "&activeTab=" + pageNumber;

    });

}

function initCommonPagination(pageQnt) {
    var activeTab = getParameterByName('activeTab');
    if (activeTab === null) {
        activeTab = 1;
    }
    var commonPagination = $('#common-press-pagination .pagination-list');
    var commonUl = $(commonPagination).append('<ul></ul>').find('ul');
    for (var i = 1; i <= pageQnt; i++) {
        commonUl.append('<li data-page-number="' + i + '"><span>Page ' + i + " sur " + pageQnt + '</span></li>');
    }
    $('<p>Page ' + activeTab + ' sur ' + pageQnt + '<i class="fa fa-caret-down" aria-hidden="true"></i></p>').insertBefore(commonUl);
    $('#common-press-pagination').removeClass('hide');
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function togleList(){
    $(document.body).on('click', '.pagination-list', function () {
        $('.pagination-list ul').toggle();
    });
}

function Artpagination() {
    $('.list-actu .lfr-pagination-config').on('click', function () {
        $('.list-actu .taglib-page-iterator .lfr-pagination .dropdown-toggle').addClass('pagination-click');


        if($('#agipi .list-actu .lfr-pagination .lfr-pagination-config .dropdown-toggle').hasClass('pagination-click')) {
            $('.list-actu .current-page-menu').removeClass('open');
            $('.lfr-pagination-page-selector ul').toggleClass('open');
        }
    });

    $('.list-actu .lfr-pagination-page-selector').prepend('<i class="fa fa-caret-down" aria-hidden="true"></i>');



    $('.references__list .lfr-pagination-config').on('click', function () {
        $('.references__list .taglib-page-iterator .lfr-pagination .dropdown-toggle').addClass('pagination-click');
        if($('#agipi .references__list .lfr-pagination .lfr-pagination-config .dropdown-toggle').hasClass('pagination-click')) {
            $('.references__list .current-page-menu').removeClass('open');
            $('.lfr-pagination-page-selector ul').toggleClass('open');
        }
    });
    $('.references__list .lfr-pagination-page-selector').prepend('<i class="fa fa-caret-down" aria-hidden="true"></i>');

    ////fil d'actualite paginator////
    var pagCast = $('.right-part__blog-list .lfr-pagination-config').length;
    var startEv = '<div class="custum-click"></div>';
    if( pagCast > 0) {
        $('.lfr-pagination-config').append(startEv);
        var el = $('.custum-click');
        var el2 = $('ul.dropdown-menu.lfr-menu-list');
        var link = $('.dropdown-toggle');
        $('.custum-click').on('click', function () {
            $('.direction-down').toggle();
        });
        $(document).mouseup(function (e) {
            if (!el.is(e.target) && el2.has(e.target).length === 0) {
                el2.hide();
                link.show();

            }
        });
    }
}

function articleThumbnail() {
    $('.article-thumbnail').on('click', function () {
        window.location.href = "/actualites-details/" + $(this).attr('data-article-url-title');
    });
}

function scrollToSearchResult() {
    var target = $('#result-msg');
    var menuHeight = 90;
    if(!isDesktop()){
        menuHeight = 60;
    }
    if($('.thin-menu:visible').length > 0){
        menuHeight += 60;
    }
    if (target.length) {
        $('html, body').stop().animate({
            scrollTop: target.offset().top - menuHeight
        }, 500);
    }
}

function textCat() {
    $("#agipi #wrapper .card .content .title").dotdotdot();
    $("#agipi #wrapper .press-space .card-press-container .card-press h4").dotdotdot();
    $("#agipi #wrapper .content .summary").dotdotdot();
    $(".small-info-block .infos-content").dotdotdot();
    $("#agipi #wrapper .card.big .content .title span").dotdotdot();
    $(".prevoyance--pratique .small-info-block p").dotdotdot();
    $(".right-part__blog-item .content-title").dotdotdot();
    $(".right-part__blog-item .content-text").dotdotdot();
    $('.block-part--wrapper .block-part--container .content, .actualies_slider__content').dotdotdot();
    $('.summary').dotdotdot();
}

function AdaptiveMenu() {
    if($(window).width() > 1025) {
        $('#menu-mobile .menu-link a').on('click', function () {
            var id = $(this).data('id');
            var link = $('#menu-mobile .menu-link a').hasClass('open');
            var opened = $('#menu-mobile .menu-link a').next('.level2').hasClass('opened');

            $('#menu-mobile .menu-link a').removeClass('open');
            $('#menu-mobile .level2').removeClass('opened');
            if (link) {
                $(this).removeClass('open');
            } else {
                $(this).addClass('open');
                $('#menu-mobile .menu-link').next('#menu-mobile .level2[data-id="' + id + '"]').addClass('opened');
                $.fn.equivalent = function () {
                    var $blocks = $(this),
                        maxH = $blocks.eq(0).height();

                    $blocks.each(function () {
                        maxH = ( $(this).height() > maxH ) ? $(this).height() : maxH;
                        if ($(this).height() > maxH) {
                            maxH = $(this).height();
                        }
                    });
                    $blocks.height(maxH);
                }
                if ($('[data-id="' + id + '"]').hasClass('opened')) {
                    $('.level2[data-id="' + id + '"] .left-element .title').equivalent();
                    $('.level2[data-id="' + id + '"] .left-element .links').equivalent();
                    $('.level2[data-id="' + id + '"] .left-element .subtitle').equivalent();
                    $('.level2[data-id="' + id + '"] .left-element .col').equivalent();
                }
            }
        });
    }  else {
        $('#menu-mobile .menu-link a').on('click', function () {
            var id = $(this).data('id');
            var target = $(this).attr('href');
            var link = $(this).hasClass('open');
            var opened = $(this).next('.level2').hasClass('opened');
            $(this).addClass('open');
            if (!target) {
                $(this).parent().addClass('arrow-up');
                $(this).parent().next('.level2[data-id="' + id + '"]').addClass('opened').animate({scrollTop: 0});
                if (link) {
                    $(this).removeClass('open');
                    $(this).parent().removeClass('arrow-up');
                    $(this).parent().next('.level2[data-id="' + id + '"]').removeClass('opened');
                } else {
                    $(this).parent().addClass('arrow-up');
                    $(this).addClass('open');
                    $(this).parent().next('.level2[data-id="' + id + '"]').addClass('opened');
                }
            }
        });
    }

    if ($('body').hasClass('signed-in')) {
        $('#menu-mobile').addClass('extranet-mobile');
    }
}


function profileDetails() {
    $('[data-init=profil-bth]').on('click', function () {
        $('.profile-bth').toggleClass('down');
        $('.user-details').toggle();

    });
}

function extranetPlot() {
    try {
        var data = $.parseJSON($('#chart4').attr('data-graph-datas'));
        var dataArray = [];

        var labelsToColors = {
            'AC' : "#a02321",
            'OB' : "#28a089",
            'PT' : "#6e4d8f",
            'FE' : "#146faf",
            'SP' : "#9fbc3d",
            'EC' : "#0d3886",
            'FD' : "#146faf",
            'DI' : "#e3904f",
            'AU' : "#CCCCCC"
        };

        var colors = [];

        $.each(data, function (index, value) {
            var currentColor = labelsToColors.hasOwnProperty(value['code'])
                ? labelsToColors[value['code']]
                : '#000';
            colors.push(currentColor);
            dataArray.push([value['libelle'], value['montantEpargneGeree'], value['pourcentageAffecte'], value['code']]);
        });

        $.jqplot.postDrawHooks.push(function () {
            var labels = $('.jqplot-donut-series.jqplot-data-label');
            $.each(labels, function (index, value) {

                if ($(this).hasClass('right-series') || $(this).hasClass('left-series')) {
                    return false;
                }

                var currentData = dataArray[index];
                var currentLabel = '<span class="jqplot-data-label-inner" style="color: '
                    + colors[index] + ';">' + currentData[2] + '%</span><span style="display: none;">' + currentData[1] + '</span>';
                $(value).html(currentLabel);

                if((currentData[2]) === 0) {
                    $(this).addClass('none').hide();
                }

            });
        });

        if ($(window).width() > "720") {
            var plot4 = $.jqplot('chart4', [dataArray], {

                series: [],
                seriesDefaults: {
                    // make this a donut chart.
                    renderer: $.jqplot.DonutRenderer,
                    rendererOptions: {
                        // Donut's can be cut into slices like pies.
                        sliceMargin: 2,
                        shadowOffset: 0,
                        // Pies and donuts can start at any arbitrary angle.
                        startAngle: 0,
                        showDataLabels: true,
                        // By default, data labels show the percentage of the donut/pie.
                        // You can show the data 'value' or data 'label' instead.
                        dataLabels: 'label',
                        // "totalLabel=true" uses the centre of the donut for the total amount
                        totalLabel: false,
                        dataLabelPositionFactor: 2,
                        seriesColors: colors,
                        lineWidth: 2.5,
                        innerDiameter: 145,
                        diameter: 215,
                        dataLabelThreshold: 0,
                        highlightMouseOver:false,
                        highlightMouseDown: false
                    }
                },
                legend: { show:true, location: 'e' },
                highlighter: {
                    tooltipContentEditor: function (str, seriesIndex, pointIndex) {
                        var formatted = parseFloat(str.split(',')[1].trim());
                        var tmp;
                        var formattedPrice = '';
                        while (formatted / 1000 >= 1) {
                            var temp = ((formatted % 1000).toFixed(2)).replace('.00', '');
                            if (temp === 0) {
                                temp = '000'
                            }  else if (temp < 100) {
                                temp = '0' + temp;
                            }
                            formattedPrice = ' ' + temp + ' ' + formattedPrice;
                            formatted = ~~(formatted / 1000);
                        }

                        return str.split(',')[0] + ' : ' + ( formatted + formattedPrice).replace('.', ',')  + '€';
                    },
                    show: false,
                    useAxesFormatters: false,
                    tooltipFormatString: '%s'
                },

                grid: {
                    background: '#fff',
                    drawBorder: false,
                    shadow: false
                }
            });
        } else {
            var block = $('#chart4');
            var currentData, currentLabel, styles, progbar = "";

            $.each(dataArray, function (index, value) {
                currentData = dataArray[index];
                currentLabel = '<p class="progbar-label" style="color: '
                    + colors[index] + ';">' + currentData[2] + '%' + "<span>" + currentData[0] + "</span></p>";

                styles = 'background:' + colors[index] + ';' + 'width:' + currentData[2] + '%';

                progbar += currentLabel + '<div class="prog-wrap"><p class="prog-bar" style="' + styles + '"></p></div>';

            });
            $(block).html(progbar);
        }
    } catch (e) {
        var src = $('.logo').find('img').attr('src').split('images')[0];
        $('#chart4').parent().closest('section').html('<img src="' + src + 'images/icons/no-data.jpg">');
        $('#chart4').parent().closest('section').closest('div.right').css('height', '410px');
        if ($(window).width() < 720) {
            $('#chart4').parent().closest('section').parent().hide();
        }
    }
}

function contractThumbnail() {
    $('.miniContractBlock').on('click', function () {
        var win = window.open($(this).attr('data-detail-url'), '_self');
        win.focus();
    });
}

function dragget() {
	
    function gridlyResize() {

        if($('.content-block.prevoyance--pratique').size() < 1 ) {
            if ($(window).width() < 1300) {
                var width = $(window).width();
                $('.inform-container').width(width / 1.2);
                var oldGrid = $('.gridly');
                oldGrid.removeAttr('style');
                oldGrid.clone().insertAfter(oldGrid);
                oldGrid.remove();
                $('.gridly').gridly(getGridlySettings());
            }
            if ($(window).width() < 1200) {
                var width = $(window).width();
                $('.inform-container').width(width / 1.15);
                var oldGrid = $('.gridly');
                oldGrid.removeAttr('style');
                oldGrid.clone().insertAfter(oldGrid);
                oldGrid.remove();
                $('.gridly').gridly(getGridlySettings());
            }
            if ($(window).width() < 1100) {
                var width = $(window).width();
                $('.inform-container').width(width / 1.05);
                var oldGrid = $('.gridly');
                oldGrid.removeAttr('style');
                oldGrid.clone().insertAfter(oldGrid);
                oldGrid.remove();
                $('.gridly').gridly(getGridlySettings());
            }
        }
    }

    function blockInfos() {
        $('.gridly').gridly(getGridlySettings());

        $(window).resize(function(){
            if($(window).width() < 1300) {
                gridlyResize();
            }
        });

        $(document).on("click", ".gridly .delete", function(event) {
            var $this;
            event.preventDefault();
            event.stopPropagation();
            $this = $(this);
            $this.closest('.brick').remove();
            removeBlock($this.attr("data-portletInstanceId"));
            return $('.gridly').gridly('layout');
        });

    }

    function getGridlySettings() {

        if (($(window).width() > 1023) && ($(window).width() < 1300)) {
            return {
                base: 170.7,
                gutter: 2,
                columns: 6,
                callbacks: {
                    reordered: function($currElements, $newElements) {updateGrid($currElements, $newElements);}
                }
            };
        } else if ($(window).width() < 767) {
            return {
                base: 38.7,
                gutter: 2,
                columns: 6,
                callbacks: {
                    reordered: function($currElements, $newElements) {updateGrid($currElements, $newElements);}
                }
            };
        } else if ($(window).width() < 1024) {
            return {
                callbacks: {
                    reordering: function ($elements, dragged) {
                        $('.small-info-block-base').removeClass('dragging');
                    }
                }
            };
        }

        return {
            base: 38.7,
            gutter: 2,
            columns: 35,
            callbacks: {
                reordered: function($currElements, $newElements) {updateGrid($currElements, $newElements);}
            }
        };
    }

    function updateGrid($currElements, $newElements) {
        if(hasPermissions) {
            updateBlocks($newElements);
        } else {
            var newPositions = [];
            for (var i = 0; i < $currElements.length; i++) {
                var $currElem = $($currElements[i]).attr("data-portletInstanceId");
                var $newElem = $($newElements[i]).attr("data-portletInstanceId");
                if ($currElem !== $newElem) {
                    newPositions.push({position : i, time : Date.now(), portletId : $newElem});
                }
            }
            updateUserPositions(JSON.stringify(newPositions));
        }
    }

    function updateBlocks($newElements){
        var blocksJson = JSON.stringify($newElements.map(function(){return $(this).attr("data-portletInstanceId");}).get());
        $.ajax({
            url : updateAjaxURL,
            data : {
                blockIds: blocksJson
            },
            type: 'POST'
        });
    }

    function removeBlock(blockId){
        $.ajax({
            url : removeAjaxURL,
            data : {
                blockId: blockId
            },
            type: 'POST'
        });
    }

    function updateUserPositions(positions) {
        $.ajax({
            url: updateUserPositionsURL,
            data: {
                newPositionsJSON: positions
            },
            type: 'POST'
        });
    }

    blockInfos();
    gridlyResize();
    $('.gridly').gridly('draggable', 'off');
}

function updateContractLabel(formCurr) {
    var contractLabel = '';
    formCurr.find('.adresses-step-1 .chx-mdf').each(function () {
        if ($(this).is(':checked')) {
            var contractId = $(this).attr("data-contract-id");
            var code = $(this).attr("data-contract-code");
            if (contractId !== '' && code !== '') {
                var label = '';
                if (contractLabel !== '') {
                    label = ', ';
                }
                label = label + code + ' ' + numIcon + ' ' + contractId;
                contractLabel = contractLabel + label;
            }
        }
    });
    if (contractLabel !== '') {
        formCurr.find(".modification-body").text(contractLabel);
    }
}

function formInterface() {
    var label = $('.inform-personal-block .inform-personal-block__label, .email-addres-block .inform-personal-block__label');
    var value = $('.inform-personal-block .inform-personal-block__value, .email-addres-block .inform-personal-block__value');
    var infobull = $('.email-addres-block .infobull-check-email');

    function showForm() {
        $(this).parent().find(label).hide();
        $(this).parent().find(value).hide();
        $(this).parent().find(infobull).hide();
        $('body').find('.infobull-check-email').hide();
        $(this).parent().find('.change').show();
        $(this).parent().addClass('change-form');
        $(this).hide();

        if($(this).parent().find('.password-form').size()) {
            $(this).parent().addClass('password-change-form');
        }

        $('body').find('.send-cancel').on('click', function () {
            $(this).parent().parent().removeClass('change-form');
            $(this).parent().parent().removeClass('password-change-form');
            $(this).parent().parent().removeClass('fail-validate');
            $(this).parent().hide();
            $('body').find('.infobull-check-email').hide();
            $(this).parent().parent().find(label).show();
            $(this).parent().parent().find(value).show();
            $(this).parent().parent().find('.inform-personal-block__bth').show();
            $(this).parent().find('.password-form').find('span.error-validate').hide();

        });
    }

    function initForms() {
        if (typeof showPasswordForm !== 'undefined' && showPasswordForm) {
            showForm.call($('.password-form-block .inform-personal-block__bth'));
        }
        if (typeof showEmailForm !== 'undefined' && showEmailForm) {
            var $buttEmail = $('.email-addres-block .inform-personal-block__bth');
            showForm.call($buttEmail);
        }
    }

    initForms();


    $('.email-addres-block .inform-personal-block__bth').on('click', function (e) {
        e.preventDefault();
        var div = $(this).parent();
        $(this).hide();
        $(this).parent().find(infobull).hide();
        div.css('position', 'static');
        div.find('.adres-block-form-change').show();
        div.find('.adres-block-form-change').show();
        if($(window).height() < 350) {
            div.find('.adres-block-form-change form').addClass('js-height-form-small');
        }
    });

    function adressesChange() {
        $('[data-init=close-form]').on('click', function (e) {
            e.preventDefault();
            $('.adres-block-form-change').hide();
            $('.email-addres-block').css('position', 'relative');
            $('.email-addres-block').find('.inform-personal-block__bth').show();
            $('.adresses-list').find('.inform-personal-block__bth').show();
            $('.adres-block-form-change').find('input[type=text], textarea, input[type=password]').each(function () {
                $(this).val('');
            });
            $('.adres-block-form-change').find('input[type=checkbox]').each(function () {
                $(this).removeAttr('checked');
            });
            $('.adres-block-form-change .adresses-step-1, .adres-block-form-change .adresses-step-2').hide().parent().removeClass('js-height-form');
            $('.adres-block-form-change .adresses-step-1').find('.contract-checkbox').removeClass('selected');
            $('.adres-block-form-change .adresses-step-1, .adres-block-form-change .adresses-step-2, .adres-block-form-change .adresses-step-password-check').find('.error-validate').hide();
            $('.adres-block-form-change').find('.adresses-step-password-check').show();
        });

        $('.adresses-list').find('.inform-personal-block__bth').on('click', function (e) {
            e.preventDefault();
            $(this).hide();
            $(this).parent().parent().find('.adres-block-form-change').show();
        });

        $('.adresses-step-1 .popup-bth__border').on('click', function () {
            var formCurr = $(this).closest('.adresses-list');
            var isValidForm = false;
            formCurr.find('.adresses-step-1 .chx-mdf').each(function () {
                if ($(this).is(':checked')) {
                    isValidForm = true;
                }
            });
            if (isValidForm) {
                $(this).parent().parent().hide();
                $(this).parent().parent().parent().find('.adresses-step-2').show();
                var target = $('.adresses-step-2');
                $('#addressForm').stop().animate({
                    scrollTop: 0
                }, 1000);
                updateContractLabel(formCurr);
                formCurr.find('.checkbox-error').hide();
            } else {
                formCurr.find('.checkbox-error').show();
            }
        });

        $('.adresses-step-2 .popup-bth__border').on('click', function () {
            $(this).parent().parent().hide();
            $(this).parent().parent().parent().find('.adresses-step-1').show();
        });

        $('.adresses-step-1 .chx-mdf').on('click', function () {
            if($(this).is(':checked')) {
                $(this).parent().addClass('selected');
            } else {
                $(this).parent().removeClass('selected');
            }
            // $(this).toggleClass('selected');
            // // $(this).find(".chx-mdf").attr("checked", true);
        });

        if($('.adresses-step-2 ').find('.error-validate').size() > 0) {
            $('.adres-block-form-change').find('form').first().addClass('js-height-form');
        }
    }

    adressesChange();

    if ($('.password-form-block').hasClass('fail-validate') && $('.password-form-block').hasClass('password-change-form')) {
        $('.password-form-block').removeClass('password-change-form');
    }

    checkPassword();

    var activeForm = $('.displayFormOp');
    if (activeForm) {
        activeForm.find('.adres-block-form-change').show();
        activeForm.find('.adresses-step-2').show();
        activeForm.find('.adresses-step-password-check').hide();
        var checkboxes = activeForm.find('.adresses-step-1');
        checkboxes.find('label').each(function () {
            if ($(this).find(".chx-mdf").is(':checked')) {
                $(this).toggleClass('selected');
            }
        });
        updateContractLabel(activeForm);
    }
}



function breadcrumbMarginStyle() {

    var blueMain = $('#main-menu').find('div.extranet-header').size();

    if ($("#cookie-message").hasClass("hidden")) {
        $('.breadcrumb-socials').addClass('cookie-hide');
    } else {
        $('.breadcrumb-socials').addClass('cookie-show');
        if($(window).width() < 1025) {
            $('.breadcrumb-socials').removeClass('cookie-hide');
        }
    }

    if (blueMain > 0) {
        $('.breadcrumb-socials').addClass('show-breadcrumb-in');
        $('.breadcrumb-socials').find('.content-wrapper').css('border', 'none');
        if($(window).width() < 1025) {
            $('.breadcrumb-socials').removeClass('show-breadcrumb-in');
        }
    } else {
        $('.breadcrumb-socials').removeClass('show-breadcrumb-in');
    }

}

function phoneFocus() {
    $('.contracts-block__link').on('click', function (e) {
        e.preventDefault();
        if($(window).width() < 1025) {
            $(this).toggleClass('phone-focus');
        }
    });
}


//extranet

function changePage(page, obj) {
    if ($(obj).hasClass('active')) {
        return;
    }
    var parent = $(obj).closest('.contracts__list');
    parent.find('ul').find('li').removeClass('active');
    $(obj).addClass('active');
    parent.find('.contracts-block').hide();
    parent.find('.contracts-block.contracts-block-page-' + page).show();
    parent.find('.pagination').find('.pagination-list').find('span').first().text(page);
}

function paginationCustom() {
    $('.contracts__list').each(function () {
        var blocks = $(this).find('.contracts-block');
        var pagenation = Math.ceil(blocks.size() / 3);
        var li = '';
        var page = 1;
        var i = 0;
        blocks.each(function (index) {
            if (((index + 1) % 3 === 0) || (blocks.size() === index + 1)) {
                li += '<li onclick="changePage(' + page + ', this)">Page ' + page + ' sur ' + pagenation + '</li>';
                $(this).addClass('contracts-block-page-' + page);
            }
            if ((index + 1) % 3 > 0) {
                $(this).addClass('contracts-block-page-' + page);
            }

            if (page !== 1) {
                $(this).css('display', 'none');
            }

            if ((index + 1) % 3 === 0) {
                page++;
            }
        });

        if (blocks.size() > 3) {
            $(this).append('<div class="pagination">' +
                '<div class="pagination-list">' +
                '<p>Page <span>1</span> sur ' + pagenation + '<i class="fa fa-caret-down" aria-hidden="true"></i></p>' +
                '<ul>' + li + '</ul>' +
                '</div>' +
                '</div>');

            $(this).find('ul').find('li').first().addClass('active');

            $(this).find('.contracts__list .pagination-list').on('click', function () {
                $(this).find('ul').toggle();
            });
        }
    });
}

function myDocumentScroll() {
    var fullScreen = $(window).width() > 767;
    var mobileScreen = $(window).width() < 1025;

    if (fullScreen) {
        $(".simple .documents-nav").on("click","a", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top - 130;
            $('body, html').animate({scrollTop: top}, 1000);
        });
    }

    if (mobileScreen) {
        $(".simple .documents-nav").on("click","a", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href');
            $('.group-block').hide();
            $(id).show();
            $('body, html').animate({scrollTop: 0}, 1000);
        });
        $(".simple .documents-nav").find('a').first().trigger('click');
    }
}


function documentsNav() {
    var mobileScreen = $(window).width() < 1025;

    if ($('.page-top-title').size() < 1) {
        $('.my-documents').css('margin-top', '40px');
    }

    if (mobileScreen){
        $('.simple').find('.documents-nav').appendTo(".page-top-title .content-wrapper");
        if($('body').find('.content-wrapper.simple ').size() > 0) {
            $('.page-top-title').find('.documents-nav').parent().addClass('simple');
        }

        if ($('.page-top-title').size() < 1) {
            $('.documents-nav-phone-fixed').css('top', '60px');
        }

        if ($('.simple .documents-nav .documents-nav__item').size() < 2) {
            $('.simple .documents-nav .documents-nav-fixed-bth').hide();

        } else {
            $('.simple  .documents-nav .documents-nav-fixed-bth').show();
        }

        $('.simple .documents-nav').addClass("documents-nav-phone-fixed");

    }

    $(".simple .documents-nav-fixed-bth").on('click', function () {
        var mobileScreen = $(window).width() < 1025;
        var block = $(this).parent();
        block.toggleClass('opened');
        if (mobileScreen) {
            if (block.hasClass('opened')) {
                $('.simple .documents-nav .documents-nav__item').show();
                $('.simple .documents-nav-fixed-bth').css('width', '20');
            } else {
                $('.simple .documents-nav .documents-nav__item').hide();
                $('.simple .documents-nav .documents-nav__item.documents-nav__item_active').show();
            }
        }
    });


    $('.simple .documents-nav__item').on('click', function () {
        $('.simple .documents-nav .documents-nav__item').removeClass('active-nav-link');
        $(this).addClass('active-nav-link');
        if ($(window).width() < 1025){
            $('.simple .documents-nav .documents-nav__item').hide();
            $(this).show();
            $('.simple .documents-nav-phone-fixed').removeClass('opened');
        }
    });
}

//extranet

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function errorMassageStyle() {
    var error = $('.consultant__page').find('.extranet-error-portal').size();
    if (error > 0) {
        $('.contracts__head').addClass('have-error');
    }
}

function formValidFocus() {
    var noValidate = $('.informations-parrain__wrap').find('.field--warning').size();

    if (noValidate > 0) {
        $('.informations-parrain__wrap').find('.field--warning').get(0).focus();
    }
}

function checkPassword() {
    $('.adresses-step-password-check').on('submit', function (e) {
        e.preventDefault();
        $('.adres-block-form-change').find('form').first().addClass('js-height-form');
        var formCurr = $(this).closest(".adresses-step-password-check");
        var password = formCurr.find('input[name="password"]').val();
        var emptyPasswordMsgBlock = formCurr.find( ".field-empty" );
        var dataErrorMsgBlock = formCurr.find( ".data-error" );
        if (password === '') {
            emptyPasswordMsgBlock.show();
            dataErrorMsgBlock.hide();
            return;
        }
        emptyPasswordMsgBlock.hide();
        $.ajax({
            url     : formCurr.attr('action'),
            type    : 'POST',
            dataType: 'json',
            data : {
                password: password
            },
            success : function(data) {
                if (data === '\"ok\"') {
                    if (formCurr.hasClass('email-popin')) {
                        enableEmailForm(formCurr);
                    } else {
                        enableAddressForm(formCurr);
                    }
                    dataErrorMsgBlock.hide();
                    $('.email-addres-block').css('position', 'relative');
                } else {
                    dataErrorMsgBlock.show();
                    dataErrorMsgBlock.text(data.replace(/\"/g, ""));
                    $('.email-addres-block').css('position', 'static');
                }
            }
        });

    });
}

function enableAddressForm(formCurr) {
    var btn = formCurr.find('.popup-bth__blue');
    btn.parent().parent().hide();
    btn.parent().parent().parent().find('.adresses-step-1').show();
    btn.parent().parent().parent().find('form').first().addClass('js-height-form');
}


//Gestion de l'affichage pour le changement de mail de contact
function enableEmailForm(formCurr) {
    var label = $('.inform-personal-block .inform-personal-block__label, .email-addres-block .inform-personal-block__label');
    var value = $('.inform-personal-block .inform-personal-block__value, .email-addres-block .inform-personal-block__value');
    formCurr.parent().hide();
    formCurr.css('position', 'relative');
    var $buttEmail = $('.email-addres-block .inform-personal-block__bth');
    $buttEmail.parent().find(label).hide();
    $buttEmail.parent().find(value).hide();
    $buttEmail.parent().find('.change').show();
    $buttEmail.parent().addClass('change-form');
}

function cookieSize() {
    var moreOne = $('#cookie-message').children().size();
    if(moreOne > 0) {
        $('#cookie-message').addClass('width-padding');
    } else {
        $('#cookie-message').hide();
    }
}

///new///

function machheightInBlock() {
    var isElement = $('body').find('.content-block').size();
    if ($(window).width() > 1024) {
        if(isElement > 0) {
            $('.content-block .content-table__block').matchHeight();

            $('.content-block .content-table__block__text').matchHeight();
        }
    }

}

function extranetEvolutionPlot() {
    var cahrtData = $('#chart7').attr('data-graph-datas');
    var retraiteMod =$('body').find('#chart7');

    var maxYaxisValue = 0;
    function getMaxYaxisValue(garant, maxYaxisAutoValue) {
        return (parseInt((garant > maxYaxisAutoValue ? garant : maxYaxisAutoValue) / 1000) + 1) * 1000;
    }

    function getTickInterval(val){
        var number = val.toString();
        var toPoint = (~~val).toString().length;
        var retVal = number[0] * (Math.pow(10, (toPoint - 2))) * 2;

        return parseInt(retVal);
    }

    if (cahrtData) {
        var data = $.parseJSON(cahrtData);
        var dataArray = [];

        var labelsToColors = {
            "AC" : "#a02321",
            "OB" : "#28a089",
            "PT" : "#6e4d8f",
            "FE" : "#146faf",
            "SP" : "#9fbc3d",
            "EC" : "#0d3886",
            "FD" : "#146faf",
            "DI" : "#e3904f",
            "AU" : "#CCCCCC"
        };

        var colors = [];
        var labels = {};
        var years = {};
        var mobile = {};

        var garant = data.hasOwnProperty('garantiePlancher') ? data.garantiePlancher : 0;
        var montantProvConstiMaxSum = 0;

        var labelesList = {};
        $.each(data.situationsAnnuelles, function (index, value) {
            $.each(value.provisionEpargneConstituee, function (provisionIndex, provisionValue) {
                if(!labelesList.hasOwnProperty(provisionValue.famille.libelle)) {
                    if (provisionValue.hasOwnProperty('montantProvisionConstituee')) {
                        labelesList[provisionValue.famille.libelle] = provisionValue.famille.code;
                        var code = provisionValue.famille.code;
                        var currentColor = labelsToColors.hasOwnProperty(code)
                            ? labelsToColors[code]
                            : '#000';
                        colors.push(currentColor);
                    }
                }
            });
        });

        $.each(data.situationsAnnuelles, function (index, value) {
            var year = (value.dateArrete.day >= 10 ? value.dateArrete.day: "0" + value.dateArrete.day)
                + '/'
                + (value.dateArrete.month >= 10 ? value.dateArrete.month : "0" + value.dateArrete.month)
                + '/' + value.dateArrete.year;
            dataArray.push(year);
            mobile[year] = {};
            var montantProvConstiSum = 0;

            $.each(value.provisionEpargneConstituee, function (provisionIndex, provisionValue) {

                if (provisionValue.hasOwnProperty('montantProvisionConstituee')) {
                    var label = provisionValue.famille.libelle;
                    var montant = provisionValue.montantProvisionConstituee;

                    montantProvConstiSum = montantProvConstiSum + montant;


                    if (!years.hasOwnProperty(label)) {
                        years[label] = [];
                    }
                    years[label].push(montant);
                    labels[label] = {label: label};
                    if (!mobile[year].hasOwnProperty('label')) {
                        mobile[year].label = [];
                    }
                    mobile[year].label.push(label);
                    if (!mobile[year].hasOwnProperty('total')) {
                        mobile[year].total = [];
                    }
                    mobile[year].total.push(montant);
                }
            });
            if (montantProvConstiMaxSum < montantProvConstiSum) {
                montantProvConstiMaxSum = montantProvConstiSum;
            }
            var currCol = '';
            $.each(labelesList, function (k, v) {

                if (!years.hasOwnProperty(k)) {
                    years[k] = [];
                    years[k].push(0.0);
                    labels[k] = {label: k};
                }
                if (years[k][dataArray.indexOf(year)] === undefined) {

                    years[k][dataArray.indexOf(year)] = 0.0;
                    labels[k] = {label: k};
                }
            });
        });

        $.each(years, function (index, value) {
            years[index].reverse();
        });

        var valYears = Object.keys(years).map(function(key) {
            return years[key];
        });

        if (dataArray.length === 1) {
            var date = new Date();
            dataArray.push(date.toLocaleDateString('fr'));
            valYears.forEach(function (item, key) {
                item.push(0);
            });
        }

        if (!Object.keys(years).length) {
            return;
        }
        maxYaxisValue = getMaxYaxisValue(garant, montantProvConstiMaxSum);
        dataArray.reverse();
        var tickInt = getTickInterval(maxYaxisValue);
        maxYaxisValue = (parseInt(maxYaxisValue/tickInt) +1) * tickInt;
        var numberTicks = parseInt(maxYaxisValue/tickInt) +1;

        console.log("tickInt "+tickInt);
        var plot12 = $.jqplot('chart7', valYears, {
            stackSeries: true,
            shadowOffset: 0,
            shadowDepth: 0,
            shadowAlpha: 0,
            showMarker: false,
            highlighter: {
                show: true,
                showTooltip: false
            },
            seriesDefaults: {
                fillToValue: 0,
                fill: true,
                fillToZero : true,
                shadowDepth: 0,
                shadowAlpha: 0,
                shadowOffset: 0
            },
            series: Object.keys(labels).map(function(key) {
                return labels[key];
            }),
            legend: {
                show: true,
                placement: 'outsideGrid'
            },
            grid: {
                drawBorder: false,
                shadow: false,
                background: 'white',
                drawGridlines: false
            },
            seriesColors: colors,
            axes: {
                xaxis: {
                    renderer:  $.jqplot.DateAxisRenderer,
                    max: dataArray.length,
                    min: 1,
                    numberTicks: dataArray.length
                },
                yaxis: {
                    min: 0,
                    max: maxYaxisValue,
                    numberTicks:numberTicks,
                    tickOptions: {
                        suffix: ' €'
                    }
                }
            }
        });

        var legend = $('#chart7').find('table.jqplot-table-legend');
        legend.hide();
        var data = {};
        legend.find('tr').each(function(key, item) {
            data[key] = {
                color: $(item).find('td').first().html(),
                text: $(item).find('td').last().text()
            }
        });
        $('#chart7').find('.custom-legend').attr('style', legend.attr('style')).css('position', 'absolute').show();
        $.each(data, function(key, item) {
            $('#chart7').find('.custom-legend').prepend("<div class='legend-target'><span class='color'>" + item.color + "</span><span class='text-legend' '>" + item.text + "</span></div>");
        });

        var index = 0;
        $('.jqplot-axis.jqplot-xaxis').find('.jqplot-xaxis-tick').each(function () {
            $(this).text(dataArray[index]);
            index++;
        });

        $('#chart7').find('.jqplot-yaxis-tick').each(function () {
            var formatted = parseFloat($(this).text().split('€')[0].trim());
            var parts = formatted.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            $(this).text( parts  +  ' €');
        });
        if (garant) {

            var formatted = garant.toFixed(2);
            var parts = formatted.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            formatted =  parts.join(".");

            var percentage = garant/maxYaxisValue;
            var graphHeight = $('.jqplot-event-canvas').css("height");

            graphHeight = graphHeight.substring(0, graphHeight.length-2);

            var newVariable = (parseInt(graphHeight)*percentage).toFixed(0);
            var bottomPosition =  newVariable.toString()+"px";

            if($(window).width() > 720) {
                $('#TooltipDiv').css({
                    "padding-bottom": "0px",
                    "margin-bottom": "100px",
                    "bottom": bottomPosition
                });
            }


            $('#TooltipDiv').html('<span class="title">Garantie plancher</span><br> <span class="this">' + (' ' + formatted).replace('.', ',') + '  € </span> ');
        } else {
            $('#TooltipDiv').css('display', 'none');
        }

        if ($(window).width() > "720") {
            $(window).resize(function() {
                plot12.replot();
                $('#chart7').prepend('<div class="custom-legend"></div>');
                var legend = $('#chart7').find('table.jqplot-table-legend');
                legend.hide();
                var data = {};
                legend.find('tr').each(function(key, item) {
                    data[key] = {
                        color: $(item).find('td').first().html(),
                        text: $(item).find('td').last().text()
                    }
                });
                $('#chart7').find('.custom-legend').attr('style', legend.attr('style')).css('position', 'absolute').show();
                $('#chart7').find('.custom-legend').html('');
                $.each(data, function(key, item) {
                    $('.custom-legend').prepend("<div class='legend-target'><span class='color'>" + item.color + "</span><span class='text-legend' '>" + item.text + "</span></div>");
                });

                var index = 0;
                $('#chart7').find('.jqplot-axis.jqplot-xaxis').find('.jqplot-xaxis-tick').each(function () {
                    $(this).text(dataArray[index]);
                    index++;
                });
                if (garant) {
                    var formatted = garant;
                    if (formatted / 1000 > 1) {
                        formatted = (~~(formatted / 1000)) + ' ' + ((formatted % 1000).toFixed(2));
                    }

                    $('#TooltipDiv').css({
                        "padding-bottom": "0px",
                        "margin-bottom": "100px",
                        "bottom": bottomPosition
                    });

                    $('#TooltipDiv').html('<span class="title">Garantie plancher</span><br> <span class="this">' + formatted + '  € </span> ');
                } else {
                    $('#TooltipDiv').css('display', 'none');
                }
            });
        }


        if ($(window).width() < "720") {

            var block = $('#chart7');
            var currentData, currentLabel = '', styles, progbar = "";
            $('#TooltipDiv').appendTo('.big-graph-block');
            $('#chart7').appendTo('.big-graph-block');
            $.each(mobile, function (index, value) {
                var currentValue = value;
                $.each(value.label, function (lIndex, lValue) {
                    var formatted = currentValue.total[lIndex];
                    var formatted = currentValue.total[lIndex].toFixed(2);
                    var parts = formatted.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    formatted =  parts.join(".");
                    currentLabel = '<p class="progbar-label"><span>' + lValue + '</span><br>A la date du  ' + index  + "<br><span>" + formatted.replace('.', ',') + " €  </span></p>";
                    progbar += currentLabel + '<div class="prog-wrap"><p class="prog-bar" style="' + styles + '"></p></div>';
                });
            });
            $(block).html(progbar);
        }
    }

    if(retraiteMod.hasClass('retraite-mode')){
        retraiteMod.closest('#TooltipDiv').hide();
    }
}

function extranetEvolutionPlotRetraite() {

    if($('#chart8').size()) {

        var cahrtData = $('#chart8').attr('data-graph-datas');

        if (cahrtData) {
            var data = $.parseJSON(cahrtData);
            var dataArray1= [];
            var dataArray2= [];
            var labelsToColors = {
                'acquis': '#C31981',
                'previsionnel': '#FF9BD8'
            };

            var colors = [];
            var years = [];
            var age = [];
            $.each(data.acquis, function (key, value) {
                dataArray1.push(value.montant);
            });
            $.each(data.previsionnel, function (key, value) {
                dataArray2.push(value.montant);
                var day = value.dateEntree.day >= 10 ? value.dateEntree.day : "0" + value.dateEntree.day;
                var month =  value.dateEntree.month >= 10 ?  value.dateEntree.month : "0"  +  value.dateEntree.month;
                years.push(value.age.years + ' ans' + '<br/><span class="date-graph">' + '(' + day + '/' + month + '/' + value.dateEntree.year + ')</span>');
            });

            var valCLabels = Object.keys(labelsToColors).map(function(key) {
                return labelsToColors[key];
            });


            if ($(window).width() > 1024) {
                var plot2 = $.jqplot('chart8', [dataArray2, dataArray1],
                    {
                        stackSeries: false,
                        showMarker: false,
                        seriesDefaults: {
                            renderer: $.jqplot.BarRenderer,
                            rendererOptions: {
                                highlightMouseOver: false,
                                barWidth: 31,
                                barMargin: 105,
                                shadowOffset: 0,
                                barPadding: -31
                            }
                        },
                        seriesColors: valCLabels,
                        legend: {
                            show: true,
                            placement: 'outsideGrid'
                        },
                        highlighter: {
                          show: true,
                          showMarker: false,
                          tooltipLocation: 'ne',
                          tooltipAxes: 'y'
                        },

                        grid: {
                            drawBorder: false,
                            shadow: false,
                            background: 'white',
                            drawGridlines: false
                        },
                        axes: {
                            xaxis: {
                                renderer: $.jqplot.CategoryAxisRenderer,
                                ticks: years
                            },

                            yaxis: {
                                tickOptions: {
                                    suffix: ' € *'
                                }
                            }
                        }
                    });

                var legend = $('table.jqplot-table-legend');
                legend.hide();
                var data = [];
                legend.find('tr').each(function (key, item) {
                    data.push({
                        color: $(item).find('td').first().html()
                    });
                });

                $('.custom-legend').attr('style', legend.attr('style')).css('position', 'absolute').show();
                $.each(data.reverse(), function (key, item) {
                    $('.legend-target:eq('+key+')').prepend("<span class='color'>" + item.color + "</span>");
                });

                $('#chart8').find('.jqplot-yaxis-tick').each(function () {
                    var formatted = parseFloat($(this).text().split('€')[0].trim());
                    if (formatted / 1000 > 1) {
                        var temp = ~~(formatted % 1000);
                        if (temp == 0) {
                            temp = '000'
                        }
                        formatted = (~~(formatted / 1000)) + ' ' + temp;
                    }
                    $(this).text(formatted + ' € *');
                });


            } else {

                var block = $('#chart8');
                var currentData, currentData2, currentLabel, styles, progbar = "";
                var maxSum = dataArray1[0] + dataArray2[0];
                $.each(dataArray1, function (index, value) {
                    if (maxSum < (value + dataArray2[index])) {
                        maxSum = value + dataArray2[index];
                    }
                });

                $.each(dataArray1, function (index, value) {
                    currentData = value;
                    currentData2 = dataArray2[index];

                    currentLabel = '<p class="progbar-label">' + years[index] + "</p>";
                    styles = 'background:' + labelsToColors['previsionnel'] + ';' + 'width:' + (currentData / maxSum) * 100 + '%;'
                    progbar += currentLabel + '<div class="prog-wrap"><p class="prog-bar" style="' + styles + '"></p><span>' + currentData + ' €</span></div>';
                    //
                    styles = 'background:' + labelsToColors['acquis'] + ';' + 'width:' + (currentData2 / maxSum) * 100+ '%;'
                    currentLabel = '<p class="progbar-label" style="color: ' + labelsToColors['acquis'] + ';"></p>';
                    progbar += currentLabel + '<div class="prog-wrap"><p class="prog-bar" style="' + styles + '"></p><span>' + currentData2 + ' €</span></div>';
                });

                $(block).html(progbar);
                $('.mobile-legend').css('position', 'absolute').show();
                $.each(valCLabels, function (key) {
                    $('.mobile-legend .legend-target:eq('+key+')').prepend("<span class='color'></span>");
                });
                $('.mobile-legend .legend-target:eq(0)').find('.color').css('background', '#FF9BD8');
                $('.mobile-legend .legend-target:eq(1)').find('.color').css('background', '#C31981');

            }
        }
    }
}

function helpBth() {
    $(document.body).on('click ', '[data-init=help-popup]', function(e) {
        $(this).parent().find('div.help-popup').toggle();
        $(this).parent().find('div.help-popup').toggleClass('open-pop');
    });

    $(document.body).on('click ', '[data-init=close-help-popup]', function() {
        $(this).parent().hide();
        $(this).parent().removeClass('open-pop');
    });
    $('.uc-row [data-init=help-popup]').on('click', function () {
        $(this).parent().parent().find('.uc-row-link').addClass('disable-a');
    });

    $('.uc-row [data-init=close-help-popup]').on('click', function () {
        $('.uc-row-link').removeClass('disable-a');
    });
    $('.disable-a').on('click', function (e) {
        e.preventDefault();
    });

}

function provisionDepargneConstitueChart() {
    if($('#chart5').size()) {
        var cahrtData = $('#chart5').attr('data-graph-datas');
        var data = $.parseJSON(cahrtData);

        if (data.length) {
            var dataArray = [];

            var labelsToColors = {
                "AC" : "#a02321",
                "OB" : "#28a089",
                "PT" : "#6e4d8f",
                "FE" : "#146faf",
                "SP" : "#9fbc3d",
                "EC" : "#0d3886",
                "FD" : "#146faf",
                "DI" : "#e3904f",
                "AU" : "#CCCCCC"
            };

            var colors = [];


            $.each(data, function (index, value) {
                var currentColor = labelsToColors.hasOwnProperty(value['code'])
                    ? labelsToColors[value['code']]
                    : '#000';
                colors.push(currentColor);
                dataArray.push([value['libelle'], value['montantEpargneGeree'], value['pourcentageAffecte'], value['code']]);
            });

            $.jqplot.postDrawHooks.push(function () {
                var labels = $('#chart5 .jqplot-donut-series.jqplot-data-label');

                $.each(labels, function (index, value) {

                    if ($(this).hasClass('right-series') || $(this).hasClass('left-series')) {
                        return false;
                    }
                    var currentData = dataArray[index];
                    var currentLabel = '<span class="jqplot-data-label-inner" style="color: '
                        + colors[index] + ';">' + currentData[2] + '%</span><span style="display: none;">' + currentData[1] + '</span>';
                    $(value).html(currentLabel);

                    if((currentData[2]) === 0) {
                        $(this).addClass('none').hide();
                    }
                });
            });

            if ($(window).width() > "720") {
                var plot4 = $.jqplot('chart5', [dataArray], {

                    series: [],
                    seriesDefaults: {
                        // make this a donut chart.
                        renderer: $.jqplot.DonutRenderer,
                        rendererOptions: {
                            // Donut's can be cut into slices like pies.
                            sliceMargin: 2,
                            shadowOffset: 0,
                            // Pies and donuts can start at any arbitrary angle.
                            startAngle: 0,
                            showDataLabels: true,
                            // By default, data labels show the percentage of the donut/pie.
                            // You can show the data 'value' or data 'label' instead.
                            dataLabels: 'label',
                            // "totalLabel=true" uses the centre of the donut for the total amount
                            totalLabel: false,
                            dataLabelPositionFactor: 2.2,
                            seriesColors: colors,
                            lineWidth: 2.5,
                            innerDiameter: 145,
                            diameter: 215,
                            dataLabelNudge: +5,
                            dataLabelThreshold: 0,
                            highlightMouseOver:false,
                            highlightMouseDown: false
                        }
                    },
                    legend: { show:true,
                        placement: 'outside',
                        location: 's' },
                    highlighter: {
                        tooltipContentEditor: function (str, seriesIndex, pointIndex) {
                            var formatted = parseFloat(str.split(',')[1].trim());
                            var tmp;
                            var formattedPrice = '';
                            while (formatted / 1000 >= 1) {
                                var temp = ((formatted % 1000).toFixed(2)).replace('.00', '');
                                if (temp === 0) {
                                    temp = '000'
                                }  else if (temp < 100) {
                                    temp = '0' + temp;
                                }
                                formattedPrice = ' ' + temp + ' ' + formattedPrice;
                                formatted = ~~(formatted / 1000);
                            }

                            return str.split(',')[0] + ' : ' + ( formatted + formattedPrice).replace('.', ',')  + '€';
                        },
                        show: false,
                        useAxesFormatters: false,
                        tooltipFormatString: '%s'
                    },

                    grid: {
                        background: '#fff',
                        drawBorder: false,
                        shadow: false
                    }
                });
                $('.right-interactive table.jqplot-table-legend').appendTo('.right-interactive.interactive.right-graph .portlet-body').css('position', 'relative');
                $('.right-interactive .support-text').appendTo('.right-interactive.interactive.right-graph .portlet-body').css('position', 'relative');
            } else {
                var block = $('#chart5');
                var currentData, currentLabel, styles, progbar = "";

                $.each(dataArray, function (index, value) {
                    currentData = dataArray[index];
                    currentLabel = '<p class="progbar-label" style="color: '
                        + colors[index] + ';">' + currentData[2] + '%' + "<span>" + currentData[0] + "</span></p>";

                    styles = 'background:' + colors[index] + ';' + 'width:' + currentData[2] + '%';

                    progbar += currentLabel + '<div class="prog-wrap"><p class="prog-bar" style="' + styles + '"></p></div>';

                });
                $(block).html(progbar);
            }
        } else {
            var src = $('.logo').find('img').attr('src').split('images')[0];
            $('#chart5').parent().closest('section').html('<img src="' + src + 'images/icons/no-data.jpg">');
            if ($(window).width() < 720) {
                $('#chart5').parent().closest('section').parent().hide();
            }
        }
    }
}

function repartitionchart() {
    var cahrtData = $('#repartitionChart').attr('data-graph-datas');

    if (cahrtData) {
        var data = $.parseJSON(cahrtData);
        var dataArray = [];

        var labelsToColors = {
            "AC" : "#a02321",
            "OB" : "#28a089",
            "PT" : "#6e4d8f",
            "FE" : "#146faf",
            "SP" : "#9fbc3d",
            "EC" : "#0d3886",
            "FD" : "#146faf",
            "DI" : "#e3904f",
            "AU" : "#CCCCCC"
        };

        var colors = [];

        $.each(data, function(index, value) {
            var label = value['famille']['code'];
            var currentColor = labelsToColors.hasOwnProperty(label)
                ? labelsToColors[label]
                : '#000';
            colors.push(currentColor);
            dataArray.push([value['libelle'], value['colonnes'][0]["taux"], value['codeSupport']]);
        });

        $.jqplot.postDrawHooks.push(function() {
            var labels = $('#repartitionChart .jqplot-donut-series.jqplot-data-label');

            $.each(labels, function(index, value) {
                if ($(this).hasClass('right-series') || $(this).hasClass('left-series')) {
                    return false;
                }
                var currentData = dataArray[index];
                var currentLabel = '<span class="jqplot-data-label-inner" style="color: ' + colors[index] + ';">' + ~~currentData[1] + '%</span>';
                $(value).html(currentLabel);

                if ((currentData[2]) === 0) {
                    $(this).addClass('none').hide();
                }
            });
        });

        var block = $('#repartitionChart');
        var currentData,
            currentLabel,
            styles,
            progbar = "";

        $.each(dataArray, function(index, value) {
            currentData = dataArray[index];
            var num = currentData[1];
            var n = num.toFixed(2);
            if(n.indexOf('00') !== -1 ){
                n = num;
            }
            currentLabel = '<p class="progbar-label" style="color: ' + colors[index] + ';">' + n + '%' + "<span>" + currentData[0] + "</span></p>";

            styles = 'background:' + colors[index] + ';' + 'width:' + currentData[1] + '%';

            progbar += currentLabel + '<div class="prog-wrap"><p class="prog-bar" style="' + styles + '"></p></div>';

        });
        $(block).html(progbar);

    } else {
        var src = $('.logo').find('img').attr('src').split('images')[0];
        $('#repartitionChart').parent().closest('section').html('<img src="' + src + 'images/icons/no-data.jpg">');
        if ($(window).width() < 720) {
            $('#repartitionChart').parent().closest('section').parent().hide();
        }
    }
}

function situationadhesionChart() {
    var cahrtData = $('#chart6').attr('data-graph-datas');

    if (cahrtData) {
        var data = $.parseJSON(cahrtData);
        var dataArray = [];

        var labelsToColors = {
            "AC" : "#a02321",
            "OB" : "#28a089",
            "PT" : "#6e4d8f",
            "FE" : "#146faf",
            "SP" : "#9fbc3d",
            "EC" : "#0d3886",
            "FD" : "#146faf",
            "DI" : "#e3904f",
            "AU" : "#CCCCCC"
        };

        var colors = [];


        $.each(data, function (index, value) {
            console.log(value);
            var currentColor = labelsToColors.hasOwnProperty(value['code'])
                ? labelsToColors[value['code']]
                : '#000';
            colors.push(currentColor);
            dataArray.push([value['libelle'], value['montantEpargneGeree'], value['pourcentageAffecte'], value['code']]);
        });

        $.jqplot.postDrawHooks.push(function () {
            var labels = $('#chart6 .jqplot-donut-series.jqplot-data-label');

            $.each(labels, function (index, value) {
                var currentData = dataArray[index];
                var currentLabel = '<span class="jqplot-data-label-inner" style="color: '
                    + colors[index] + ';">' + currentData[2] + '%</span><br/> ' + currentData[0]  + ' <span style="display: none;">' + currentData[1] + '</span>';
                $(value).html(currentLabel);

                if((currentData[2]) === 0) {
                    $(this).addClass('none').hide();
                }
            });
        });

        if ($(window).width() > "720") {
            var plot4 = $.jqplot('chart6', [dataArray], {

                series: [],
                seriesDefaults: {
                    // make this a donut chart.
                    renderer: $.jqplot.DonutRenderer,
                    rendererOptions: {
                        // Donut's can be cut into slices like pies.
                        sliceMargin: 2,
                        shadowOffset: 0,
                        // Pies and donuts can start at any arbitrary angle.
                        startAngle: 0,
                        showDataLabels: true,
                        // By default, data labels show the percentage of the donut/pie.
                        // You can show the data 'value' or data 'label' instead.
                        dataLabels: 'label',
                        // "totalLabel=true" uses the centre of the donut for the total amount
                        totalLabel: false,
                        // dataLabelPositionFactor: 1.9,
                        seriesColors: colors,
                        lineWidth: 2.5,
                        innerDiameter: 145,
                        diameter: 215,
                        dataLabelNudge: +55,
                        dataLabelThreshold: 0,
                        highlightMouseOver:false,
                        highlightMouseDown: false
                    }
                },
                highlighter: {
                    tooltipContentEditor: function (str, seriesIndex, pointIndex) {
                        var formatted = parseFloat(str.split(',')[1].trim());
                        var tmp;
                        var formattedPrice = '';
                        while (formatted / 1000 >= 1) {
                            var temp = ((formatted % 1000).toFixed(2)).replace('.00', '');
                            if (temp === 0) {
                                temp = '000'
                            }  else if (temp < 100) {
                                temp = '0' + temp;
                            }
                            formattedPrice = ' ' + temp + ' ' + formattedPrice;
                            formatted = ~~(formatted / 1000);
                        }

                        return str.split(',')[0] + ' : ' + ( formatted + formattedPrice).replace('.', ',')  + '€';
                    },
                    show: false,
                    useAxesFormatters: false,
                    tooltipFormatString: '%s'
                },

                grid: {
                    background: '#fff',
                    drawBorder: false,
                    shadow: false
                }
            });
        } else {
            var block = $('#chart6');
            var currentData, currentLabel, styles, progbar = "";

            $.each(dataArray, function (index, value) {
                currentData = dataArray[index];
                currentLabel = '<p class="progbar-label" style="color: '
                    + colors[index] + ';">' + currentData[2] + '%' + "<span>" + currentData[0] + "</span></p>";

                styles = 'background:' + colors[index] + ';' + 'width:' + currentData[2] + '%';

                progbar += currentLabel + '<div class="prog-wrap"><p class="prog-bar" style="' + styles + '"></p></div>';

            });
            $(block).html(progbar);
        }
    } else {
        var src = $('.logo').find('img').attr('src').split('images')[0];
        $('#chart6').parent().closest('section').html('<img src="' + src + 'images/icons/no-data.jpg">');
        if ($(window).width() < 720) {
            $('#chart6').parent().closest('section').parent().hide();
        }
    }
}

function showDetails() {
    $('[data-init=show-details]').on('click', function(e) {
        e.preventDefault();
        $('.details-popup__body.dates-body .hasDatepicker').each(function() {
            $(this).val(' ');
        });
        $('.error-value').removeClass('show-error-value');
        $('body').addClass('modal-open-details');
        $(this).parent().closest('section').css('position', 'static').closest('div.left-interactive').css('position', 'static').closest('section.epargne-block').css('position', 'static');
        $('body').find('.content-block').css('position', 'static');
        $('.details-popup').show();
        $('body').find('.details-popup').find('.details-popup__body').animate({scrollTop: 0}, 0);
        if ($(this).hasClass('history-link')) {
            $(this).parent().closest('section').css('position', 'static').closest('div.content-wrapper').css('position', 'static');
            var linkTitle = $(this).find('.content-links__title').text();
            $('.history-link-popin .title').text(linkTitle);
            var linkType = $(this).attr('data-link-type');
            $('.history-link-popin .get-operation-link').attr('data-link-type', linkType);
            $('.history-link-popin-error').addClass('hide');
        }

        if ($(this).hasClass('link-sante-info')) {
            $(this).parent().closest('section').css('position', 'static').closest('div.content-wrapper').css('position', 'static');
            var linkTitle = $(this).find('.content-links__title').text();
            var linkType = $(this).attr('data-link-type');
            $('.history-link-popin .get-operation-link').attr('data-link-type', linkType);
            $('.history-link-popin-error').addClass('hide');
        }

        if ($(this).hasClass('link-axa-modal')) {
            $(this).parent().closest('.contact-i-want').css('position', 'static').closest('div.content-wrapper').css('position', 'static');
            $('.details-popup').show();
        }

        if ($(this).hasClass('prestations-top-block__attache')) {
            $(this).parent().closest('section').css('position', 'static').closest('div.content-wrapper').css('position', 'static');
            initReglamLink($(this).attr('data-action'), $(this).attr('data-document-link'), $(this).attr('data-document-title'))
            $('.prestations-link-error').addClass('hide');
        }

        select();
    });

    $('[data-init=close-details]').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('modal-open-details');
        $('body').find('.my-documents .content-wrapper').css('position', 'relative');
        $('body').find('.content-block').css('position', 'relative');
        $('body').find('.details-popup').hide();
        $(this).parent().parent().parent().closest('section').css('position', 'relative').closest('div.left-interactive').css('position', 'relative').closest('section.epargne-block').css('position', 'relative');
        capTargPos();
    });
}

function listPage(page, obj) {
    if ($(obj).hasClass('active')) {
        return;
    }
    var parent = $(obj).closest('.details-popup__container');
    parent.find('ul').find('li').removeClass('active');
    $(obj).addClass('active');
    parent.find('.details-popup__block').hide();
    parent.find('.details-popup__block.details-popup__container-page-' + page).show();
    parent.find('.pagination').find('.pagination-list').find('span').first().text(page);
}

function paginationDetails() {
    $('.details-popup__container').each(function() {
        var blocks = $(this).find('.details-popup__block');
        var pagenation = Math.ceil(blocks.size() / 9);
        var li = '';
        var page = 1;
        var i = 0;
        blocks.each(function(index) {
            if (((index + 1) % 9 === 0) || (blocks.size() === index + 1)) {
                li += '<li onclick="listPage(' + page + ', this)">Page ' + page + ' sur ' + pagenation + '</li>';
                $(this).addClass('details-popup__container-page-' + page);
            }
            if ((index + 1) % 9 > 0) {
                $(this).addClass('details-popup__container-page-' + page);
            }

            if (page !== 1) {
                $(this).css('display', 'none');
            }

            if ((index + 1) % 9 === 0) {
                page++;
            }
        });

        if (blocks.size() > 9) {
            $(this).append('<div class="pagination">' +
                '<div class="pagination-list">' +
                '<p>Page <span>1</span> sur ' + pagenation + '<i class="fa fa-caret-down" aria-hidden="true"></i></p>' + '<ul>' + li + '</ul>' + '</div>' + '</div>');

            $(this).find('ul').find('li').first().addClass('active');

            $(this).find('.pagination-list').on('click', function() {
                $(this).find('ul').toggle();
            });
        }
    });
}

function changePositionButton() {
    var mobileScreen = $(window).width() < 768;
    var changedisplay = $('.interactive__title.fitst-element').find('.epargne__info-help-bth');
    if (mobileScreen) {
        $('.interactive__title-wrap .help-popup-container').appendTo(".interactive__title.fitst-element");
        changedisplay.css('display', 'block');

    }
}

function listblock(page, obj) {
    if ($(obj).hasClass('active')) {
        return;
    }
    var parent = $(obj).closest('.statistic-block__container');
    parent.find('ul').find('li').removeClass('active');
    $(obj).addClass('active');
    parent.find('.statistic-block__value').hide();
    parent.find('.statistic-block__value.contracts-block-page-' + page).show();
    parent.find('.pagination').find('.pagination-list').find('span').first().text(page);
}


function statisticBlockPagination() {
    $('.statistic-block__container').each(function() {
        var blocks = $(this).find('.statistic-block__value');
        var pagenation = Math.ceil(blocks.size() / 1);
        var li = '';
        var page = 1;
        var i = 0;
        blocks.each(function(index) {
            if (((index + 1) % 1 === 0) || (blocks.size() === index + 1)) {
                li += '<li onclick="listblock(' + page + ', this)" />';
                $(this).addClass('contracts-block-page-' + page);
            }
            if ((index + 1) % 1 > 0) {
                $(this).addClass('contracts-block-page-' + page);
            }

            if (page !== 1) {
                $(this).css('display', 'none');
            }

            if ((index + 1) % 1 === 0) {
                page++;
            }
        });

        if (blocks.size() > 1) {
            $(this).append('<div class="pagination-statistic">' +
                '<div class="pagination-list-statistic">' +
                '<p></p>' + '<ul>' + li + '</ul>' + '</div>' + '</div>');

            $(this).find('ul').find('li').first().addClass('active');

            $(this).find('.pagination-list').on('click', function() {
                $(this).find('ul').toggle();
            });
        }
    });
}

function tablelistblock(page, obj) {
    if ($(obj).hasClass('active')) {
        return;
    }
    var parent = $(obj).closest('.content-table__table--wrapper');
    parent.find('ul').find('li').removeClass('active');
    $(obj).addClass('active');
    parent.find('.content-table__table--item').hide();
    parent.find('.content-table__table--item.contracts-block-page-' + page).show();
    parent.find('.pagination').find('.pagination-list').find('span').first().text(page);
}


function contentTableBlockPagination() {
    $('.content-table__table--wrapper').each(function() {
        var blocks = $(this).find('.content-table__table--item');
        var pagenation = Math.ceil(blocks.size() / 1);
        var li = '';
        var page = 1;
        var i = 0;
        blocks.each(function(index) {
            if (((index + 1) % 1 === 0) || (blocks.size() === index + 1)) {
                li += '<li onclick="tablelistblock(' + page + ', this)" />';
                $(this).addClass('contracts-block-page-' + page);
            }
            if ((index + 1) % 1 > 0) {
                $(this).addClass('contracts-block-page-' + page);
            }

            if (page !== 1) {
                $(this).css('display', 'none');
            }

            if ((index + 1) % 1 === 0) {
                page++;
            }
        });

        if (blocks.size() > 1) {
            $(this).append('<div class="pagination-statistic">' +
                '<div class="pagination-list-statistic">' +
                '<p></p>' + '<ul>' + li + '</ul>' + '</div>' + '</div>');

            $(this).find('ul').find('li').first().addClass('active');

            $(this).find('.pagination-list').on('click', function() {
                $(this).find('ul').toggle();
            });
        }
    });
}



function documentsNavportal() {
    var mobileScreen = $(window).width() < 1025;
    var extendSize = $('.page-top-title').height() + 60;
    var fullScreen = $(window).width() > 1024;
    var titlePageEl = $('.page-top-title');
    var elements = [$('.evalueation-container'), $('.epargne'),  $('.my-documents')];
    var titlePage = $('.page-top-title').height();
    var mobMenu = $('#main-menu').height();
    var headerHeight = $('header.clearfix').height();
    if ($('.page-top-title').size() < 1) {
        $('.my-documents').css('margin-top', '40px');
    }
    replaceLeftMenu();
    $(window).on('scroll ready', function() {
        if (fullScreen) {
            if($(this).scrollTop() > mobMenu + 52) {
                titlePageEl.addClass('pin-contract-info');
                elements.forEach(function (renderElement) {
                    renderElement.css('padding-top', mobMenu + titlePage + 'px');
                });
                if ($(this).scrollTop() > (headerHeight + 5)) {
                    $('.documents-nav').addClass("fixed-document-nav");
                }
            } else {
                titlePageEl.removeClass('pin-contract-info');
                elements.forEach(function (renderElement) {
                    renderElement.css('padding-top', 0 + 'px');
                });
                if ($(this).scrollTop() < (headerHeight + 5)) {
                    $('.documents-nav').removeClass("fixed-document-nav");
                }
            }
        }
    });
    if (mobileScreen) {
        if($('body').find('.prevoyance--pratique-page').size() > 0){
            $('#left-menu').appendTo(".page-top-title .content-wrapper:first");
        } else {
            $('#left-menu').appendTo(".page-top-title .content-wrapper:first");
        }
        if ($('.page-top-title').size() > 0) {
            $('.epargne-wrap, .evolution-wrap, .documents-wrap').css('margin-top', extendSize + 40);
        }
        if ($('.page-top-title').size() < 1) {
            $('.documents-nav-phone-fixed').css('top', '60px');
        }
        if ($('#left-menu .documents-nav .documents-nav__item').size() < 2) {
            $('#left-menu .documents-nav .documents-nav-fixed-bth').hide();
        } else {
            $('#left-menu .documents-nav .documents-nav-fixed-bth').show();
        }
        $('#left-menu .documents-nav').addClass("documents-nav-phone-fixed");
    } else {
        $('#left-menu .documents-nav .documents-nav-fixed-bth').hide();
    }
    if (mobileScreen) {
        $('#left-menu  .documents-nav .documents-nav__item').hide();
        $('#left-menu .documents-nav').find('.documents-nav__item.documents-nav__item_active').show();
        $("#left-menu .documents-nav-fixed-bth").on('click', function() {
            $(this).toggleClass('up');
            var block = $(this).parent();
            block.toggleClass('opened');
            if (block.hasClass('opened')) {
                $('#left-menu .documents-nav .documents-nav__item').show();
            } else {
                $('#left-menu  .documents-nav .documents-nav__item').hide();
                $('#left-menu .documents-nav').find('.documents-nav__item.documents-nav__item_active').show();
            }
        });
    }
    $('#left-menu .documents-nav__item').on('click', function() {
        $('.documents-nav .documents-nav__item').removeClass('documents-nav__item_active');
        $(this).addClass('documents-nav__item_active');
        if ($(window).width() < 1025) {
            $('#left-menu  .documents-nav .documents-nav__item').hide();
            $(this).show();
            $('#left-menu .documents-nav-phone-fixed').removeClass('opened');
        }
    });
    function replaceLeftMenu() {
        var $selectors2 = [ $('.evolution-wrap'), $('.epargne-wrap'), $('.documents-wrap') ];
        $selectors2.forEach( function( $selector ) {
            if ( !$selector.size() ) { return; }
            $('#left-menu').appendTo($selector.parent().closest('div.content-wrapper'));
            $('.documents-nav').animate({
                opacity: 1,
                zIndex: 1
            }, 3500, function () {});
        });
    }
}

function hideInnerBlock() {
    $('.content-inner-hide__block').addClass('add-nev');
    $('.prevoyance--sante-page .content-inner-hide__block').addClass('add-nev');
    $('.content-block').delegate(".content-inner-hide__block__close", 'click', function() {
        var isActive = $(this).parent().hasClass('add-nev');
        if(isActive){
            $(this).parent().removeClass('add-nev');
        } else {
            $(this).parent().addClass('add-nev');
        }

    });
}
function datepicerSetPos() {
    if($(window).width() < 768) {
        var blockLength = $('body').find('#ui-datepicker-div').size();
        var block = $('body').find('#ui-datepicker-div');
        if( blockLength > 0) {
            block.addClass('posDatePicker-js');
            $(window).on('resize', function(){
                block.addClass('posDatePicker-js');
            });
        }
    }
}

function hideOuterBlock() {
    $(document.body).delegate('.content-hide-block__arr', "click touch", function() {
        var isActive = $(this).hasClass('active');
        if ($(this).closest('.prevoyance-situation-page, .prevoyance--sante, .my-documents').size() > 0
            && $(this).closest('.my-documents.prestations-page').size() < 1)  {
            $('body').find('.content-hide-block').find('.content-inner-hide__block--wrapper').hide();
            $('body').find('.content-hide-block').find('.content-hide-block__arr').removeClass('active');

            if (isActive === false) {
                $(this).addClass('active');
                $(this).parent('.content-hide-block').find('.content-inner-hide__block--wrapper').show();
                $(this).parent('.content-hide-block').find('.content-inner-hide__block').addClass('add-nev');
                $('.content-inner-hide__block').each(function () {
                    var r = $(this).find('.content-inner-hide__block__value').text().trim().length;
                    if (r < 1) {
                        $(this).find('.content-inner-hide__block__close').css('top', '7px');
                    } else {
                        $(this).find('.content-inner-hide__block__close').css('top', '15px');
                    }
                });
            }
        } else if($(this).closest('.prestations-page').size() > 0) {
            $(this).parent('.content-hide-block').find('.content-inner-hide__block').addClass('add-nev');
            $(this).toggleClass('active');
            $(this).parent().next().toggle();
        } else {
            $(this).toggleClass('active');
            $(this).parent('.content-hide-block').find('.content-inner-hide__block--wrapper').toggle();
        }
    });

    $('body').find('.content-hide-block').find('.content-inner-hide__block').addClass('add-nev');


    if($(window).width() < 768) {
        if($('body').find('.prevoyance-situation-page, .prevention-page, .prevoyance--sante-page, .prestations-page ').size() > 0){
            $('.documents-wrap').find('.content-block').append(
                '<div class="content__arr active mb" ' +
                'onclick=" var contentBlock = $(this).closest(\'.content-block\'); contentBlock = contentBlock.find(\'.portlet-body\').size() ? contentBlock.find(\'.portlet-body\') : contentBlock; contentBlock.find(\'*:not(.content-title, .help-popup, .content-inner-hide__block--wrapper, .content-table__table, .details-popup, .mon-pret-block__title, .content-title, .prestations-block__title, .pagination, .content-hide-block__arr, select)\').toggle();"></div>'
            );

            $('.prevoyance-situation-page, .prevention-page, .prestations-page, .prevoyance--sante-page').find('.mb').remove();
        } else {
            $('.documents-wrap').find('.content-block').find('.operations-pagination').parent().find('*:not(.content-title )').hide();
            $('.documents-wrap').find('.operations-pagination').parent().closest('section').parent().parent().find('.content-hide-block__arr').removeClass('active');



            $('.documents-wrap').find('.content-block').append(
                '<div class="content__arr active" ' +
                'onclick="select(); var contentBlock = $(this).closest(\'.content-block\'); contentBlock = contentBlock.find(\'.portlet-body\').size() ? contentBlock.find(\'.portlet-body\') : contentBlock; contentBlock.find(\'>*:not(.content-title, .help-popup, .content-inner-hide__block--wrapper, .content-table__table, .details-popup, .mon-pret-block__title, .content-title, .prestations-block__title, .content-hide-block__arr, .content__arr, select)\').toggle()"></div>'
            );
            $('.prevoyance--pratique').find('.content__arr').remove();
        }

        $('.content__arr').on('click', function () {
            $(this).toggleClass('active');
        });
        $('.content-block.evalueation').find('.content__arr').remove();

        $('.epargne').find('.content-hide-block__arr').parent().addClass('visible-no');
        if($('.big-graph-block .portlet-body').hasClass('visible-no')){
            $('body').find('#TooltipDiv').hide();
        }

        $('.epargne-wrap').find('.content-block:not(:first-child)').find('.content-hide-block__arr').trigger('click');
        $('.documents-wrap').find('.content-block:not(:first-child)').find('.content__arr').trigger('click');
        $('.left-interactive').find('.portlet-body').removeClass('visible-no');
        $('.epargne').find('.content-hide-block__arr:first').addClass('active');

        $('.epargne .content-hide-block__arr').on("click", function () {
            $(this).parent().toggleClass('visible-no').css({height : 'auto', 'min-height' : 0});
            if($('.big-graph-block .portlet-body').hasClass('visible-no')){
                $('body').find('#TooltipDiv').hide();
            } else {
                $('body').find('#TooltipDiv').show();
            }

            if($('.left-interactive .portlet-body').hasClass('visible-no')){
                $('body').find('.help-popup-container').hide();
            } else {
                $('body').find('.help-popup-container').show();
            }

        });

    } else {
        $('body').find('.content__arr').remove();
    }
}

function initReglamLink(action, documentLink, documentTitle) {
            var reglamStartDate = $(".reglam-start-datepicker");
            var reglamEndDate = $(".reglam-end-datepicker");
            var minDate = new Date(1976, 10 - 1, 25);
            var maxDate = '+100Y';

            reglamStartDate.datepicker({
                minDate: minDate,
                maxDate: maxDate
            });
            reglamEndDate.datepicker({
                minDate: minDate,
                maxDate: maxDate
            });

        $('.reglam-get-link').on('click', function () {
            var regExp = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19|20)\d{2}$/;

            var date1 = reglamStartDate.val();
            var date2 = reglamEndDate.val();
            var date1valid = date1 ? date1.match(regExp) : true;
            var date2valid = date2 ? date2.match(regExp) : true;
            if (date1valid && date2valid) {
                $('.reglam-get-link').parent().find('.error-value').removeClass('show-error-value');
            } else {
                $('.reglam-get-link').parent().find('.error-value').addClass('show-error-value');
                return;
            }

            var paramDateStart = '';
            var paramDateEnd = '';

            if ( date1.match( regExp ) && date2.match( regExp ) ) {
                var dateArr1 = date1.split('-');
                var dateArr2 = date2.split('-');
                var dateFormat1 = new Date( dateArr1[1] + '-' + dateArr1[0] + '-' + dateArr1[2] );
                var dateFormat2 = new Date( dateArr2[1] + '-' + dateArr2[0] + '-' + dateArr2[2] );
                if ( dateFormat1.getTime() > dateFormat2.getTime() ) {
                    $('.reglam-get-link').parent().find('.error-value').addClass('show-error-value');
                    return;
                } else {
                    $('.reglam-get-link').parent().find('.error-value').removeClass('show-error-value');

                    var splittedParamDateStart = date1.split('-');
                    var splittedParamDateEnd = date2.split('-');
                    paramDateStart = splittedParamDateStart[2] + '-' + splittedParamDateStart[1] + '-' + splittedParamDateStart[0];
                    paramDateEnd = splittedParamDateEnd[2] + '-' + splittedParamDateEnd[1] + '-' + splittedParamDateEnd[0];
                }
            } else {
                paramDateStart = validatePrestationDateParam(regExp, date1);
                paramDateEnd = validatePrestationDateParam(regExp, date2);
            }

            $.ajax({
                url: action,
                type: 'POST',
                cache: false,
                dataType: 'json',
                data: {
                    startDate: paramDateStart,
                    endDate: paramDateEnd,
                    title: documentTitle,
                    link: documentLink
                },
                success: function (data) {
                    var $errorBlock = $('.prestations-link-error');
                    if (hasError(data)) {
                        printError(data, $errorBlock);
                    } else {
                        window.location.href = data['documentUrl'];
                        $('.prestations-link-popin').hide();
                    }
                },
                failure: function(errMsg) {
                    if (console) {
                        console.log(errMsg);
                    }
                }
            });
        });
    }

function validatePrestationDateParam(regExp, date) {
    if (date.match(regExp)) {
        var splittedParamDate = date.split('-');
        return splittedParamDate[2] + '-' + splittedParamDate[1] + '-' + splittedParamDate[0];
    }
    return '';
}

function membership() {

    var $membershipPopin = $('.membership-popin');
    if ($membershipPopin.length !== 0) {
        updatePopinTabs($membershipPopin, 1);
    }

    $('.membership-pgn li').on('click', function() {
        var $popin = $(".details-popup__container");
        updatePopinTabs($popin, $(this).attr("data-pgn-tab-num"));
    });

    function updatePopinTabs($popin, tabNum) {
        $popin.find(".details-popup__block").remove();
        $popin.find(".pgn-curr-page").text(tabNum);
        $('.membership-popin-error').addClass('hide');
        $.ajax({
            url: repartitionSupportsURL,
            type: 'POST',
            dataType: 'json',
            data: {
                tabNum: tabNum
            },
            success: function (data) {
                if (hasError(data)) {
                    printError(data, '.membership-popin-error');
                } else {
                    $(data).prependTo($popin);
                }
            }
        });
    }
}

function setValue(obj, block, attrName, className) {
    var attr = obj[attrName];
    var valueBlock = block.find('.' + className);
    if (attr !== '') {
        valueBlock.text(attr);
    } else {
        valueBlock.parent().remove();
    }
}

function appendValue(obj, block, attrName, className) {
    var attr = obj[attrName];
    var valueBlock = block.find('.' + className);
    if (valueBlock.length){
        if (typeof attr !== 'undefined' && attr !== '') {
            $(valueBlock).append(attr);
        } else {
            valueBlock.remove();
        }
    }
}

function hidePageByAlias(alias) {
    $('.left-menu-extranet .documents-nav__item[data-page-alias="' + alias + '"]').addClass("hide");
}

function adhesionDetailLeftMenu() {

    if (typeof pageAliasesToHide !== 'undefined' && pageAliasesToHide.length > 0) {
        for (i = 0; i < pageAliasesToHide.length; i++) {
            hidePageByAlias(pageAliasesToHide[i]);
        }
    }

}

function changeContentDisplay() {
    var benF = $('.beneficiaries__container');
    var block = $('.beneficiaries__articles');

    if((block.size() === 2)) {
        benF.addClass('width-border-left');
    }

    if((block.size() > 2)) {
        benF.addClass('width-border-both');
    }
}

function hideMenu() {
    if($(window).width() > 1024) {
        var menuLeftPos;
        var menuLeft = $('.left-menu-extranet').find('.documents-nav');
        var menuLeftHeight = menuLeft.height();
        var pageHeightExceptFooterHeader = $(document).height() - $('footer').height() - $('header').height() - $('#cookie-message').height();
        $(window).on('scroll', function () {
            pageHeightExceptFooterHeader = $(document).height() - $('footer').height() - $('header').height() - $('#cookie-message').height();
            menuLeftPos = menuLeft.offset().top;
            if ((menuLeftPos + menuLeftHeight) > pageHeightExceptFooterHeader) {
                hide();
            } else if (menuLeft.hasClass('hide-js')) {
                show();
            }
        });
        if ($('body').find('.epargne-wrap, .evolution-wrap, .documents-wrap').size() < 1) {
            hide();
        }
        function hide() {
            menuLeft.removeClass('show-js');
            menuLeft.addClass('hide-js');
        }
        function show() {
            menuLeft.removeClass('hide-js');
            menuLeft.addClass('show-js');
        }
    }
}


function historyAdvancePortlet() {
    var firstTab = 1;
    var defaultDelta = 3;
    var position = $('.documents-wrap').offset();

    if (typeof datepickerMinDate !== 'undefined' && typeof datepickerMaxDate !== 'undefined') {
        var datePickerConfig = getDatePickerConfig(datepickerMinDate, datepickerMaxDate);
        $("#datepickerStartDate").datepicker(datePickerConfig);
        $("#datepickerEndDate").datepicker(datePickerConfig);

        var fullPeriod = getFullPeriod();
        getStartDateInput().val(fullPeriod.startDate);
        getEndDateInput().val(fullPeriod.endDate);
        updateOperations(firstTab, fullPeriod, defaultDelta);
    }

    $('body').on('change', '.operation-famille-selector, .history-advance-start-date, .history-advance-end-date, .delta-selector', function() {
        console.log('trigger');
        $('body, html').stop().animate({ scrollTop: position.top - 130 });
        var regExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        var date1 = $('.history-advance-start-date').val();
        var date2 = $('.history-advance-end-date').val();
        var date1valid = date1 ? date1.match(regExp) : true;
        var date2valid = date2 ? date2.match(regExp) : true;
        if (date1valid && date2valid) {
            $('.history-advance-start-date').parent().find('.error-value').removeClass('show-error-value');
        } else {
            $('.history-advance-start-date').parent().find('.error-value').addClass('show-error-value');
            $('.operation-filter-error').addClass('hide');
            return;
        }
        if ( date1.match( regExp ) && date2.match( regExp ) ) {
            var dateArr1 = date1.split('/');
            var dateArr2 = date2.split('/');

            var dateFormat1 = new Date( dateArr1[1] + '/' + dateArr1[0] + '/' + dateArr1[2] );
            var dateFormat2 = new Date( dateArr2[1] + '/' + dateArr2[0] + '/' + dateArr2[2] );

            if ( dateFormat1.getTime() > dateFormat2.getTime() ) {
                $('.history-advance-start-date').parent().find('.error-value').addClass('show-error-value');
                $('.operation-filter-error').addClass('hide');
                // first date biggest of last date
                return;
            } else {
                $('.history-advance-start-date').parent().find('.error-value').removeClass('show-error-value');
            }
        }
        var delta = $('.delta-selector').val();
        console.log('delta ' + delta);
        var period = getPeriod();
        if (isPeriodSelected(period)) {
            updateOperations(firstTab, period, delta);
        }
    });

    $(document.body).on('click', '.operations-pagination li', function() {
        updateOperations($(this).attr('data-pgn-tab-num'), getPeriod(), $('.delta-selector').val());
    });

    if (typeof isOperationMode !== 'undefined' && isOperationMode) {
        var datePickerConfig = getDatePickerConfig(datepickerMinDate, datepickerMaxDate);
        $("#datepickerPopinStartDate").datepicker(datePickerConfig);
        $("#datepickerPopinEndDate").datepicker(datePickerConfig);
    }

    $('.get-operation-link').on('click', function() {
        var regExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        var date1 = $('.get-link-start-date').val();
        var date2 = $('.get-link-end-date').val();
        var date1valid = date1 ? date1.match(regExp) : true;
        var date2valid = date2 ? date2.match(regExp) : true;
        if (date1valid && date2valid) {
        	$('.history-link-popin-error').addClass('hide');
            $('.get-operation-link').parent().find('.error-value').removeClass('show-error-value');
        } else {
            $('.get-operation-link').parent().find('.error-value').addClass('show-error-value');
            $('.history-link-popin-error').addClass('hide');
            return;
        }
        if ( date1.match( regExp ) && date2.match( regExp ) ) {
            var dateArr1 = date1.split('/');
            var dateArr2 = date2.split('/');

            var dateFormat1 = new Date( dateArr1[1] + '/' + dateArr1[0] + '/' + dateArr1[2] );
            var dateFormat2 = new Date( dateArr2[1] + '/' + dateArr2[0] + '/' + dateArr2[2] );

            if ( dateFormat1.getTime() > dateFormat2.getTime() ) {
            	$('.history-link-popin-error').addClass('hide');
                $('.get-operation-link').parent().find('.error-value').addClass('show-error-value');
                // first date biggest of last date
                return;
            } else {
                $('.get-operation-link').parent().find('.error-value').removeClass('show-error-value');
            }
        }

        $.ajax({
            url: getDownloadLinkURL,
            type: 'POST',
            dataType: 'json',
            data: {
                operationFamille: $('#famille-select-popin').val(),
                startDate: $('.get-link-start-date').val(),
                endDate: $('.get-link-end-date').val(),
                linkType : $(this).attr('data-link-type')
            },
            success: function (data) {
                $('.history-link-popin-error').addClass('hide');
                if (hasError(data)) {
                    printErrorByClassName(data, '.history-link-popin-error');
                } else {
                    window.location.href = data['link'];

                    $('body').find('.my-documents .content-wrapper').css('position', 'relative');
                    $('body').find('.history-link-popin').hide();
                    $(this).parent().parent().parent().closest('section').css('position', 'relative')
                        .closest('div.left-interactive').css('position', 'relative').closest('section.epargne-block').css('position', 'relative');
                }
            },
            failure: function(errMsg) {
                if (console) {
                    console.log(errMsg);
                }
            }
        });
        $('.get-operation-link').parent().find('.error-value').removeClass('show-error-value');
        $('body').removeClass('modal-open-details');
    });

    function updateOperations(tabNum, period, delta) {
        clearOperationsBlock();
        $('.loading-animation').show();
        $.ajax({
            url: operationsURL,
            type: 'POST',
            dataType: 'json',
            data: {
                operationFamille: $('.operation-famille-selector').val(),
                startDate: period.startDate,
                endDate: period.endDate,
                tabNum: tabNum,
                delta: delta
            },
            success: function (data) {
                $('.loading-animation').hide();
                if (hasError(data)) {
                    if (data['error-no-results']) {
                        $('.operation-filter-error').css("color", "black");
                    } else {
                        $('.operation-filter-error').css("color", "red");
                    }
                    printErrorByClassName(data, '.operation-filter-error');
                } else {
                    $(data).insertAfter($('.operation-filter-error'));
                    setAttestationVersementLink();
                }
                updateElforClose();
            },
            failure: function(errMsg) {
                if (console) {
                    console.log(errMsg);
                }
            }
        });
    }

    function setAttestationVersementLink() {
        var $linkBlock = $('.attestation-link');
        if ($linkBlock.length) {
            var attestationLink = $('.attestation-link-holder').attr('data-attestation-link');
            if (attestationLink.length && attestationLink !== '') {
                $linkBlock.removeClass('hide');
                $linkBlock.find('a').attr('href', attestationLink);
            } else {
                $linkBlock.addClass('hide');
            }
        }
    }

    function clearOperationsBlock() {
        $('.content-hide-block').remove();
        $('.operation-filter-error').addClass('hide');
        $('.operations-pagination').remove();
    }
}
function updateElforClose() {
    var el = $('.pagination-list');
    var el2 = $('ul.membership-pgn');

    $(document).mouseup(function (e) {
        if (!el.is(e.target) && el2.has(e.target).length === 0) {
            el2.hide();
        }
    });
}

function getDatePickerConfig(startDate, endDate) {
    return {
        minDate: getDate(startDate),
        maxDate: getDate(endDate),
        dateFormat: "dd/mm/yy",
        changeYear: true,
        gotoCurrent: true,
        showButtonPanel: true
    };
}

function getDate(date) {
    var dsplit = date.split("/");
    var year = dsplit[2];
    var month = dsplit[1] - 1;
    var day = dsplit[0];
    return new Date(year, month, day);
}

function getPeriod() {
    return {
        startDate: getStartDateInput().val(),
        endDate: getEndDateInput().val()
    };
}

function getStartDateInput() {
    return $('.history-advance-start-date');
}

function getEndDateInput() {
    return $('.history-advance-end-date');
}

function getFullPeriod() {
    return {
        startDate: datepickerMinDate,
        endDate: datepickerMaxDate
    };
}

function isPeriodSelected(period) {
    return period.startDate !== '' && period.endDate !== '';
}

function hasError(data) {
    return isNotEmpty(data, 'error') || isNotEmpty(data, 'errors');
}

function isNotEmpty(data, name) {
    return typeof data[name] !== 'undefined' && data[name] !== '';
}

function printErrorByClassName(data, className) {
    var $errorBlock = $(className);
    $errorBlock.text(data['error']);
    $errorBlock.removeClass('hide');
}

function printError(data, $errorBlock) {
    $errorBlock.text(data['error']);
    $errorBlock.removeClass('hide');
}

function hideOperationToMakeError() {
    $('.operation-conseiller-error').addClass('hide');
}

function operationToMake() {

    $( ".operation-select-submit" ).click(function() {

        hideOperationToMakeError();

        $currOption = $('.operation-select').find(":selected");
        operationURL = $currOption.val();

        if (typeof operationURL !== 'undefined' && operationURL !== '') {
            window.open(operationURL, "_blank");
        } else {
            $.ajax({
                url: advisorURL,
                type: 'POST',
                dataType: 'json',
                data: {},
                success: function (data) {
                    if (hasError(data)) {
                        printErrorByClassName(data, '.operation-conseiller-error');
                    } else {
                        $advisorTpl = $('.content-select--wrapper .template-advisor').clone();
                        $advisorTpl.removeClass('hide template-advisor');

                        var textBlock = $advisorTpl.find('span');
                        textBlock.text(textBlock.text()
                            .replace("{0}", data['telephone'])
                            .replace("{1}", data['mail']));
                        $advisorTpl.insertAfter('.operation-select-submit');
                    }
                }
            });
        }
    });

    changeButtonStatus();

    $( ".operation-select" ).change(function() {
        changeButtonStatus();
        $('.content-select--wrapper .consultant__contacts').not('.template-advisor').remove();
        hideOperationToMakeError();
    });
}

function changeButtonStatus() {
    $currOption = $('.operation-select').find(":selected");
    if ($currOption.length) {
        $('.operation-select-submit').prop('disabled', $currOption.hasClass('def-operation'));
    }
}

function  dataPickRegion() {
    $.datepicker.regional['fr'] = {
        closeText: 'Fermer',
        prevText: '&#x3c;Préc',
        nextText: 'Suiv&#x3e;',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
            'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
        monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
            'Jul','Aou','Sep','Oct','Nov','Dec'],
        dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
        dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
        weekHeader: 'Sm',
        dateFormat: 'dd-mm-yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        minDate: 0,
        maxDate: '+12M +0D',
        numberOfMonths: 1,
        showButtonPanel: true
    };
    $.datepicker.setDefaults($.datepicker.regional['fr']);

    $.datepicker._gotoToday = function(id) {
        var today = new Date();
        var dateRef = jQuery("<td><a>" + today.getDate() + "</a></td>");
        this._selectDay(id, today.getMonth(), today.getFullYear(), dateRef);
    }
}

function addCookie(name, value){
    $.ajax({
        url : addCookieURL,
        data : { name: name, value: value },
        cache : false,
        dataType: 'json',
        type: 'POST',
        async: false
    });
}

function getCookie(name){
    var result = '';
    $.ajax({
        url : getCookieURL,
        data : { name: name},
        type: 'POST',
        async: false,
        cache : false,
        dataType: 'json',
        success: function(data) {
            if (typeof data[name] !== 'undefined' && data[name]) {
                result = data[name];
            }
        },
        failure: function(errMsg) {
            if (console) {
                console.log(errMsg);
            }
        }
    });
    return result;
}

function recaptchaSuccessPosition() {
    if($(window).width() > 1024) {
        $('html, body').stop().animate({ scrollTop: $('#captcha').offset().top - 130 }, 1000);
    }

    if($(window).width() < 1024) {
        $('body').stop().animate({ scrollTop:  window.recaptchaTarget.top - 130 }, 1000);
    }
}
function capturefind() {
    window.recaptchaTarget = $('#captcha').offset();
}

function capTargPos() {
    if($(window).width() > 1024) {
        $('html, body').stop().animate({ scrollTop: $('[data-init=show-details]').offset().top - 400 }, 1000);
    }

    if($(window).width() < 1024) {
        $('body').stop().animate({ scrollTop:  window.recaptchaTarget.top - 260 }, 1000);
    }
}
function capTarg() {
    window.detailsTargetTarget = $('[data-init=show-details]').offset();
}

function eqheightBlock() {
    var left = $('.width-48.left').outerHeight();
    var right = $('.width-48.right').outerHeight();
    var leftBlock = $('.width-48.left');
    var rightBlock = $('.width-48.right');
    var left2 = $('.left-interactive').outerHeight();
    var right2 = $('.right-interactive').outerHeight();
    var leftBlock2 = $('.left-interactive');
    var rightBlock2 = $('.right-interactive');

    if($(window).width() > 767 ) {
        if (right < left) {
            rightBlock.css('height', left);
        }

        if (left < right) {
            leftBlock.css('height', right);
        }

        if (right2 < left2) {
            rightBlock2.css('height', left2);
        }

        if (left2 < right2) {
            leftBlock2.css('height', right2);
        }
    }
}

function impersonation() {
    $('.desebled-change').click(function(e) {
        e.stopImmediatePropagation()
    });
    $('.desebled-submit').click(function(e) {
        e.stopImmediatePropagation()
    });
}

function historiqueRemboursementsSantePortlet() {

    function loadRemboursementsSanteItems(page) {
        var historiqueRemboursements = $('.historique-des-remboursements');
        var result = false;
        $.ajax({
            url: remboursementsSanteURL,
            type: 'POST',
            dataType: 'json',
            data: {
                beneficiaire: historiqueRemboursements.find('.beneficiary-type-select').val(),
                dateType: historiqueRemboursements.find('.date-type-select').val(),
                startDate: historiqueRemboursements.find('.hist-sante-start-datepicker').val(),
                endDate: historiqueRemboursements.find('.hist-sante-end-datepicker').val(),
                page: page
            },
            success: function (data) {
                var $errorBlock = historiqueRemboursements.find('.hist-sante-error');
                if (hasError(data)) {
                    printError(data, $errorBlock);
                    historiqueRemboursements.find('#remboursementsSanteList').html('');
                    switchSeeMoreBlock(true);
                } else if (data.trim() !== '') {
                    $errorBlock.addClass('hide');
                    historiqueRemboursements.find('#remboursementsSanteList').html('');
                    $(data).appendTo(historiqueRemboursements.find('#remboursementsSanteList'));
                    result = true;

                    var paginationDataHolder = $('.historique-des-remboursements').find('.pagination-data-holder');
                    switchSeeMoreBlock(paginationDataHolder.attr('data-see-more') !== 'true');
                    if (paginationDataHolder.attr('data-show-bordereau') === 'true') {
                        $('.link-sante-info').show();
                    } else {
                        $('.link-sante-info').hide();
                    }
                    paginationDataHolder.remove();
                } else {
                    switchSeeMoreBlock(true);
                }
                $('.content-inner-hide__block').addClass('add-nev');
                $('.prevoyance--sante-page .content-inner-hide__block').addClass('add-nev');
                $('.content-hide-block__arr').on('click', function () {
                    $('body').find('.content-hide-block').find('.content-inner-hide__block').addClass('add-nev');
                });
            },
            failure: function(errMsg) {
                if (console) {
                    console.log(errMsg);
                }
            }
        });
        return result;
    }

    function switchSeeMoreBlock(hide) {
        if (hide) {
            $('.more-info-bth-prevoyance').addClass('hide');
        } else {
            $('.more-info-bth-prevoyance').removeClass('hide');
        }
    }
    function initDateTypeFilterMessage(historiqueRemboursements) {
        var dateTypeFilter = historiqueRemboursements.find('.date-type-select');
        $('.list-title[data-date-type="' + dateTypeFilter.val() + '"]').removeClass('hide');
    }

    function initDatePickers(historiqueRemboursements) {
        var datePickerConfig = getDatePickerConfig(histRembrSanteDatePickerStartDate, histRembrSanteDatePickerEndDate);
        historiqueRemboursements.find('.hist-sante-start-datepicker').datepicker(datePickerConfig);
        historiqueRemboursements.find('.hist-sante-end-datepicker').datepicker(datePickerConfig);
        historiqueRemboursements.find('.hist-sante-start-datepicker-link').datepicker(datePickerConfig);
        historiqueRemboursements.find('.hist-sante-end-datepicker-link').datepicker(datePickerConfig);
    }

    function initTelegrapherLink(historiqueRemboursements) {
        $('.hist-sante-telgr-get-link').on('click', function () {
            var regExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
            var date1 = $('.hist-sante-start-datepicker-link').val();
            var date2 = $('.hist-sante-end-datepicker-link').val();
            var date1valid = date1 ? date1.match(regExp) : true;
            var date2valid = date2 ? date2.match(regExp) : true;
            $('.hist-sante-link-error').addClass('hide');
            if (date1valid && date2valid) {
                $('.hist-sante-telgr-get-link').parent().find('.error-value').removeClass('show-error-value');
            } else {
                $('.hist-sante-telgr-get-link').parent().find('.error-value').addClass('show-error-value');
                return;
            }
            if ( date1.match( regExp ) && date2.match( regExp ) ) {
                var dateArr1 = date1.split('/');
                var dateArr2 = date2.split('/');

                var dateFormat1 = new Date( dateArr1[1] + '/' + dateArr1[0] + '/' + dateArr1[2] );
                var dateFormat2 = new Date( dateArr2[1] + '/' + dateArr2[0] + '/' + dateArr2[2] );
                if ( dateFormat1.getTime() > dateFormat2.getTime() ) {
                    // $('body').find('.error-value').addClass('show-error-value');
                    $('.hist-sante-telgr-get-link').parent().find('.error-value').addClass('show-error-value');
                    // first date biggest of last date
                    return;
                } else {
                    $('.hist-sante-telgr-get-link').parent().find('.error-value').removeClass('show-error-value');
                }
            }
            $.ajax({
                url: telechargerLinkURL,
                type: 'POST',
                dataType: 'json',
                data: {
                    dateType: historiqueRemboursements.find('.hist-sante-telgr-date-type').val(),
                    startDate: historiqueRemboursements.find('.hist-sante-start-datepicker-link').val(),
                    endDate: historiqueRemboursements.find('.hist-sante-end-datepicker-link').val()
                },
                success: function (data) {
                    var historiqueRemboursements = $('.historique-des-remboursements');
                    var $errorBlock = historiqueRemboursements.find('.hist-sante-link-error');
                    if (hasError(data)) {
                        printError(data, $errorBlock);
                    } else {
                        $errorBlock.addClass('hide');
                        window.open(data['link'], "_blank");
                    }
                    if (data['link']) {
                        $('.link-sante-info').show();
                    } else {
                        $('.link-sante-info').hide();
                    }
                },
                failure: function(errMsg) {
                    if (console) {
                        console.log(errMsg);
                    }
                }
            });
        });
    }

    function initFiterHandler() {
        $('.hist-sante-filter-submit').on('click', function () {
            var regExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
            var date1 = $('.hist-sante-start-datepicker').val();
            var date2 = $('.hist-sante-end-datepicker').val();
            var date1valid = date1 ? date1.match(regExp) : true;
            var date2valid = date2 ? date2.match(regExp) : true;
            if (date1valid && date2valid) {
                $('.hist-sante-filter-submit').parent().find('.error-value').removeClass('show-error-value');
            } else {
            	$('.hist-sante-error').addClass('hide');
                $('.hist-sante-filter-submit').parent().find('.error-value').addClass('show-error-value');
                return;
            }

            if ( date1.match( regExp ) && date2.match( regExp ) ) {
                var dateArr1 = date1.split('/');
                var dateArr2 = date2.split('/');

                var dateFormat1 = new Date( dateArr1[1] + '/' + dateArr1[0] + '/' + dateArr1[2] );
                var dateFormat2 = new Date( dateArr2[1] + '/' + dateArr2[0] + '/' + dateArr2[2] );

                if (dateFormat1.getTime() > dateFormat2.getTime()) {
                	$('.hist-sante-error').addClass('hide');
                    // $('body').find('.error-value').addClass('show-error-value');
                    $('.hist-sante-filter-submit').parent().find('.error-value').addClass('show-error-value');
                    // first date biggest of last date
                    return;
                } else {
                    $('.hist-sante-filter-submit').parent().find('.error-value').removeClass('show-error-value');
                }
            }
            $('.list-title[data-date-type]').addClass('hide');
            $('.list-title[data-date-type="' + $('.historique-des-remboursements').find('.date-type-select').val().trim() + '"]').removeClass('hide');


            var historiqueRemboursements = $('.historique-des-remboursements');
            historiqueRemboursements.find('#remboursementsSanteList').html('');
            loadRemboursementsSanteItems(1);
        });
    }

    if (typeof remboursementsSanteURL !== 'undefined') {

        var historiqueRemboursements = $('.historique-des-remboursements');

        initDateTypeFilterMessage(historiqueRemboursements);
        initDatePickers(historiqueRemboursements);
        initTelegrapherLink(historiqueRemboursements);
        initFiterHandler();

        loadRemboursementsSanteItems(1);

        histRembrSTabQnt = 1;
    }
}

function specPrevoyance() {
    $('.small-info-block').each(function () {
        var tarrget = $(this).find('.bth-container');
        var more = $(this).find('.bth-container').size();
        if(more > 1) {
            tarrget.parent().find('.bth-container').eq(1).css('bottom', '5px');
            tarrget.parent().find('.bth-container').eq(0).css('bottom', '55px');
        }
    });
}

function buttonDAteMask() {
    $("#contact-axa-member-number").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $(".hasDatepicker").inputmask({
        // alias: 'ij/mm/aa',
        yearrange: { minyear: '1917', maxyear: (function() {
                var date = new Date();
                return date.getFullYear();
            })()}
    });
}

function safariHeader() {
    var hedaer = $('body').find('#main-menu.fixed');
    if($(window).width() < 1025) {
        $(window).on('resize', function () {
            hedaer.css({
                position: 'fixed',
                top: '0'
            });
        });
    }
}

function select() {
    if($('body').find('.adresses-step-2').size() < 1) {
        var selectCss = $('body').find('select');
        selectCss.parent().addClass('select-hover-text');
        selectCss.parent().addClass('select__arrow-btn');
        if ($(window).width() < 768) {
            selectCss.css('display', 'block');
        }
        safariHeader();
    }
}

function myProfileChangeAddress() {
    function scrollEror() {
        var container = $('.field-incorrect').parent('.adresses-step-2').parent().parent();
        var scrollTo = $('.field-incorrect').parent().find('.ws-error').position().top;
        container.animate({
            scrollTop: scrollTo
        }, 1000);
    }
    function errorSpan(value) {
        return '<span class="error-validate field-incorrect">' + value + '</span>';
    }

    function addErrors(data, form) {
        if (typeof data['error'] !== 'undefined' && data['error']) {
            form.find('.ws-error')
                .after(errorSpan(data['error']));
        } else {
            $.each(data.errors, function (key, value) {
                form.find('input[name=' + key + ']').after(errorSpan(value));
                form.find('select[name=' + key + ']').after(errorSpan(value));
            });
        }
        form.addClass('js-height-form');
    }
    $('#addressForm #address').keyup(function () {
        $(this).val(formatAddress($(this).val()));
    });
    $('#addressForm #complement1').keyup(function () {
        $(this).val(formatAddress($(this).val()));
    });
    $('#addressForm #complement2').keyup(function () {
        $(this).val(formatAddress($(this).val()));
    });
    $('#addressForm #ville').keyup(function () {
        $(this).val(formatAddress($(this).val()));
    });

    function formatAddress(address) {
        return removeDiacritics(address).toUpperCase();
    }

    $('.change-address-button button[type=submit]').click(function(e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        var form = $(this).closest('.form-ch-full');
        form.find('.field-incorrect').remove();
        $.ajax({
            cache: false,
            url : changeAddressURL,
            data : form.serialize(),
            type : 'POST',
            dataType: 'json',
            async : false,
            success: function(data) {
                if (typeof data['success'] !== 'undefined' && data['success']) {
                    window.location.search = "?success=true";
                } else {
                    addErrors(data, form);
                    scrollEror();
                }
            },
            failure: function(errMsg) {
                if (console) {
                    console.log(errMsg);
                }
            }
        });
    });
}

function resizeToLandscape() {
    $(window).on('load resize', function() {
        if($(window).width() > 1024){
            $('#top-header').removeClass('desktop-only');
            $('#main-menu').find('.menu-link').removeClass('desktop-only');
            $('#top-header').removeClass('desktop-only');
            $('#main-menu').find('.menu-link.extra').find('img').removeClass('desktop-only');
            $('#main-menu').find('.menu-link.extra').removeClass('desktop-only');
            $('#breadcrumbs').removeClass('desktop-only');
            $('.home-block .four-blue-block').css({
                'position' : 'relative',
                'z-index' : '2'
            });
        } else if($(window).width() < 1025){
            $('#main-menu').find('.menu-link.inBurger').addClass('desktop-only');
            $('#top-header').addClass('desktop-only');
            $('.top-header_member').css('display', 'block');
            $('.home-block .four-blue-block').css({
                'position' : 'relative',
                'z-index' : '-1'
            });
        }
        if(! $("#cookie-message").hasClass('hidden')){
            $('.home-block .content-wrapper').addClass('exendCookies');
        } else if($("#cookie-message").hasClass('hidden')) {
            $('#wrapper').addClass('comlite-hide-cookies');
        }
    });

}

function validateValueSeris() {
    $('#chart4, #chart5, #chart6, #repartitionChart').each(function () {
        var sis = $(this).find('.jqplot-donut-series.jqplot-data-label');
        sis.each(function () {
            if($(this).find('.jqplot-data-label-inner').text().length > 3) {
                $(this).css('padding-left', '5px');
            }
        });
    });
}


function leftMenuBOConfig() {
    $('body').find('#left-menu').size();

    if($('body').find('#left-menu').size() > 0) {
        var opened = $('body').hasClass('open');
        if(opened) {
            $('body').find('.left-menu-extranet').addClass('margin-BO-js');
        }
        $('body').find('.sidenav-toggler').on('click', function () {
            $('body').find('.left-menu-extranet').toggleClass('margin-BO-js');
        });
    }

}

function cardHover() {
    $('body').find('.home-cards').find('.card').find('a').on('mouseenter', function () {
        $(this).parent().closest('div.card').addClass('shadow');
    });

    $('body').find('.home-cards').find('.card').find('a').on('mouseleave', function () {
        $(this).parent().closest('div.card').removeClass('shadow');
    });
}

function setRelatedInputValue(selectDiv, value) {
    if (typeof value !== 'undefined' && value !== '') {
        var relatedInput = $('input[name="' + selectDiv.attr('data-input-name') + '"]');
        relatedInput.val(value);
    }
}

function initOptions(selectDiv) {
    selectDiv.find('.custom-option').bind('click', function () {
        $(this).parent().parent().removeClass('active-custom-select');
        $(this).parent().parent().find('.custom-option-selected').removeClass('active');
        $(this).parent().find('.selected').removeClass('selected');
        $(this).addClass('selected');
        selectDiv.find('.custom-option-selected').text($(this).text());
        setRelatedInputValue(selectDiv, $(this).attr('data-value'));
    });
}

function initSelect(selectDiv) {
    selectDiv.find('.custom-option-selected').bind('click', function () {
        $(this).parent().find('.custom-options-list').toggle();
        $(this).removeClass('active');
        $(this).parent().removeClass('active-custom-select');
        if ($(this).parent().find('.custom-options-list').css('display') === 'block') {
            $(this).addClass('active');
            $(this).parent().addClass('active-custom-select');
            $(this).parent().addClass('active-select-field');
        }
    });
    selectDiv.find('.custom-options-list').bind('click', function () {
        $(this).toggle();
    });
    initOptions(selectDiv);
    var activeItem = selectDiv.find('.custom-option.selected');
    selectDiv.find('.custom-option-selected').text(activeItem.text());
    setRelatedInputValue(selectDiv, activeItem.attr('data-value'));
}

function contactAxaPortlet() {

    function setFirstItemActive(select) {
        select.find("li").removeClass("selected");
        var firstItem = select.find("li:first");
        firstItem.addClass("selected");
        select.find(".custom-option-selected").text(firstItem.text());
        setRelatedInputValue(select.find('.select-list'), firstItem.attr('data-value'));
    }

    function switchSelect(currCheckbox, select) {
        if ($(currCheckbox).is(":checked")) {
            select.removeClass('hide');
        } else {
            select.addClass('hide');
        }
    }

    function switchElement(currCheckbox, elem) {
        if ($(currCheckbox).is(":checked")) {
            elem.removeClass('hide');
        } else {
            elem.addClass('hide');
        }
    }

    function extranetForm() {
        $("#checkbox-one-1").click(function () {
            hideAllRelatedElements();
            switchSelect(this, $('.connect-advisor-select'));
            switchElement(this, $('.connect-advisor-numero'));
        });
        $("#checkbox-one-2").click(function () {
            hideAllRelatedElements();
            switchSelect(this, $('.select-make-app-membership'));
            switchElement(this, $('.make-membership'));
        });
        $("#checkbox-one-3").click(function () {
            hideAllRelatedElements();
            switchSelect(this, $('.receive-information-type-select'));
        });
        $("#checkbox-one-4").click(function () {
            hideAllRelatedElements();
            switchElement(this, $('.checkbox-one-4-field'));
        });
        $("#checkbox-one-5").click(function () {
            hideAllRelatedElements();
            switchSelect(this, $('.complain-type-select'));
            switchElement(this, $('.complain-tooltip'));
        });

        $(".complain-type-select").find('.custom-option').click(function () {
            var complainType = $(this).attr('data-value');
            if (complainType === myAdhesionSelectItemName) {
                $('.complain-type-contracts-select').removeClass("hide");
                $('.complain-contract').removeClass('hide');
            } else {
                $('.complain-type-contracts-select').addClass("hide");
                $('.complain-contract').addClass('hide');
            }
        });
    }

    function publicForm() {
        $(".dynamic-radiobutton").click(function () {
            hideAll();
            var relElemName = $(this).attr('data-rel-elem-name');
            var currRadiobutton = this;
            $('[data-elem-name="' + relElemName + '"]').each(function () {
                switchElement(currRadiobutton, $(this));
            });
        });
        $("[name='member']").change(function () {
            if (this.value === 'true') {
                $('.numero-adherent-field').removeClass("hide");
                $('.conected-col').removeClass("hide");
            } else {
                $('.numero-adherent-field').addClass("hide");
                $('.conected-col').addClass("hide");
            }
        });

        function createNewOption(index, value) {
            return '<li class="custom-option ' + (index === 0 ? 'selected' : '')
                + '" data-value="' + value + '">' + value + '</li>';
        }

        function addVillesSelect(villeSelect, data, villeInput) {
            villeSelect.find('.custom-option').remove();

            $.each(data, function (index, element) {
                if (index === 0) {
                    villeSelect.find('.custom-option-selected').text(element.nom);
                    setRelatedInputValue(villeSelect, element.nom);
                }
                $(createNewOption(index, element.nom)).appendTo(villeSelect.find('.custom-options-list'));
            });
            villeSelect.removeClass('hide');
            villeInput.addClass('hide');
            initOptions(villeSelect);
        }

        function addVilleInput(villeInput, value, villeSelect) {
            villeInput.val(value);
            villeInput.removeClass('hide');
            villeSelect.addClass('hide');
        }

        $( "#contact-axa-postal-code-disabled" ).keyup(function() {
            var $codePostal = $(this);
            $.ajax({
                url: getVillesURL,
                type: 'POST',
                dataType: 'json',
                data: {
                    query: $codePostal.val()
                },
                success: function (data) {
                    var villeInput = $(".ville-field");
                    var villeSelect = $(".ville-select");
                    if (hasError(data)) {
                        console.log(data['error']);
                        addVilleInput(villeInput, '', villeSelect);
                    } else {
                        if (data.length === 1) {
                            addVilleInput(villeInput, data[0].nom, villeSelect);
                        } else if (data.length > 1) {
                            addVillesSelect(villeSelect, data, villeInput);
                        } else {
                            addVilleInput(villeInput, '', villeSelect);
                        }
                    }
                },
                failure: function(errMsg) {
                    if (console) {
                        console.log(errMsg);
                    }
                }
            });
        });
    }

    extranetForm();
    publicForm();

    function hideAll() {
        $('.hidden-field').addClass('hide');
        $('.hidden-select').addClass('hide');
    }

    function hideAllRelatedElements() {
        hideAll();
        $('.hidden-select').each(function () {
            setFirstItemActive($(this));
        });
    }
}

function mobileContractInfo() {
    if($(window).width() < 768) {
        var targetLIn = $('body').find('.page-top-title');
        var pageInfo = $('body').find('.page-top-title').outerHeight();
        $('.page-top-title ').append('<div class="hide-info-js">Info <span class="hide-info-js__arr"></span></div>');
        $('.hide-info-js').addClass('no-click');
        $(window).on('scroll', function () {
            if($(window).scrollTop() > (pageInfo + 30)) {
                targetLIn.addClass('info-toggle-js');
            } else {
                targetLIn.removeClass('info-toggle-js');

            }

            if($(window).scrollTop() <  (pageInfo)){
                $('.hide-info-js').addClass('no-click');
            } else {
                $('.hide-info-js').removeClass('no-click');
            }
        });

        $('.hide-info-js').on('click', function () {
            if (!$('.hide-info-js').hasClass('no-click')) {
                targetLIn.toggleClass('info-toggle-js');
                $('.hide-info-js__arr').toggleClass('change-js');
            }
        });
    }
}

function getForm() {
    return $('.form-validation');
}

function recaptchaCallback() {
    $form = getForm();
    $form.find('input[name="captcha"]').attr("value", "true");
    $form.find('.contact-captcha .error-text').addClass('hide');
    recaptchaSuccessPosition();
}

function flushRecaptchaValue() {
    getForm().find('input[name="captcha"]').attr("value", "");
}

function expiredRecaptchaCallback() {
    flushRecaptchaValue();
}

function isValidForm() {
    if(isImpersonated) {
        return false;
    }
}

function lengthSymb() {
    var maxCode = 5;
    $('#contact-axa-postal-code').keyup( function(){
        var $this = $(this);
        if($this.val().length > maxCode)
            $this.val($this.val().substr(0, maxCode));
    });
    var maxTel = 15;
    $('#contact-axa-phone').keyup( function(){
        var $this = $(this);
        if($this.val().length > maxTel)
            $this.val($this.val().substr(0, maxTel));
    });
}

function addErrorsByClass(data, form) {
    $.each(data.errors, function (key, value) {
        form.find(value).show();
    });
}

function  hideBlockEstimate() {
    $('.toggle-arrow-btn').on('click', function (e) {
        e.preventDefault();
    });
    $(document.body).delegate('.hide-block-content__visible-part', "click touch", function() {
        var isActive = $(this).find('.toggle-arrow-btn').hasClass('open');
        if (isActive === false) {
            $('.hide-block-content--empty-part').addClass('empty-naw');
            $('.toggle-arrow-btn').removeClass('open');
            $('.hide-block-content__visible-part--value').removeClass('invisible-val');
            $(this).find('.toggle-arrow-btn').addClass('open');
            $(this).parent().find('.hide-block-content__visible-part--value').addClass('invisible-val');
            $(this).parent().find('.hide-block-content--empty-part').removeClass('empty-naw');
            var heightLeg = $(this).parent().find('.hide-block-content__table--legend').height();
            $(this).parent().find('.hide-block-content__table--container').css('height', heightLeg);
            var L1 = $(this).parent().find('.hide-block-content__table--legend').find('.legend').eq(0).outerHeight();
            var L2 = $(this).parent().find('.hide-block-content__table--legend').find('.legend').eq(1).outerHeight();
            var L3 = $(this).parent().find('.hide-block-content__table--legend').find('.legend').eq(2).outerHeight();
            var L4 = $(this).parent().find('.hide-block-content__table--legend').find('.legend').eq(3).outerHeight();

            $(this).parent().find('.hide-block-content__table--col').find('.val:nth-child(2)').css('height', L1 + 'px');
            $(this).parent().find('.hide-block-content__table--col').find('.val:nth-child(3)').css('height', L2 + 'px');
            $(this).parent().find('.hide-block-content__table--col').find('.val:nth-child(4)').css('height', L3 + 'px');
            $(this).parent().find('.hide-block-content__table--col').find('.val:nth-child(5)').css('height', L4 + 'px');
            var btn = $(this).parent().find('.hide-block-content__bottom-description-block').height();
            if($(window).width() < 768) {
                if(btn > 109) {
                    $(this).parent().find('.hide-block-content__bottom-description-block').find('.see-all-description').show();
                } else {
                    $(this).parent().find('.hide-block-content__bottom-description-block').find('.see-all-description').hide();
                }
            }
        } else {
            $(this).find('.toggle-arrow-btn').toggleClass('open');
            $(this).parent().find('.hide-block-content--empty-part').toggleClass('empty-naw');
            $(this).find('.hide-block-content__visible-part--value').toggleClass('invisible-val');
            var L1 = $(this).parent().find('.hide-block-content__table--legend').find('.legend').eq(0).outerHeight();
            var L2 = $(this).parent().find('.hide-block-content__table--legend').find('.legend').eq(1).outerHeight();
            var L3 = $(this).parent().find('.hide-block-content__table--legend').find('.legend').eq(2).outerHeight();
            var L4 = $(this).parent().find('.hide-block-content__table--legend').find('.legend').eq(3).outerHeight();

            $(this).parent().find('.hide-block-content__table--col').find('.val:nth-child(2)').css('height', L1 + 'px');
            $(this).parent().find('.hide-block-content__table--col').find('.val:nth-child(3)').css('height', L2 + 'px');
            $(this).parent().find('.hide-block-content__table--col').find('.val:nth-child(4)').css('height', L3 + 'px');
            $(this).parent().find('.hide-block-content__table--col').find('.val:nth-child(5)').css('height', L4 + 'px');
        }
    });
}

function displayControll() {
    $('.estimation-page .estimation-page__display').eq(1).find('.estimation-page__display--form-wrapper').addClass('not-active-display');
    $('.estimation-page__display__content .estimated').on('click', function (e) {
        var form = $('form.estimation-page__display__content');
        e.preventDefault();
        form.find('.error-massage').hide();
        $.ajax({
            url : sendUserFormCAPEntrepreneurURL,
            data : form.serialize(),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (hasError(data)) {
                    addErrorsByClass(data, form);
                } else {
                    $('.prevoyance-estimation-val').html(data['prevoyanceEstimation']);
                    $('.sante-estimation-val').html(data['santeEstimation']);
                    $('.summary-estimation-val').html(data['summaryEstimation']);

                    $('form.mail-form').find('input[name=userJobCategory]').val(form.find('select[name=jobCategory] option:selected').text());
                    $('form.mail-form').find('input[name=userBirthDate]').val(form.find('input[name=birthDate]').val());
                    $('form.mail-form').find('input[name=userInstallationDate]').val(form.find('input[name=installationDate]').val());
                    $('form.mail-form').find('input[name=userCodePostal]').val(form.find('input[name=codePostal]').val());
                    $('form.mail-form').find('input[name=prevoyanceEstimation]').val(data['prevoyanceEstimation']);
                    $('form.mail-form').find('input[name=santeEstimation]').val(data['santeEstimation']);

                    $('.estimation-page .estimation-page__display').eq(0).find('.estimation-page__display__content').addClass('not-active-display');
                    $('.estimation-page .estimation-page__display').eq(0).find('.edit-btn').removeClass('empty');

                    $('.estimation-page .estimation-page__display').eq(1).find('.estimation-page__display--form-wrapper').removeClass('not-active-display');
                }
            }
        });
    });

    $('.edit-btn').on('click', function () {
        $(this).addClass('empty');
        $('.estimation-page .estimation-page__display').eq(0).find('.estimation-page__display__content').removeClass('not-active-display');
        $('.estimation-page .estimation-page__display').eq(1).find('.estimation-page__display--form-wrapper').addClass('not-active-display');
        $('.hide-block-content--empty-part').addClass('empty-naw');
        $('.toggle-arrow-btn').removeClass('open');
    });
}

function tablePaginationEstimate() {
    if($(window).width() < 768){
        $('.hide-block-content__table--container--btn_left, .hide-block-content__table--container--btn_right').show();
        $('.hide-block-content__table--container').addClass('mobile');
        var bthPrev = $('.hide-block-content__table--container--btn_left');
        var bthNext = $('.hide-block-content__table--container--btn_right');
        var firstCont = $('.hide-block-content__table--container').eq(0).find('.hide-block-content__table--col');
        var i = 0;
        firstCont.eq(0).addClass('showed');
        bthPrev.on('click',  function () {
            firstCont.eq(i).removeClass('showed').css('z-index', '0');
            i--;
            if( i < 0 ) {
                i = firstCont.length - 1;
            }

            firstCont.eq(i).addClass('showed').css('z-index', '1');
        });
        bthNext.on('click', function () {
            firstCont.eq(i).removeClass('showed').css('z-index', '0');
            i++;
            if (i >= firstCont.length) {
                i = 0;
            }

            firstCont.eq(i).addClass('showed').css('z-index', '1');
        });

        var lasttCont = $('.hide-block-content__table--container').eq(1).find('.hide-block-content__table--col');
        var y = 0;
        lasttCont.eq(0).addClass('showed');
        bthPrev.on('click',  function () {
            lasttCont.eq(y).removeClass('showed').css('z-index', '0');
            y--;
            if( y < 0 ) {
                y = lasttCont.length - 1;
            }
            lasttCont.eq(y).addClass('showed').css('z-index', '1');
        });
        bthNext.on('click', function () {
            lasttCont.eq(y).removeClass('showed').css('z-index', '0');
            y++;
            if (y >= lasttCont.length) {
                y = 0;
            }
            lasttCont.eq(y).addClass('showed').css('z-index', '1');
        });
        bthPrev.on('click', function() {
            $('.hide-block-content__table--col.showed').trigger('click');
        });
        bthNext.on('click', function() {
            $('.hide-block-content__table--col.showed').trigger('click');
        });
    }
}

function openDescriptionBtn() {
    $('.hide-block-content__bottom-description ').find('.see-all-description').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('full');
        $(this).parent().toggleClass('full-height');
    });
}

function changingEstimationLevel() {
    $('.hide-block-content__table--col').click(function() {
        var level = $(this).data('level');
        var form = $('form.estimation-page__display__content');
        form.find('input[name=level]').val(level);
        $.ajax({
            url: sendUserFormCAPEntrepreneurURL,
            data: form.serialize(),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (hasError(data)) {
                    addErrorsByClass(data, form);
                } else {
                    $('.prevoyance-estimation-val').html(data['prevoyanceEstimation']);
                    $('.sante-estimation-val').html(data['santeEstimation']);
                    $('.summary-estimation-val').html(data['summaryEstimation']);

                    $('form.mail-form').find('input[name=prevoyanceEstimation]').val(data['prevoyanceEstimation']);
                    $('form.mail-form').find('input[name=santeEstimation]').val(data['santeEstimation']);
                    $('form.mail-form').find('input[name=prevoyanceLevel]').val(form.find('input[name=level]').val());

                    $('.hide-block-content__table--col').removeClass('active');
                    $('.hide-block-content__table--col[data-level=' + level + ']').addClass('active');
                }
            }
        });
    });
}
$('.right-part__blog-list .taglib-page-iterator .dropdown-toggle ').on('click', function() {
    $('body').find('.yui3-widget').appendTo('.lfr-pagination');
});


function submitMailForm() {
    $('.mail-form button.hide-block-content--form-submit').click(function(e) {
        e.preventDefault();
        var form = $(this).closest('form');
        form.find('.error-massage').hide();
        $.ajax({
            url: sendEntrepreneurMailURL,
            data: form.serialize(),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (hasError(data)) {
                    addErrorsByClass(data, form);
                } else {
                    $(location).attr('href', data['redirectLink'])
                }
            }
        });
    });
}
function actualiseBigSlider() {
    $('[data-init=actualies-big-slider]').slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        draggable: false,
        responsive: [
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    dots: false,
                    draggable: true,
                    initialSlide: 1
                }
            }
        ]
    });
}

function mobileBlogActualiesSlider() {
    var absentParent = $('body').find('.home-block').length;
    $(window).on('load resize', function () {
        if($(window).width() < 719) {
            $('[data-init=block-list-slider]').slick({
                arrows: false,
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 1.1,
                slidesToScroll: 1
            });
        }

        if(absentParent < 1) {
            $('.actualies__container').addClass('modern-width');
            if($(window).width() < 719) {
                $('[data-init=block-list-slider]').slick('unslick');
            }
        }
    });
}

// lot/3.1.1

function openTab() {
    $(window).on('load resize', function () {
        var sizeW = $(window).width();
        if(sizeW > 1024) {
            var i;
            var tab = $('.tabcontent');
            var tabLink = $('.tablinks');
            var linksArr = [];
            for (i = 0; i < tabLink.length; i++) {
                linksArr[i] = tabLink[i];
                tabLink[i].setAttribute("data-open", "tabNam-" + i)
            }

            for (i = 0; i < tab.length; i++) {
                tab[i].style.display = "none";
            }

            tabLink.on('click', function () {
                var di = $(this).data('open');
                tab.hide();
                tabLink.removeClass('active');
                $(this).addClass('active');
                $('.tab-block').find("#" + di).show();

            });
            findFirst();
        }
    });
}

function checkAllElement() {
    var ss = [];
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        ss[i] = tabcontent[i];
        tabcontent[i].setAttribute("id", "tabNam-" + i);
    }

}
function checkWindow() {
    $(window).resize(function () {
        if($(window).width() > 1024) {
            $('.tabcontent').each(function() {
               $(this).css('display', 'none');
               findFirst();
            });
        } else if($(window).width() < 1025) {
            $('.tabcontent').each(function() {
                $(this).css('display', 'block');
            });
        }
    });
}


function findFirst() {
    if($(window).width() > 1024) {
        $('.tab-block').find('.tabcontent').eq(0).show();
        $('.tab-nav').find('.tablinks').eq(0).addClass('active');
    }
}

function createNewTitle() {
    var mas = [];
    var btn = $('[data-init=show-full-screen] span');
    var aa = $('.tablinks');
    var i;
    for(i = 0; i < aa.length; i++ ) {
        mas[i] = aa[i].innerText;
    }
    for(i=0; i < btn.length; i++ ) {
        btn[i].innerText = mas[i];
    }
}
function togleTabHeight() {
    var tabCont = $('.tabcontent');
    var btn = $('[data-init=show-full-screen]');
    var pos, b;

    btn.on('click', function () {
        var open = $(this).hasClass('update-height-arr');
        pos = $(this).parent().attr('id');
        b = $('#' + pos);
        console.log(pos);
        var maxHeight;
        var thisParentMaxHeight = $(this).parent(tabCont).find('.tabcontent-left').outerHeight();
        var thisParentMaxHeight2 = $(this).parent(tabCont).find('.tabcontent-right').outerHeight();
        if(thisParentMaxHeight > thisParentMaxHeight2) {
            maxHeight = thisParentMaxHeight;
        } else {
            maxHeight = thisParentMaxHeight2;
        }
        tabCont.css({
            'max-height' : '62px'
        });
        btn.removeClass('update-height-arr');
        if(!open) {
            $(this).addClass('update-height-arr');
            $(this).parent(tabCont).css({
                'max-height' : maxHeight + 'px'
            });
        } else {
            $(this).parent(tabCont).css({
                'max-height' : '62px'
            });
        }

            liga();

    });
    function liga () {
        console.log(b);
        var s = $('body').find(b).offset();
        $('body, html').stop().animate({ scrollTop: s.top - 130 });
    }
}

function descriptionHeightTogle() {
    var MaxHeightContent;

    $('[data-init=change-height]').on('click', function () {
        var thisOpen = $('[data-init=change-height]').hasClass('uses');
        if(!thisOpen) {
            $(this).addClass('uses');
            $(this).parent('.description-bottom__sub-title').css({
                'max-height' : MaxHeightContent + 78 + 'px',
                'padding-bottom': '38px',
                '-webkit-transition': 'max-height 0.15s ease-out',
                '-o-transition': 'max-height 0.15s ease-out',
                'transition': 'max-height 0.15s ease-out'
            });
        } else if(thisOpen)  {
            $(this).removeClass('uses');
            $(this).parent('.description-bottom__sub-title').css({
                'max-height' : '191px'
            });
        }
    });

    $(window).on('load resize', function () {
        MaxHeightContent = $('.description-bottom__sub-title-text').outerHeight();

        if($(window).width() > 1024) {
            $('[data-init=change-height]').parent('.description-bottom__sub-title').css(
                'max-height' , 'none'
            );
        }
    });
}

function checkImgSize() {
    $('.tabcontent').each(function () {
        var a = $(this);
        var s = $(this).find('.tabcontent-right').find('img').length;
        if(s !== 1) {
            a.find('.tabcontent-left').css({'width': '100%', 'max-width' : '100%'});
            a.find('.tabcontent-right').hide();
        }
    });
}

function changeArrow() {
    $('.date-filters-months, .date-filters-years')
        .focus(function() {
            $(this).parent().addClass('focused-select');
        })
        .blur(function() {
            $(this).parent().removeClass('focused-select');
        });
}

function integralContainerPopup() {
    var parenT = $('body');
    parenT.find('.integral-container').remove();
    var newContainer = '<div class="integral-container"></div>';
    var navleft = '<button  class="fancybox-button fancybox-button--arrow_left">' +
        '<div class="title">' +
        Liferay.Language.get('com.agipi.portlet.regulation.previous.title') +
        '</div>' + '<div class="text-prev"></div>' +
        "</button>";
    var navRight ='<button  class="fancybox-button fancybox-button--arrow_right">' +
        '<div class="title">' +
        Liferay.Language.get('com.agipi.portlet.regulation.next.title') +
        '</div>' + '<div class="text-next"></div>' +
        "</button>";
    var closeBtn = '<span class="close-box">+</span>';
    parenT.append(newContainer);
    var i, d, textPrev, textNext, itemLink, itemLinkArr;
    var colection = [];
    var colItem, btnPrev, btnNext;
    var lightBox = $('.integral-container');
    var bottomDecor = '<div class="bottom-decor"></div>';
    itemLink = $('.veille-page__results .veille-page__results-item');
    
    itemLink.on('click', function () {
        parenT.find('.veille-page__results--list.hidden_and_used_by_popupview').clone().appendTo('.integral-container');
        colItem = $('.integral-container .veille-page__results-item');
        $('.integral-container').append(navleft, navRight, bottomDecor);
        for (i = 0; i < colItem.length; i++) {
            colection[i] = colItem[i];
            colItem[i].style.display = 'none';
        }
        colItem.each(function () {
            $(this).append(closeBtn);
        });
        var linkItemList = colItem.length;
        if(linkItemList > 1) {
            $('.integral-container .bottom-decor').addClass('visible');
        }

        var dataItem = $(this).data('find');
        lightBox.show();
        parenT.addClass('body-open-integral-container');
        lightBox.find("#" + dataItem).addClass('current').show();
        deleteLiferayElement();
        prev();
        next();
        addText();
        closePopupBlock();
    });
    function prev() {
        btnPrev = $('.integral-container .fancybox-button--arrow_left');
        btnPrev.on('click', function () {
            $('.integral-container .fancybox-button--arrow_right').show();
            var active  = $('.veille-page__results-item.current');

            if(! active.prev().length < 1) {
                active.removeClass('current').hide().prev().addClass('current').show();
                addText();
            }
        });
    }
    function next() {
        btnNext = $('.integral-container .fancybox-button--arrow_right');
        btnNext.on('click', function () {
            $('.integral-container .fancybox-button--arrow_left').show();
            var active  = $('.veille-page__results-item.current');

            if(! active.next().length < 1) {
                active.removeClass('current').hide().next().addClass('current').show();
                addText();
            }
        });
    }

    function addText() {
        var choises = $('.veille-page__results-item.current');
        if(choises.prev().length < 1) {
            $('.integral-container .fancybox-button--arrow_left').hide();
        } else {
            textPrev = choises.prev().find('.results-item__description').text();
        }
        if(choises.next().length < 1) {
            $('.integral-container .fancybox-button--arrow_right').hide();
        } else {
            textNext = $('.veille-page__results-item.current').next().find('.results-item__description').text();
        }
        lightBox.find('.text-prev').text(textPrev);
        lightBox.find('.text-next').text(textNext);
        $('.fancybox-button--arrow_left .text-prev, .fancybox-button--arrow_right .text-next ').dotdotdot();
    }

    function deleteLiferayElement() {
        lightBox.find('.select-wrap ').remove();
        lightBox.find('.alert.alert-info').remove();
        lightBox.find('input').remove();

    }
    function closePopupBlock() {
        parenT.find('.integral-container .close-box').on('click', function () {
            $('.integral-container').hide();
            $('.integral-container .veille-page__results--list').remove();
            $('.veille-page__results-item.current').removeClass('current').hide();
            $('.fancybox-button').remove();
            $('.integral-container .bottom-decor').remove();
            parenT.removeClass('body-open-integral-container');
        });
    }


    function fixSelect() {
        parenT.find('.date-filters-months, .date-filters-years').parent().removeClass('select-hover-text');
        parenT.find('.date-filters-months, .date-filters-years').parent().removeClass('select__arrow-btn');
    }


    fixSelect();
}



function filterMobileBtn() {
    var bd = $('body');
    $(window).on('load resize', function () {
       if ($(window).width() < 1025) {
           $('[data-init=open-filter]').on('click', function () {
               $('.filter-wrapper').addClass('open-filter-window');
               bd.addClass('body-open-integral-container');
           });

           $('[data-init=filter-close]').on('click', function () {
               $(this).parent('.filter-wrapper').removeClass('open-filter-window');
               bd.removeClass('body-open-integral-container');
           });
       } else if ($(window).width() < 1025) {
           $('.filter-wrapper').removeClass('open-filter-window');
           bd.removeClass('body-open-integral-container');
       }
    });
}

function changeStructure() {
        $('body').find('.four-blue-block').clone().insertBefore(".contact-block.home").addClass('outside');
}

function objectFitIE() {
    objectFitPolyfill($('.video-desktop'));
    var homeVideoMob = $('body').find('.home-block .video-mobile').length;
    var homeVideoDesk = $('body').find('.home-block .video-desktop').length;
    $(window).on('load resize', function () {
        if($(window).width() > 719) {
            if(homeVideoDesk > 0) {
                $('body').find('.video-desktop').get(0).play();
            }
        }
        else if($(window).width() < 720) {
            if(homeVideoMob > 0) {
                $('body').find('.video-mobile').get(0).play();
            }
        }
    });
}

function profilAdresseAlert() {
    var par = $('#agipi').parent();
    var popup = $('.non-distributable').length;
    var element = $('.non-distributable');
    if(popup > 0) {
        par.addClass('overflow-hidden');
        element.clone().appendTo('#main-menu');
    }
    $('[data-init=close-ndp]').on('click', function () {
        par.find('.non-distributable').hide();
        disebledOverflow();
    });
}
function disebledOverflow() {
    $('#agipi').parent().removeClass('overflow-hidden');
}



function gestionPiloteList() {
    if($('.gestion-pilote').length > 0) {
        var list = $('.gestion-pilote__list');
        list.each(function(){
            var btn = $(this).parent().find('[data-init=gestion-pilote-list]');
            var item = $(this).find('.gestion-pilote--link');
            var numberOf = item.length;
            if(numberOf > 4) {
                item.slice(0,4).addClass('visible');
                btn.css('display', 'block');
                $(this).addClass('close-list');
            } else {
                item.addClass('visible');
            }
            btn.on('click', function () {
                var swicH = $(this).parent().find('.gestion-pilote__list');
                if(swicH.hasClass('close-list')) {
                    item.slice(0, numberOf).addClass('visible');
                    swicH.removeClass('close-list');
                    btn.addClass('open-list-btn');
                } else if(!swicH.hasClass('close-list')){
                    item.removeClass('visible');
                    item.slice(0,4).addClass('visible');
                    btn.css('display', 'block');
                    btn.removeClass('open-list-btn');
                    swicH.addClass('close-list');
                    liga(swicH);
                }
            });
        });

        function liga (s) {
            var r = s.offset();
            $('body, html').stop().animate({ scrollTop: r.top -280 });
        }
    }
}

function QuizzForm() {
      setTimeout(function () {
        var quizzForm = $('body .agipi-quizz');
        var quizzClass = quizzForm.size();

        if(quizzClass > 0) {
            $('body').addClass('quizz-form-exist');
            var circle = '<span class="circle--at"></span>';
            var act = '<span class="act"></span>';
            quizzForm.find(".liferay-ddm-form-field-date input.form-control ").attr("placeholder", "jj/mm/aaaa");
            quizzForm.find(".radio label").append(circle);
            $('body').find('.lfr-ddm-form-field-container').on('click', function () {
                $(this).addClass('unswer-input');
                setTimeout(function () {
                    $('body .agipi-quizz').find('.unswer-input .checkbox input, .unswer-input .liferay-ddm-form-field-checkbox-multiple .checkbox-inline input, .liferay-ddm-form-field-checkbox-multiple .checkbox-default input').each(function () {
                        $(this).parent().removeClass('complete-input');
                        $(this).parent().find('.act').remove();
                        $(this).closest('lfr-ddm-form-field-container').removeClass('unswer-input');
                    });
                    $('body .agipi-quizz').find('.unswer-input .checkbox input:checked, .unswer-input .liferay-ddm-form-field-checkbox-multiple .checkbox-inline input:checked, .liferay-ddm-form-field-checkbox-multiple .checkbox-default input:checked').each(function () {
                        $(this).parent().addClass('complete-input');
                    });
                    $('body').find('.complete-input').append(act);
                }, 1000);
            });

            // quizzDatepicker
            var quizzDatePickerBtn = $('.agipi-quizz .liferay-ddm-form-field-date .form-control.trigger');
            quizzDatePickerBtn.datepicker({
                dateFormat: 'dd/mm/yy',
                changeYear: true,
                yearRange: "-100:+0",
                minDate: null,
                maxDate: 0
            });

            quizzDatePickerBtn.on('click', function () {
                var datePicker = $('#ui-datepicker-div');
                var hg = datePicker.height();
                var pisitionField = $(this).offset();
                var newPosition = pisitionField - hg;
                datePicker.css('top', newPosition + 'px !important');
            });

            quizzDatePickerBtn.on('change', function () {
                var thisVal = $(this).val();
                var dateSplit = thisVal.split('/');
                var dateFormat = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0];
                $(this).next().val(dateFormat);

            });
            // quizzDatepicker end

            // quizzSelect
            var quizzOnlyFE = $('body.signed-out.quizz-form-exist');
            quizzOnlyFE.find('select.form-control').each(function() {
                $(this).find('option').removeAttr('selected');
                $(this).find('option').first().prop("disabled", false);
            });

            // quizzSelect end

            if($(window).width() < 768) {
                    var page = $('body').find('.lfr-ddm-form-page').eq(0).hasClass('active');
                    if(!page) {
                        $('body').find('.lfr-ddm-form-pagination-controls').css('min-height', '168px');
                    } else if(page) {
                        $('body').find('.lfr-ddm-form-pagination-controls').css('min-height', '80px');
                    }
                    $('body .lfr-ddm-form-pagination-prev, body .lfr-ddm-form-pagination-next').on('click', function () {
                        setTimeout(function () {
                            $( "body" ).unbind( "focus", ".agipi-quizz .lfr-ddm-form-page.active input");
                            if($('body').find('.agipi-quizz .lfr-ddm-form-page').eq(0).hasClass('active')) {
                                $('body').find('.agipi-quizz .lfr-ddm-form-pagination-controls').css('min-height', '80px');
                            } else {
                                $('body').find('.agipi-quizz .lfr-ddm-form-pagination-controls').css('min-height', '168px');
                            }
                        }, 500);
                    });

                }
        }
    }, 500);
}

function globalThemePopup() {
    var parenT = $('body');
    var btn = parenT.find('.global-popup__btn');
    var clickArea = parenT.find('.global-popup__close-btn');
    var popContainer = parenT.find('.global-popup');
    var circleBtn = $('[data-init=global-popup-open]');
    var actionUrl = popContainer.attr('data-opened-state-action-url');
    var descriptionH, titleH, g;

    circleBtnActive();
    initClosedState();
    clickArea.on('click', function () {
        g =  $('.global-popup');
        titleH = g.find('.global-popup__top').height();
        g.find('.global-popup-container').show();
        descriptionH = g.find('.global-popup-container').height();
        if( ! $('body').find('.global-popup').hasClass('open-popup')) {
            popContainer.addClass('open-popup');
            popContainer.css({
                'max-height': titleH + descriptionH + 100 + 'px',
                '-webkit-transition': 'max-height 0.15s ease-out',
                '-o-transition': 'max-height 0.15s ease-out',
                'transition': 'max-height 0.15s ease-out'
            });
            btn.removeClass('active-btn');
            changeOpenedState(true);
        } else {
            popContainer.removeClass('open-popup');
            popContainer.css({
                'max-height' : titleH + 60 - 25 + 'px',
                '-webkit-transition': 'max-height 0.15s ease-out',
                '-o-transition': 'max-height 0.15s ease-out',
                'transition': 'max-height 0.15s ease-out'
            });
            btn.addClass('active-btn');
            if($(window).width() < 1025) {
                popContainer.css({
                    'max-height' : '0px',
                    '-webkit-transition': 'max-height 0.15s ease-out',
                    '-o-transition': 'max-height 0.15s ease-out',
                    'transition': 'max-height 0.15s ease-out'
                });
                circleBtn.show();
            }
            changeOpenedState(false);
        }
    });

    function circleBtnActive() {
        circleBtn.on('click', function () {
            btn.removeClass('active-btn');
            titleH = $('.global-popup').find('.global-popup__top').height();
            $('.global-popup').find('.global-popup-container').show();
            $(this).hide();
            popContainer.addClass('open-popup');
            popContainer.css({
                'max-height': 'none',
                '-webkit-transition': 'max-height 0.15s ease-out',
                '-o-transition': 'max-height 0.15s ease-out',
                'transition': 'max-height 0.15s ease-out'
            });
            changeOpenedState(true);
        })
    }

    function initClosedState() {
        if (!popContainer.hasClass('open-popup')) {
            titleH = popContainer.find('.global-popup__top').height();
            popContainer.css({
                'max-height' : titleH + 60 - 25 + 'px'
            });
            btn.animate({
                opacity: 1,
                zIndex: 1
            }, 2500, function () {});
            if($(window).width() < 1025) {
                circleBtn.show();
            }
        } else {
            $('.global-popup').find('.global-popup-container').show();
            btn.removeClass('active-btn');
            btn.animate({
                opacity: 1,
                zIndex: 1
            }, 2500, function () {})
        }
    }

    function changeOpenedState(isOpened) {
        $.ajax({
            url : actionUrl,
            data : {
                isOpened: isOpened
        },
            type: 'POST'
        });
    }

}

function homepageNosBlockSlider() {
    $(window).on('load resize', function () {
        if($(window).width() < 720) {
            $('.home-blog-area__container').slick({
                dots: false,
                infinite: false,
                arrows: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 9999,
                        settings: "unslick"
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            dots: false,
                            infinite: false,
                            arrows: false,
                            speed: 300,
                            slidesToShow: 1.2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    });
}

function ucListValueFilter() {
    if($('.page-uc').length > 0 ) {
        $('.value .title').each(function() {
            var s = $(this).text().trim();
            var d = s.indexOf('-');
            if(d === 0) {
                $(this).css('color', '#6B6B6B');
            }
        });
    }
}
$(document).ready(function($){
    if (inIframe()) {
        return;
    }
    globalThemePopup();
    objectFitIE();
    select();
    homepageNosBlockSlider();
    documentsNavportal();
    if($('#left-menu').size() > 0) {
        hideMenu();
    }
    capTarg();
    capturefind();
    cardHover();
    centerPage();
	contactForm();
    lengthSymb();
    menu();
    menuMobile();
    impersonation();
    slider();
    listActuFilter();
    zoombox();
    scrollToAnchor();
    stickyThinMenu();
    activeThinMenuOnScroll();
    marginIfCookie();
    if($('body').hasClass('has-control-menu')){
        backOfice();
        leftMenuBOConfig();
    } else {
        menuDesktop();
    }
    pressSpace();
    togleList();
    Artpagination();
    articleThumbnail();
    scrollToSearchResult();
    textCat();
    mouseover();
    profileDetails();
    extranetPlot();
    contractThumbnail();
    if ($(window).width() < 767) {
        paginationCustom();
    }

    if ($(window).width() > 1023) {
        dragget();
    }
    myDocumentScroll();
    phoneFocus();
    formInterface();
    errorMassageStyle();
    formValidFocus();
    cookieSize();
    helpBth();
    showDetails();
    extranetEvolutionPlot();
    gestionPiloteList();
    provisionDepargneConstitueChart();
    situationadhesionChart();
    extranetEvolutionPlotRetraite();
    changePositionButton();
    if($(window).width() < 1025) {
        statisticBlockPagination();
        contentTableBlockPagination();
    }
    hideInnerBlock();
    hideOuterBlock();
    machheightInBlock();
    membership();
    adhesionDetailLeftMenu();
    changeContentDisplay();
    historyAdvancePortlet();
    operationToMake();
    dataPickRegion();
    historiqueRemboursementsSantePortlet();
    specPrevoyance();
    buttonDAteMask();
    AdaptiveMenu();
    documentsNav();
    resizeToLandscape();
    profilAdresseAlert();
    textCat();
    $(window).on('load resize', function () {
        breadcrumbMarginStyle();
        eqheightBlock();
    });

    validateValueSeris();
    eqheightBlock();
    myProfileChangeAddress();
    mobileContractInfo();

    contactAxaPortlet();
    datepicerSetPos();
    hideBlockEstimate();
    displayControll();
    tablePaginationEstimate();
    openDescriptionBtn();
    changingEstimationLevel();
    submitMailForm();

    // lot/3

    if($('.tabcontent').length > 0) {
        openTab();
        checkAllElement();
        createNewTitle();
        togleTabHeight();
        checkImgSize();
        checkWindow();
    }
    descriptionHeightTogle();
    filterMobileBtn();
    changeArrow();
    integralContainerPopup();
    changeStructure();
    ucListValueFilter();
    mobileBlogActualiesSlider();
    actualiseBigSlider();
    repartitionchart();
});

Liferay.on('allPortletsReady',
	/* This function gets loaded when everything, including the portlets, is on the page. */
	function() {
		QuizzForm();
	}
);


var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
    {'base':'AA','letters':'\uA732'},
    {'base':'AE','letters':'\u00C6\u01FC\u01E2'},
    {'base':'AO','letters':'\uA734'},
    {'base':'AU','letters':'\uA736'},
    {'base':'AV','letters':'\uA738\uA73A'},
    {'base':'AY','letters':'\uA73C'},
    {'base':'B', 'letters':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
    {'base':'C', 'letters':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
    {'base':'D', 'letters':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0'},
    {'base':'DZ','letters':'\u01F1\u01C4'},
    {'base':'Dz','letters':'\u01F2\u01C5'},
    {'base':'E', 'letters':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
    {'base':'F', 'letters':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
    {'base':'G', 'letters':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
    {'base':'H', 'letters':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
    {'base':'I', 'letters':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
    {'base':'J', 'letters':'\u004A\u24BF\uFF2A\u0134\u0248'},
    {'base':'K', 'letters':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
    {'base':'L', 'letters':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
    {'base':'LJ','letters':'\u01C7'},
    {'base':'Lj','letters':'\u01C8'},
    {'base':'M', 'letters':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
    {'base':'N', 'letters':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
    {'base':'NJ','letters':'\u01CA'},
    {'base':'Nj','letters':'\u01CB'},
    {'base':'O', 'letters':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
    {'base':'OI','letters':'\u01A2'},
    {'base':'OO','letters':'\uA74E'},
    {'base':'OU','letters':'\u0222'},
    {'base':'OE','letters':'\u008C\u0152'},
    {'base':'oe','letters':'\u009C\u0153'},
    {'base':'P', 'letters':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
    {'base':'Q', 'letters':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
    {'base':'R', 'letters':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
    {'base':'S', 'letters':'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
    {'base':'T', 'letters':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
    {'base':'TZ','letters':'\uA728'},
    {'base':'U', 'letters':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
    {'base':'V', 'letters':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
    {'base':'VY','letters':'\uA760'},
    {'base':'W', 'letters':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
    {'base':'X', 'letters':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
    {'base':'Y', 'letters':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
    {'base':'Z', 'letters':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
    {'base':'a', 'letters':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
    {'base':'aa','letters':'\uA733'},
    {'base':'ae','letters':'\u00E6\u01FD\u01E3'},
    {'base':'ao','letters':'\uA735'},
    {'base':'au','letters':'\uA737'},
    {'base':'av','letters':'\uA739\uA73B'},
    {'base':'ay','letters':'\uA73D'},
    {'base':'b', 'letters':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
    {'base':'c', 'letters':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
    {'base':'d', 'letters':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
    {'base':'dz','letters':'\u01F3\u01C6'},
    {'base':'e', 'letters':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
    {'base':'f', 'letters':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
    {'base':'g', 'letters':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
    {'base':'h', 'letters':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
    {'base':'hv','letters':'\u0195'},
    {'base':'i', 'letters':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
    {'base':'j', 'letters':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
    {'base':'k', 'letters':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
    {'base':'l', 'letters':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
    {'base':'lj','letters':'\u01C9'},
    {'base':'m', 'letters':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
    {'base':'n', 'letters':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
    {'base':'nj','letters':'\u01CC'},
    {'base':'o', 'letters':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
    {'base':'oi','letters':'\u01A3'},
    {'base':'ou','letters':'\u0223'},
    {'base':'oo','letters':'\uA74F'},
    {'base':'p','letters':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
    {'base':'q','letters':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
    {'base':'r','letters':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
    {'base':'s','letters':'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
    {'base':'t','letters':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
    {'base':'tz','letters':'\uA729'},
    {'base':'u','letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
    {'base':'v','letters':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
    {'base':'vy','letters':'\uA761'},
    {'base':'w','letters':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
    {'base':'x','letters':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
    {'base':'y','letters':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
    {'base':'z','letters':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
];

var diacriticsMap = {};
for (var i=0; i < defaultDiacriticsRemovalMap.length; i++){
    var letters = defaultDiacriticsRemovalMap[i].letters;
    for (var j=0; j < letters.length ; j++){
        diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
    }
}

function removeDiacritics (str) {
    return str.replace(/[^\u0000-\u007E]/g, function(a){
        return diacriticsMap[a] || a;
    });
}
