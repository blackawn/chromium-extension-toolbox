async function useChromeTabsQuery() {
  return chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    })
}

async function useChromeTabsCreate(url: string) {
  return await chrome.tabs.create({ url })
}

async function useChromeTabsUpdate(id: number, url: string) {
  return await chrome.tabs.update(id, { url })
}


async function useChromeStorageLocalSet(key: string, value: any) {
  return await chrome.storage.local.set({ [key]: value })
}

async function useChromeStorageLocalGet(key?: string) {
  return chrome.storage.local.get(key || null)
}

async function useChromeStorageLocalRemove(key: string) {
  return await chrome.storage.local.remove(key)
}

async function useChromeStorageLocalClear() {
  return await chrome.storage.local.clear()
}

async function useChromeStorageSyncSet(key: string, value: any) {
  return await chrome.storage.sync.set({ [key]: value })
}

function useChromeStorageSyncGet(key?: string) {
  return chrome.storage.sync.get(key)
}

async function useChromeStorageSyncRemove(key: string) {
  return await chrome.storage.sync.remove(key)
}

async function useChromeStorageSyncClear() {
  return await chrome.storage.sync.clear()
}

async function useChromeTabsOnUpdated(
  callback: (tabId: number,
               changeInfo: chrome.tabs.TabChangeInfo,
               tab: chrome.tabs.Tab) => void) {
  return chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabs) => {
    callback(tabId, changeInfo, tabs)
  })
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
  useChromeTabsOnUpdated
}
