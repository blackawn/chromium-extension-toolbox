import { useChromeTabsOnMessage, useChromeStorageLocalGet } from '~/utils/chrome';
import { ChromeMessage } from '~/types/chrome.type';
import { getElementPropertyValue, setElementPropertyValue } from '~/utils/element';
import utils from '~/utils/utils';


//const d = utils.extractNumbersFromString(getElementPropertyValue(document.body, 'filter') as string);

function setWebSiteFilter(value: string) {
  setElementPropertyValue(document.documentElement, {
    filter: value
  });
}

function initContentSetting(){
  // get global is filter on
  useChromeStorageLocalGet('allFilterInvert').then((data) => {
    console.log(data);
  });
}



//setWebSiteFilter('invert(1)');


useChromeTabsOnMessage((message: ChromeMessage) => {
  if (message.from === 'popup' && message.content.filterInvert) {
    const d = utils.extractNumbersFromString(getElementPropertyValue(document.body, 'filter') as string);
    console.log(d);
  }
});
