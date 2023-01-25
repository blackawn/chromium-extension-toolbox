import {
  useChromeStorageLocalGet,
  useChromeRuntimeOnMessage
} from '~/utils/chrome';
import { ChromeMessage } from '~/types/chrome.type';
import { setElementPropertyValue } from '~/utils/element';

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
  useChromeStorageLocalGet('filterInvert')
    .then((result) => {
      useWebsiteFilter((result.filterInvert || []).includes(window.location.hostname));
    });

  useChromeRuntimeOnMessage((message: ChromeMessage) => {
    if (message.from === 'popup' && message.content.hasOwnProperty('filterInvert')) {
      useWebsiteFilter(message.content.filterInvert);
    }
  });
}

initScriptLoading();
