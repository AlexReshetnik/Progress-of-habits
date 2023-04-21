var data;
var body;
var isEverythingDone;
chrome.alarms.create({periodInMinutes: 1});
chrome.alarms.onAlarm.addListener(() => {
  let now = new Date(Date.now());
  // now.getHours() == 17 && now.getMinutes() == 22
  if ((now.getHours() == 22 && now.getMinutes() == 00)
    || (now.getHours() == 09 && now.getMinutes() == 00)) {
    if (isEverythingDone) {
      registration.showNotification("Вітаю!!! Ви все виконали.", {
        tag: new Date() + "",
        requireInteraction: true,
      });
    } else {
      registration.showNotification("Невиконані завдання !!!", {
        body: body,
        tag: new Date() + "",
        requireInteraction: true,
      });
    }
  }
});

let getVersionPort;
self.addEventListener("message", event => {
  console.log("message");
  if (event.data && event.data.type === "INIT_PORT") {
    getVersionPort = event.ports[0];
  }

  if (event.data && event.data.type === "SEND_DATA") {
    data = JSON.parse(event.data.data);
    body = "";
    for (const item of data) {
      if (item.progres[item.progres.length - 1] !== new Date(Date.now()).setHours(0, 0, 0, 0)) {
        body += item.title + "   |   ";
      }
    }
    isEverythingDone = body == "";

    getVersionPort.postMessage({response: "data is recorded"});
  }
});
