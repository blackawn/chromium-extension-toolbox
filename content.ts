import {
  useChromeStorageLocalGet,
  useChromeRuntimeOnMessage
} from '~/utils/chrome';
import { ChromeMessage } from '~/types/chrome.type';
import { getElementPropertyValue, setElementPropertyValue } from '~/utils/element';
import utils from '~/utils/utils';


function setWebsiteFilter(value: string) {
  setElementPropertyValue(document.documentElement, {
    filter: value
  });
}

function useWebsiteFilter(status: boolean) {
  if (status) {
    setWebsiteFilter('invert(1)');
  } else {
    setWebsiteFilter('');
  }
}

function initScriptLoading() {
  // get global is filter on
  useChromeStorageLocalGet('globalFilterInvert')
    .then((result) => {
      useWebsiteFilter(result.globalFilterInvert);
    });
}


useChromeRuntimeOnMessage((message) => {
  if (message.from === 'popup' && message.content.hasOwnProperty('globalFilterInvert')) {
    useWebsiteFilter(message.content.globalFilterInvert);
  }
});

initScriptLoading();
