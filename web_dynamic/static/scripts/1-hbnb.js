$(document).ready(function () {
  const amenityName = [];

  $('INPUT:checkbox').click(function () {
    if ($(this).is(':checked')) {
      amenityName.push($(this).attr('data-name'));
    } else {
      const indexName = amenityName.indexOf($(this).attr('data-name'));
      amenityName.splice(indexName, 1);
    }
    $('.amenities H4').text(amenityName.join(', '));
  });
});
