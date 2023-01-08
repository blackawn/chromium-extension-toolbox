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
  useChromeStorageLocalGet('scopeFilterInvert')
    .then((result) => {
      useWebsiteFilter((result.scopeFilterInvert || []).includes(window.location.href));
    });

  useChromeRuntimeOnMessage((message: ChromeMessage) => {
    if (message.from === 'popup' && message.content.hasOwnProperty('scopeFilterInvert')) {
      useWebsiteFilter(message.content.scopeFilterInvert);
    }
  });
}

initScriptLoading();
