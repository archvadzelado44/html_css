function maxZ() {
    var maxZ = Math.max.apply(null, $.map($('body *'), function(e, n) {
        if ($(e).css('position') == 'absolute' || $(e).css('position') == 'relative' || $(e).css('position') == 'fixed')
            return parseInt($(e).css('z-index')) || 1;
    }));
    return maxZ;
}

// var tickets = {
//     order: function(obj) {
       
//             if(_form.checkFields($(obj).parent().parent()))
//             {
//                 modal();
//             }

//         return false;
//     },
// }


function localCheckField(obj){

  var error = false;
        var field = false;
        var name = '';
        var parent;


        $.each($(obj).parent().parent().find(':text:visible, :password:visible, select:visible, textarea:visible, input[name="Quantity-Adult"]'), function() { /*:checkbox:visible,*/
            parent = $(this).parent('p').length ? $(this).parent('p') : $(this).parents('div').first();
            if (($(this).is(':checkbox') && !$(this).is(':checked')) ||
                ($(this).attr('name') == "FlightFrom" && $(this).val() == 0) ||
                ($(this).attr('name') == "FlightTo" && $(this).val() == 0) ||
                ($(this).attr('name') == "Quantity-Adult" && $(this).val() == 0) ||
                ($(this).data('error') && $.trim($(this).val()) == '') ||
                ($(this).data('type') == 'email' && !isEmail($(this).val())) ||
                ($(this).data('type') == 'int' && !isInt($(this).val())) ||
                ($(this).data('type') == 'double' && !isFloat($(this).val())) ||
                ($(this).data('minlength') && $.trim($(this).val()).length < $(this).data('minlength')) ||
                ($(this).data('min') && $(this).val() <= $(this).data('min')) ||
                ($(this).data('lengths') && $(this).data('lengths').indexOf($.trim($(this).val()).length) == -1) ||
                ($(this).data('equals') && $(this).val() != $(obj).find('[name="' + $(this).data('equals') + '"]').val())
            ) {
                name = $(this).attr('name') != undefined ? $(this).attr('name').replace('[]', '') : '';
                parent.next('#input-error-' + name).remove();
                if(name == "Quantity-Adult"){
                $(".after").prepend('<p class="input-error" id="input-error-' + name + '">' + $(this).data('error') + '</p>');
                }
                parent.after('<p class="input-error" id="input-error-' + name + '">' + $(this).data('error') + '</p>');
                error = true;
                field = field == false ? $(this) : field;
            } else {
                name = $(this).attr('name') != undefined ? $(this).attr('name').replace('[]', '') : '';
                parent.next('#input-error-' + name).remove();
                 if(name == "Quantity-Adult"){ $("#input-error-Quantity-Adult").remove();}
            }
        });

        if (field) {
            field.focus();
        }

        return error;

}

 function readyOrder(obj)
 {
    if(localCheckField(obj))
    {   
        return false;
    }
    else
    {
        $('#AirModal').modal('toggle');
    }
    
    
    
 }

 function modal() {
  
     $('#AirModal').on('show.bs.modal', function (e) {
    return e.preventDefault();
         });
 }

 // function readyOrder(obj){


 //     if (_form.checkFields($(obj).parent().parent()))
 //     {           
 //                 modal();
 //                 return false;
 //     }
 //     else
 //     {
 //        $('#AirModal').modal('show');

 //     }
 //   return;
 // }

function validateUser(obj){

   
    console.table($(obj).parent().parent());
     if (localCheckField(obj))
     {           
        return false;
     }
     else{
        sendOrder();
     }

}

function sendOrder(){

    alert(langs.OrderSuccess);
}
 

function isEmail(email) {
    var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (email.search(emailRegEx) == -1) {
        return (false);
    }
    return (true);
}

function isInt(input) {
    return !isNaN(input) && parseInt(input) == input;
}

function isFloat(input) {
    return !isNaN(input) && parseFloat(input) == input;
}

function isPos(input) {
    return input * -1 <= 0;
}
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function validate(e, type) {
    switch (type) {
        case 'int':
            return validateDouble(e);
            break;

        case 'double':
            return validateDouble(e, 1);
            break;

        case 'alpha':
            return validateAlpha(e);
            break;
    }
}

function validateDouble(e, _double) {
    if (!validateKeys(e, _double)) {
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

function validateAlpha(e) {
    if (!validateKeys(e)) {
        return;
    }
    // Ensure that it is a alpha and stop the keypress
    if (!(e.keyCode > 64 && e.keyCode < 91)) {
        e.preventDefault();
    }
}

function validateKeys(e, _double) {
    // Allow: backspace, delete, tab, escape and enter
    var keyCodes = [46, 8, 9, 27, 13];
    if (_double) {
        keyCodes.push(110);
        keyCodes.push(190);
    }
    if ($.inArray(e.keyCode, keyCodes) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return false;
    }
    return true;
}

function changeLang(lang) {
    $.cookie('Lang', lang, { expires: parseInt(COOKIE_SITE_TIME), path: '/', domain: COOKIE_SITE_DOMAIN, secure: false });
    location.href = location.href.replace('/' + LANG + '/', '/' + lang + '/');
    return false;
}

function populateGet() {
    var obj = {},
        params = location.search.slice(1).split('&');
    for (var i = 0, len = params.length; i < len; i++) {
        var keyVal = params[i].split('=');
        var l = decodeURIComponent(keyVal[0]);
        if (l.substr(l.length - 2) == '[]') {
            var obj_arr = obj[l.substr(0, l.length - 2)];
            if (obj_arr) {
                obj[l.substr(0, l.length - 2)][obj_arr.length] = decodeURIComponent(keyVal[1]);
            } else {
                obj[l.substr(0, l.length - 2)] = [decodeURIComponent(keyVal[1])];
            }
        } else {
            obj[decodeURIComponent(keyVal[0])] = decodeURIComponent(keyVal[1]);
        }
    }
    return obj;
}
var GET = populateGet();

function scrollToSection(section) {
    $('body, html').animate({ scrollTop: $('section[data-name="' + section + '"]').offset().top }, 500);
    return false;
}

$(document).ready(function() {
    function showSearch() {
        var searchButton = $('.search-button');
        var searchContainer = $('.search-block');
        var closeButton = $('.search-block .fa');

        closeButton.on('click', function() {
            searchContainer.removeClass('active');
        });

        searchButton.on('click', function() {
            searchContainer.toggleClass('active');
        });
    }
    showSearch();

    // main slider
    var swiper = new Swiper('.main-swiper.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });

    //category slider
    var swiper = new Swiper('.category-slider.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30,
        nextButton: '.category-slider-container .arrow.next',
        prevButton: '.category-slider-container .arrow.prev',
        breakpoints: {
            992: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });

    //detail slider
    var swiper = new Swiper('.detail-slider.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });

    //scroll top
    $('.scroll-top').on('click', function() {
        $("html, body").animate({ scrollTop: "0" });
    });

    // partners

    var swiper = new Swiper('.partners .swiper-container', {
        slidesPerView: 5,
        spaceBetween: 30,
        nextButton: '.partners .fa-chevron-right',
        prevButton: '.partners .fa-chevron-left',
        breakpoints: {
            1333: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            720: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            450: {
                slidesPerView: 1,
                spaceBetween: 30
            }
        }
    });

    //production slider
    var swiper = new Swiper('.production-slider .swiper-container', {
        slidesPerView: 5,
        spaceBetween: 30,
        nextButton: '.production-slider .fa-chevron-right',
        prevButton: '.production-slider .fa-chevron-left',
        breakpoints: {
            1333: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            720: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            450: {
                slidesPerView: 1,
                spaceBetween: 30
            }
        }
    });


    // order
    // $('#vertical').lightSlider({
    //     gallery:true,
    //     item:1,
    //     vertical:true,
    //     verticalHeight:300,
    //     vThumbWidth:50,
    //     thumbItem:8,
    //     thumbMargin:4,
    //     slideMargin:0
    // });  


    $(".contact-dropdown").click(function(){
        $(".fast-contact").slideToggle();
    });

    $(".menu-dropdown").click(function(){
        $(".nav-menu").slideToggle();
    });




});
//carousel slider mian
var owl = $('.first-slider');
  owl.owlCarousel({
    margin: 0,
    autoplay: true,
    loop: true,
    dots: true,
    dotsData: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
  });


$('.loop').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 50,
    navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    nav:true,
    responsive: {
      600: {
        items: 1.5
      }
    }
  });


$( window ).resize(function() {
  if ($(window).width() <= 560) {
    $('.pop-offer-title').removeClass('title-transp');
    $('.pop-offer-text').addClass('title-background');
  } else {
    $('.pop-offer-title').addClass('title-transp');
    $('.pop-offer-text').removeClass('title-background');
  }
});

if ($(window).width() <= 560) {
    $('.pop-offer-title').removeClass('title-transp');
    $('.pop-offer-text').addClass('title-background');
    setInterval(function(){
        if($(window).scrollTop()<80){
            $(".hover-info").css("left","-100px");
            $(".hover-info").css("transition",".2s");
            $(".hover-info").css("display","none");
        }
        else{
            $(".hover-info").css("left","0");
            $(".hover-info").css("transition",".2s");
            $(".hover-info").css("display","block");
        }
    },100);
}



$(function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 10000,
        values: [ 0, 10000 ],

        slide: function( event, ui ) {
            $( "#amount" ).val( "l" + ui.values[0] + " - l" + ui.values[1] );
        },
        change: function(event, ui) {
            Filter.sl1 = ui.values[0];
            Filter.sl2 = ui.values[1];
            Filter.check();
        },
      
    });
    $( "#amount" ).val( "l" + $( "#slider-range" ).slider( "values", 0 ) +
      " - l" + $( "#slider-range" ).slider( "values", 1 ) );
});





//map 
function initMap() {
var uluru = {lat: 41.7245389, lng: 44.7690672 };
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 17,
  center: uluru,
  styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4ae1a"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f4ae1a"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#1d3d73"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
});
var marker = new google.maps.Marker({
  position: uluru,
  map: map
});
}


$('.tour-href').on('click', function(){
    id = $(this).attr('id');
    $('#contact-tour-id').text('Tour ID: ' + id);
    // $('#TourId').val(id);
})



$('#sel-cat').draggable();


$('.search').on('click', function() {
    $('.search-items').toggleClass('search-block');
    $('.search').toggleClass('search-back-white');
});

$(function(){
    var $gallery = $('.gallery-img a').simpleLightbox();
});


$('.slider-link').on('click', function() {
    var Link = $(this).data('href');
    if (Link.length) {
        window.open(Link, '_blank');
    }
});

$('.passengers-select .after').click(function(){
    $('.passengers-menu').toggleClass('show');
});
 $( function() {
    $( "#flyDate1" ).datepicker();
    $( "#flyDate2" ).datepicker();
  } );

 $('#passSum').html( parseInt($('#PersonVal').val()) + parseInt($('#ChildVal').val()) + parseInt($('#ChildVal2').val())  );

 function sumpass(){
     $('#passSum').html( parseInt($('#PersonVal').val()) + parseInt($('#ChildVal').val()) + parseInt($('#ChildVal2').val())  );
 }