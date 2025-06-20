document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('translateBtn');
  btn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString()
    }, (results) => {
      const text = results && results[0] ? results[0].result : '';
      if (text) {
        const url = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(text)}&op=translate`;
        chrome.tabs.create({ url });
      }
    });
  });
});
