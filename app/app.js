var app = new Component('#app', {
  data: {
    drivers: [],
    selected: null,
  },
  template: function(props) {
    localStorage.setItem('drivers', JSON.stringify(props.drivers));
    // If there's no driver yet
    if (props.drivers.length < 1) {
      return '<p><em>Add a driver or two below to get started.</em></p>';
    }
    // If there's a selected driver
    var selected = '';
    if (props.selected) {
      selected = `<p><strong>${sanitizeHTML(
        props.selected,
      )} is driving.</strong></p>`;
    }
    // Create the list of drivers
    return (
      '<ul>' +
      props.drivers
        .map(function(driver, index) {
          var name = sanitizeHTML(driver);
          return `<li>${name}<button aria-label="Remove${name}" data-driver="${index}">remove</button></li>`;
        })
        .join('') +
      '</ul>' +
      selected
    );
  },
});

var sanitizeHTML = function(str) {
  var temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

var submitHandler = function(event) {
  // Check if the form is the #add-driver form
  if (event.target.id !== 'add-driver') return;
  // Prevent form from submitting to the server
  event.preventDefault();
  // Make sure a name was provided
  var input = event.target.querySelector('#driver-name');
  if (!input || input.value.length < 1) return;
  // Update the data state
  var data = app.getData();
  data.drivers.push(input.value);
  app.setData({ drivers: data.drivers });
  // Clear input and return to focus
  input.value = '';
  input.focus();
};

var pickDriver = function() {
  // Get the data
  var data = app.getData();
  // If there are no drivers, alert a message and quit
  if (data.drivers.length < 2) {
    alert('Oops! You need to add at least two drivers first.');
    return;
  }
  // Shuffle the drivers and select a driver
  shuffle(data.drivers);
  var selected = data.drivers[0];
  if (data.selected && selected === data.selected) {
    selected = data.drivers[1];
  }
  // Update the state and UI
  app.setData({ selected: selected });
};

var shuffle = function(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var removeDriver = function(driver) {
  // Get immutable copy of the data
  var data = app.getData();
  // Remove the driver
  data.drivers.splice(driver, 1);
  // Update the state and UI
  app.setData({ drivers: data.drivers });
};

var clearDrivers = function() {
  if (!confirm('Are you sure you want to remove all drivers?')) return;
  // Update the data and UI
  app.setData({
    drivers: [],
    selected: null,
  });
};

var clickHandler = function(event) {
  // If pick a driver button
  if (event.target.id === 'pick-driver') {
    pickDriver();
    return;
  }
  // If remove driver button
  var driver = event.target.getAttribute('data-driver');
  if (driver) {
    removeDriver(driver);
    return;
  }
  // If clear all button
  if (event.target.id === 'clear-drivers') {
    clearDrivers();
  }
};

// If drivers saved to localStorage, get them otherwise, render with default
var saved = localStorage.getItem('drivers');
if (saved) {
  app.setData({ drivers: JSON.parse(saved) });
} else {
  app.render();
}

/// Event Listeners
document.addEventListener('submit', submitHandler, false);
document.addEventListener('click', clickHandler, false);
