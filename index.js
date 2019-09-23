// UI Template
var template = function() {
  // If there are no list items
  if (template.data.listItems.length < 1)
    return '<p><em>You do not have any list items yet. Try adding one with the form above.</em></p>';
  // If there are
  return (
    '<ul>' +
    template.data.listItems
      .map(function(item) {
        return '<li>' + item + '</li>';
      })
      .join('') +
    '</ul>'
  );
};
// Data State
template.data = {
  listItems: [],
};
// Function to render the UI into the DOM
var render = function() {
  var list = document.querySelector('#list');
  if (!list) return;
  list.innerHTML = template();
};
// Reactively update data
var setData = function(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      template.data[key] = obj[key];
    }
  }
  render();
};
// Get an immutable copy of the data
var getData = function() {
  return JSON.parse(JSON.stringify(template.data));
};
// Render the UI
render();
// Listen for form submissions
document.addEventListener(
  'submit',
  function(event) {
    // Make sure the submitted form was for our list items
    if (!event.target.matches('#add-to-list')) return;
    // Stop the form from submitting
    event.preventDefault();
    // Get the list item
    var item = event.target.querySelector('#list-item');
    if (!item || item.length < 1) return;
    // Reactively update the data
    var items = getData();
    items.listItems.push(item.value);
    setData({ listItems: items.listItems });
    // Clear the field and return to focus
    item.value = '';
    item.focus();
  },
  false,
);
