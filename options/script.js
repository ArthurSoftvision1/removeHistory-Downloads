// store the data types
function saveSelectedOptions() {

  // get the time
  function selectTime() {
    const timeInterval = document.querySelector("#time"); // select the element with ID = time

    return timeInterval.value; // return the value from #time (hour, day or forever)
  }

  // get the types (downloads/history)
  function getData() {
    let checkData = []; // creates an empty array
    const getCheckbox = document.querySelectorAll("input[type=checkbox]"); // select the checkboxes

    for (let item of getCheckbox) { // make a loop through getCheckbox
      if (item.checked) { // check if is checked
        checkData.push(item.getAttribute("data-type")); // push into checkData Array
      }
    }

    return checkData; // returns the array
  }

  const setTime = selectTime(); // put the function into setTime variable

  const checkData = getData(); // put the function into checkData variable

  browser.storage.local.set({ // set in local storage 
    setTime, // set timeValue
    checkData // set checkData
  });
}

// update the view with new selected options
function updateView(savedSettings) {
  const selectTimeInterval = document.querySelector("#time"); // select the element with ID = time
  selectTimeInterval.value = savedSettings.setTime; // get the value

  const getCheckbox = document.querySelectorAll("input[type=checkbox]"); // select the checkbox type from the element with ID = data

  for (let type of getCheckbox) { // make a loop through getCheckbox
    if (savedSettings.checkData.indexOf(type.getAttribute("data-type")) != -1) { // checks if is not -1
      type.checked = true; // checks if is checked
    } else {
      type.checked = false; // checks if is not checked
    }
  }
}

// handle error
function onError(param) {
  console.error(param);
}

// update interface
const getFromStorage = browser.storage.local.get(); // get local storage
getFromStorage.then(updateView, onError);

// on click save the selected options
const saveOptions = document.querySelector("#save"); // select the element with ID = save
saveOptions.addEventListener("click", saveSelectedOptions); // on click call the function



