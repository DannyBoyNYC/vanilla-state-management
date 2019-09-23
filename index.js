// Create a new list component
var lists = new Component('#list', {
  data: {
    listItems: []
  },
  template: function(props) {
    // If there are no list items
    if (props.listItems.length < 1)
      return '<p><em>You do not have any list items yet. Try adding one with the form above.</em></p>';
    // If there are
    return (
      '<ul>' +
      props.listItems
        .map(function(item) {
          return '<li>' + item + '</li>';
        })
        .join('') +
      '</ul>'
    );
  }
});

// Render the initial UI
lists.render();

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
    var items = lists.getData();
    items.listItems.push(item.value);
    lists.setData({ listItems: items.listItems });
    // Clear the field and return to focus
    item.value = '';
    item.focus();
  },
  false
);
