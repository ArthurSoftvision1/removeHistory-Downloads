// default settings object
var settingsObject = { // object contains time and data type
  setTime: "hour",

  checkData: [ // array contains our data types
    "history",
    "downloads"
  ]
};

// remove data 
function removeData(settings) {

 // get selected time
  function checkTime(time) {
    if (time === "forever") { // forever option
      return 0;
    }

    // get times - hour, day
    const configTime = {
      hour: () => { 
        return 1000 * 60 * 60 
      },

      day: () => {
         return 1000 * 60 * 60 * 24 
      }
    }

    const returnCurrentTime = configTime[time].call(); // set the current time for the notification
    return Date.now() - returnCurrentTime;
  }

  // get data types
  function getData(getTypes) {
    let checkData = {};
    for (let type of getTypes) {
      checkData[type] = true; // check the type
    }
    return checkData; // return checkData Object
  }

  let since = checkTime(settings.setTime); // store time in since variable
  const checkData = getData(settings.checkData); // store data in checkData variable

  function displayNotification() {
    let dataTypeName = Object.keys(checkData).join(", "); // returns checkData Array
    let currentTime = new Date(since).toLocaleString(); // store current time in currentTime variable
    browser.notifications.create({ // create notification
      "type": "basic",
      "title": "Removed data!", // set notification title
      "message": `Removed ${dataTypeName}\nsince ${currentTime}` // set notification message
    });
  }

  browser.browsingData.remove({since}, checkData).then(displayNotification); // remove data and display notification
}

// check stored settings
function verifySettings(settings) {
  if (!settings.setTime || !settings.checkData) {
    browser.storage.local.set(settingsObject); // set the object into local storage
  }
}

const getLocalStorage = browser.storage.local.get(); // get the local storage
getLocalStorage.then(verifySettings, onError);

// on click, remove data 
browser.browserAction.onClicked.addListener(() => {
  const getLocalStorage = browser.storage.local.get(); // store local storage in getLocalStorage variable
  getLocalStorage.then(removeData, onError);
});

// handle error
function onError(param) {
  console.error(param);
}
