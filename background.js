function injectHTML() {
  fetch(chrome.runtime.getURL('/main.html')).then(r => r.text()).then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    });
  }
  
  chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes("chrome://")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: injectHTML
      });
    }
  });