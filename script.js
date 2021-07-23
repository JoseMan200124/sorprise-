// Play and loop music

// Get the audio element
var byakkoya = document.querySelector('audio');

// create function to play and loop audio
function song(a){
    //start playing at 0
    a.currentTime = 0;
    a.play();

    //when we hit 64 seconds... 
    setTimeout(function(){
        // skip back to 24.5 seconds and keep playing...
        a.currentTime = 0;

        // then loop back when we hit 64 again, or every 59.5 seconds.
        setInterval(function(){
            a.currentTime = 0;
        },39450);
    },170000);
}

// Wait till the music loads (or get a nasty error!)
byakkoya.addEventListener("canplaythrough", function () {
  setTimeout(function(){ 
    // add a class to the body tag so we know we're playable...
    $("body").addClass("playable");
    $("#play-me").html("Play me.").click(function(){
      song(byakkoya);
      $("body").addClass("playing");
    });
  },3000); //a wee bit of a delay to make sure peeps see the PSA
}, false);
$(document).ready(function() {

  $('section').each(function(){
    $('.slider-navigation').prepend('<div class="tick"></div>');
  });

  $('.tick').on('click',function(){
    var tickIndex = $(this).index();
    $('body').scrollTop( $(window).height() * tickIndex );
  });

  updatePos();

}); // end document ready


var isDragging = false;
var sliderTop,pointerPos,currentSection;

var bodyHeight = $('body').height();
var sliderHeight = $('.slider-navigation').height();
var elementHeight = $('section').height();
var sectionAmount = $('section').length;
var scale = (bodyHeight - (elementHeight)) / (sliderHeight - $('.nav-pointer').outerHeight() );


var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "resize";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();


function updatePos() {
  currentSection = $(window).scrollTop() / elementHeight;
  currentSectionNum = Math.ceil(currentSection + 0.01) ;
  sliderTop = $(window).scrollTop() / scale;
  $('.nav-pointer').css('top', sliderTop).text(currentSectionNum + '/' + sectionAmount);
}

function sliderMove(e) {
  $('body').scrollTop(parseInt(e) * scale);
}

$(window).scroll(function(){
  if (!isDragging) {
    updatePos();
  }
});


$(window).resize(function () {
  waitForFinalEvent(function(){
    bodyHeight = $('body').height();
    sliderHeight = $('.slider-navigation').height();
    elementHeight = $('section').height();
    sectionAmount = $('section').length;
    scale = (bodyHeight - (elementHeight)) / (sliderHeight - $('.nav-pointer').outerHeight() );

    updatePos();
  }, 500, "resizing");
});


$(window).resize(function(){
  
});

$( ".draggable" ).draggable({
  axis: "y",
  containment: "parent",
  start: function() {
    isDragging = true;
    $('body').addClass('dragging');
  },
  drag: function() {
    pointerPos = $(this).css('top');
    sliderMove(pointerPos);
    updatePos();
  },
  stop: function() {
    isDragging = false;
    $('body').removeClass('dragging');
  }
});