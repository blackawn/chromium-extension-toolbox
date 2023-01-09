import type { ChromeMessage } from '~/types/chrome.type';
import utils from '~/utils/utils';

async function useChromeTabsQuery(queryInfo: chrome.tabs.QueryInfo) {
  return chrome.tabs.query(queryInfo);
}

async function useChromeTabsCreate(url: string) {
  return await chrome.tabs.create({ url });
}

async function useChromeTabsUpdate(id: number, url: string) {
  return await chrome.tabs.update(id, { url });
}


async function useChromeStorageLocalSet(items: object | string, value?: any) {
  if (utils.isObject(items)) {
    const setPromises = [];
    for (const itemsKey in items) {
      setPromises.push(chrome.storage.local.set({
        [itemsKey]: (items as any)[itemsKey]
      }));
    }
    await Promise.all(setPromises);
  } else {
    return await chrome.storage.local.set({ [items]: value });
  }
}

async function useChromeStorageLocalGet(key?: string) {
  return chrome.storage.local.get(key || null);
}

async function useChromeStorageLocalRemove(key: string) {
  return await chrome.storage.local.remove(key);
}

async function useChromeStorageLocalClear() {
  return await chrome.storage.local.clear();
}

async function useChromeStorageSyncSet(key: string, value: any) {
  return await chrome.storage.sync.set({ [key]: value });
}

function useChromeStorageSyncGet(key?: string) {
  return chrome.storage.sync.get(key);
}

async function useChromeStorageSyncRemove(key: string) {
  return await chrome.storage.sync.remove(key);
}

async function useChromeStorageSyncClear() {
  return await chrome.storage.sync.clear();
}

function useChromeTabsOnUpdated(
  callback: (tabId: number,
               changeInfo: chrome.tabs.TabChangeInfo,
               tab: chrome.tabs.Tab) => void) {
  return chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabs) => {
    callback(tabId, changeInfo, tabs);
  });
}

async function useChromeTabsSendMessage(
  tabId: number,
  message: ChromeMessage) {
  return await chrome.tabs.sendMessage(
    tabId,
    message
  );
}


async function useChromeRuntimeSendMessage(message: ChromeMessage) {
  return await chrome.runtime.sendMessage(message);
}

function useChromeRuntimeOnMessage(
  callback: (message: ChromeMessage, sender?: chrome.runtime.MessageSender) => void) {
  return chrome.runtime.onMessage.addListener((message, sender) => {
    callback(message, sender);
  });
}

export {
  useChromeTabsQuery,
  useChromeTabsCreate,
  useChromeTabsUpdate,
  useChromeStorageLocalSet,
  useChromeStorageLocalGet,
  useChromeStorageLocalRemove,
  useChromeStorageLocalClear,
  useChromeStorageSyncSet,
  useChromeStorageSyncGet,
  useChromeStorageSyncRemove,
  useChromeStorageSyncClear,
  useChromeTabsOnUpdated,
  useChromeTabsSendMessage,
  useChromeRuntimeSendMessage,
  useChromeRuntimeOnMessage
};
