// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab)
{
  if (tab.url.indexOf('http://hs.fi') > -1 || tab.url.indexOf('http://www.hs.fi') > -1)
  {
    chrome.pageAction.show(tabId);
    chrome.tabs.executeScript(tabId,{code:"window.localStorage.setItem('_hs_hist','');window.localStorage.setItem('_hs_paywall_hits','');"});
    
    if(changeInfo.status == "complete") chrome.cookies.remove({url:"http://kauppalehti.fi", name: "_hs_hist"});
  }
  else if (tab.url.indexOf('http://ksml.fi') > -1 || tab.url.indexOf('http://www.ksml.fi') > -1)
  {
    chrome.pageAction.show(tabId);
    chrome.tabs.executeScript(tabId,{code:"window.localStorage.removeItem('paywall_history');"});
  }
  else if((tab.url.indexOf('http://kauppalehti.fi') > -1 || tab.url.indexOf('http://www.kauppalehti.fi') > -1) && changeInfo.status == "loading")
  {
    chrome.pageAction.show(tabId);
    if(localStorage["store"] == "1")
    {
      localStorage["store"] = "0";
      chrome.cookies.remove({url:"http://kauppalehti.fi", name: "KauppalehtiStat"});
    }
    else
    localStorage["store"] = "1";
  }
  else if (tab.url.indexOf('http://savonsanomat.fi') > -1 || tab.url.indexOf('http://www.savonsanomat.fi') > -1)
  {
    chrome.pageAction.show(tabId);
    chrome.tabs.executeScript(tabId,{code:"window.localStorage.removeItem('paywall_history');"});
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
