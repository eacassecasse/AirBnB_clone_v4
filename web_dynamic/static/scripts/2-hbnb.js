$(document).ready(function () {
  const selectedAmenities = [];

  $('INPUT:checkbox').click(function () {
    if ($(this).is(':checked')) {
      selectedAmenities.push($(this).attr('data-name'));
    } else {
      const indexName = selectedAmenities.indexOf($(this).attr('data-name'));
      selectedAmenities.splice(indexName, 1);
    }
    $('.amenities H4').text(selectedAmenities.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', data => {
    if (data.status == 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
