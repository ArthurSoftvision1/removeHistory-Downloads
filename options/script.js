// store the data types
function saveSelectedOptions() {

  // get the time
  function selectTime() {
    const timeInterval = document.querySelector("#time");

    return timeInterval.value; // return the value from #time (hour, day or forever)
  }

  // get the types (downloads/history)
  function getData() {
    let checkData = []; // creates an empty array
    const getCheckbox = document.querySelectorAll("#data [type=checkbox]"); // select the checkboxes

    for (let item of getCheckbox) {
      if (item.checked) {
        checkData.push(item.getAttribute("data-type"));
      }
    }

    return checkData; // returns the array
  }

  let timeValue = selectTime();

  const checkData = getData();

  browser.storage.local.set({ // set in local storage 
    timeValue,
    checkData
  });
}

// update the view with new selected options
function updateView(savedSettings) {
  const selectTimeInterval = document.querySelector("#time");
  selectTimeInterval.value = savedSettings.timeValue;

  const getCheckbox = document.querySelectorAll("#data [type=checkbox]");
  
  for (let type of getCheckbox) {
    if (savedSettings.checkData.indexOf(type.getAttribute("data-type")) != -1) { // checks if is not -1
      type.checked = true; // checks if is checked
    } else {
      type.checked = false; // checks if is not checked
    }
  }
}

// on click save the selected options
const saveOptions = document.querySelector("#save");
saveOptions.addEventListener("click", saveSelectedOptions); // on click call the function

// handle error
function onError(param) {
  console.error(param);
}

// update interface
const getFromStorage = browser.storage.local.get();
getFromStorage.then(updateView, onError);

