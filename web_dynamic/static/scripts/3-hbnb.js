$(document).ready(function () {
  const selectedAmenity = [];

  $('INPUT:checkbox').click(function () {
    if ($(this).is(':checked')) {
      selectedAmenity.push($(this).attr('data-name'));
    } else {
      const indexName = selectedAmenity.indexOf($(this).attr('data-name'));
      selectedAmenity.splice(indexName, 1);
    }
    $('.amenities h4').text(selectedAmenity.join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', data => {
    if (data.status == 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">
                      ${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`;
      }));
    }
  });
});
