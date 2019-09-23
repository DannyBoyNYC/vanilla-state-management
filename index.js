document.addEventListener(
  'submit',
  function(event) {
    // Make sure the submitted form was for our list items
    if (!event.target.matches('#add-to-list')) return;

    // Stop the form from submitting
    event.preventDefault();

    // Get the list item
    var item = event.target.querySelector('#list-item');
    // console.log(item);
    if (!item || item.length < 1) return;

    // Update the data and UI
    data.listItems.push(item.value);
    render();

    // Clear the field and return to focus
    item.value = '';
    item.focus();
  },
  false
);

var data = {
  listItems: []
};

// Attacks
// var div = document.querySelector('#app');
// div.innerHTML = '<img src=x onerror="alert(\'XSS Attack\')">';

var template = function() {
  // If there are no list items
  if (data.listItems.length < 1)
    return '<p><em>You do not have any list items yet. Try adding one with the form above.</em></p>';

  // If there are
  return (
    '<ul>' +
    data.listItems
      .map(function(item) {
        return '<li>' + item + '</li>';
      })
      .join('') +
    '</ul>'
  );
};

var getData = function() {
  return JSON.parse(JSON.stringify(data));
};

var setData = function(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      data[key] = obj[key];
    }
  }
  render();
};

var render = function() {
  var list = document.querySelector('#list');
  if (!list) return;
  list.innerHTML = template();
};

// setData({listItems: ['Dumbledore', 'Hermione', 'Gandalf', 'Neville']});

render();
