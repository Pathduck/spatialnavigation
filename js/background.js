chrome.runtime.onInstalled.addListener(function () {
  let settings = {
    hotkeys: {
      codes: {
        navUp: ["w"],
        navLeft: ["a"],
        navDown: ["s"],
        navRight: ["d"],
        mapKeys: ["e"],
        quit: ["q"],
        click: ["enter"],
        shiftClick: ["shift", "enter"],
        disableKeys: ["control", "shift", "x"],
      },
    },
  };

  chrome.storage.local.set({ "extension-settings": settings }, function () {
    console.log("Initial setting set...");
  });
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.from === "content" && msg.subject === "changeIcon") {
    // let canvas = document.getElementById("icon-making-canvas");
    // if (!canvas) {
    //   canvas = document.createElement("CANVAS");
    //   canvas.id = "icon-making-canvas";
    //   canvas.width = canvas.height = 16;
    // }
    // let ctx = canvas.getContext("2d");
    // ctx.beginPath();
    // ctx.rect(0, 0, 16, 16);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.fillStyle = "white";
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // fitTextOnCanvas(ctx, msg.speed, "Roboto Condensed", 9, canvas.width);
    // let imgData = ctx.getImageData(0, 0, 16, 16);
    // chrome.pageAction.setIcon({ imageData: imgData, tabId: sender.tab.id });
  }
  return Promise.resolve("Dummy response to keep the console quiet");
});
