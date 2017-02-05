var carouselAttributes = {
  autoPlay: true,
  currentPanel: 1,
  totalPanels: 0,
  timePassed: 0,
  timeToChange: 50,
  duration: 1250,
  inTransition: false,
  panelContent: Array
};


$(document).ready(function(){
  gatherCarouselData();
});


function gatherCarouselData(){
  $('.carousel-data .carousel-panel').each(function(index){
    carouselAttributes.totalPanels = index + 1;
    var panel_image = $(this).attr('data-image') + '.jpg';
    carouselAttributes.panelContent[index] =
    '<div class="carousel-panel" style="background-image:url('+ panel_image +');"></div>';
  });
  setInterval(automateScroll, 100);
  carouselAdvance();
}


function automateScroll() {
  if(carouselAttributes.timePassed == carouselAttributes.timeToChange){
    carouselAttributes.timePassed = 0;

    if(carouselAttributes.autoPlay == true){
      if(carouselAttributes.currentPanel == carouselAttributes.totalPanels){
        $('.carousel-nav div:nth-child(1)').trigger('click');
      } else {
        $('.carousel-nav div:nth-child('+(carouselAttributes.currentPanel + 1)+')').trigger('click');
      }
    }

  } else {
    carouselAttributes.timePassed += 1;
  }
}


function carouselAdvance(){

  carouselAttributes.timePassed = 0;
  carouselAttributes.autoPlay = true;

  var newHTML =
      '<div class="carousel-stage">'
    + '<div class="carousel-container_1"></div>'
    + '<div class="carousel-nav"></div>'
    + '<div class="btn prev"></div>'
    + '<div class="btn next"></div>'
    + '</div>';

  $('.carousel').append(newHTML);

  for(i = 0; i < carouselAttributes.totalPanels; i++){
    $('.carousel-nav').append('<div></div>');
  }

  $('.carousel').hover(function(){
    carouselAttributes.autoPlay = false;
  }, function(){
    carouselAttributes.autoPlay = true;
    carouselAttributes.timePassed = Math.floor(carouselAttributes.timeToChange / 2);
  });

  $('.carousel .btn').on('click', function(){
    if(!carouselAttributes.inTransition){

      if($(this).hasClass('prev')){
        carouselAttributes.currentPanel -= 1;
        if(carouselAttributes.currentPanel < 1){
          carouselAttributes.currentPanel = carouselAttributes.totalPanels;
        }
      } else {
        carouselAttributes.currentPanel += 1;
        if(carouselAttributes.currentPanel > carouselAttributes.totalPanels){
          carouselAttributes.currentPanel = 1;
        }
      }

      $('.carousel-nav div:nth-child(' + carouselAttributes.currentPanel + ')').trigger('click');
    }
  });

  $('.carousel-nav div').on('click', function(){
    if(!carouselAttributes.inTransition){
      carouselAttributes.inTransition = true;
      var navClicked = $(this).index();
      carouselAttributes.currentPanel = navClicked + 1;
      $('.carousel-nav div').removeClass('selected');
      $(this).addClass('selected');
      $('.carousel-stage').append('<div class="carousel-container_2" style="opacity:0;"></div>');
      $('.carousel-container_2').html(carouselAttributes.panelContent[navClicked]).animate({opacity:1},  carouselAttributes.duration, function(){
          $('.carousel-container_1').remove();
          $(this).addClass('carousel-container_1').removeClass('carousel-container_2');
          carouselAttributes.inTransition = false;
      });
    }
  });

  $('.carousel-nav div:first').trigger('click');
};
