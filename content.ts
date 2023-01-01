import { useChromeTabsOnMessage } from '~/utils/chrome';
import { ChromeMessage } from '~/types/chrome.type';
import { getElementPropertyValue, setElementPropertyValue } from '~/utils/element';
import { extractNumbersFromString } from '~/utils/extract';


console.log('content.js loading success!');

useChromeTabsOnMessage((message: ChromeMessage) => {
  if (message.from === 'popup' && message.content.filterInvert) {
    const d = extractNumbersFromString(getElementPropertyValue(document.body, 'filter') as string);
    console.log(d);
  }
});
