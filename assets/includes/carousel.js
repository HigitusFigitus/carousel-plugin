var carouselAttributes = {
  autoPlay: true,
  currentPanel: 1,
  totalPanels: 0,
  timePassed: 0,
  timeToChange: 80, // Will be multiplied to 8 seconds
  duration: 1250, // 1.25 seconds
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