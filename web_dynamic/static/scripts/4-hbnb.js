$(document).ready(function () {
  const amenityName = {};
  $('INPUT:checkbox').click(function () {
    if ($(this).is(':checked')) {
      amenityName[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityName[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityName).join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', data => {
    if (data.status == 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  const search = (filters = {}) => {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      data: JSON.stringify(filters),
      contentType: 'application/json',
      success: function (data) {
        $('SECTION.places').empty();
        $('SECTION.places').append(data.map(place => {
          return `<ARTICLE>
                    <DIV class="title_box">
                      <H2>${place.name}</H2>
                      <DIV class="price_by_night">${place.price_by_night}</DIV>
                    </DIV>
                    <DIV class="information">
                      <DIV class="max_guest">${place.max_guest} Guests</DIV>
                      <DIV class="number_rooms">${place.number_rooms} Bedrooms</DIV>
                      <DIV class="number_bathrooms">${place.number_bathrooms} Bathrooms</DIV>
                    </DIV>
                    <DIV class="description">
                      ${place.description}
                    </DIV>
                  </ARTICLE>`;
        }));
      }
    });
  };

  $('#search').click(function () {
    const filters = { amenities: Object.keys(amenityName) };
    search(filters);
  });

  search();
});
