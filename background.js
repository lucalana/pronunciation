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
    title: 'Ler',
    contexts: ['selection'],
    id: 'ler'
  })
});

chrome.contextMenus.onClicked.addListener(function (info,tab) {
  if(info.menuItemId == 'ler' && info.selectionText) {

  }
})