import {
  useChromeStorageLocalGet,
  useChromeRuntimeOnMessage
} from '~/utils/chrome';
import { ChromeMessage } from '~/types/chrome.type';

const insertCSS = 'html, html img, html video, html canvas, html svg { filter: invert(1); }';
const styleTag = document.createElement('style');
styleTag.textContent = insertCSS;

function useWebsiteFilter(status: boolean) {

  if (status) {
    document.head.appendChild(styleTag);
  } else {
    styleTag.parentNode?.removeChild(styleTag);
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
