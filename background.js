chrome.runtime.onInstalled.addListener(async function () {
  
  let voices = await chrome.tts.getVoices();
  let lang = voices[0].lang;
  let voice = voices[0].voiceName;
  let speed = 1;
  chrome.storage.local.set({
    lang,
    voice,
    speed
  });

  chrome.contextMenus.create({
    title: 'Read',
    contexts: ['selection'],
    id: 'read'
  })
});

chrome.contextMenus.onClicked.addListener(async function (info,tab) {
  if(info.menuItemId == 'read' && info.selectionText) {
    let storageConfigs = await chrome.storage.local.get(['voice', 'lang', 'speed']);
    chrome.tts.speak(info.selectionText, {
      'lang': storageConfigs.lang,
      'voiceName': storageConfigs.voice,
      'rate': Number(storageConfigs.speed)
    })
  }
})