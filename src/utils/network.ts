/**
 * @param url
 * @param controller
 * @Use
 *    let controller: null | AbortController = null;
 *    controller?.abort();
 *    controller = new AbortController();
 *    useFetchComputerDelay(url, controller)
 *    .then((delay) => {
 *    })
 *    .catch((error) => {
 *    });
 */
export async function fetchComputerDelay(url: string, controller: AbortController) {
  const startTime = performance.now();
  const sendFetch = await fetch(url, { signal: controller.signal });
  if (sendFetch.ok) {
    const endTime = performance.now();
    return (endTime - startTime) >> 0;
  }
}

/**
 * @param url
 * @param xhr
 * @Use
 *    let xhr: null | XMLHttpRequest = null;
 *    xhr?.abort();
 *    xhr = new XMLHttpRequest();
 *    useFetchComputerDelay(url, xhr)
 *    .then((delay) => {
 *    })
 *    .catch((error) => {
 *    });
 */
export async function XMLHttpRequestComputerDelay(url: string, xhr: XMLHttpRequest) {
  return await new Promise((resolve, reject) => {
    const startTime = performance.now();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const endTime = performance.now();
        resolve((endTime - startTime) >> 0);
      }
    };
    xhr.onerror = () => {
      reject('Error');
    };
    xhr.ontimeout = () => {
      reject('Timeout');
    };
    xhr.send();
  });
}

