export function getElementPropertyValue(element: HTMLElement, styleName: string | Array<string>): string | Array<object> | void {
  if (!element || !styleName) return;

  // is Array
  if (Array.isArray(styleName)) {
    return styleName.map((style) => {
      style = style.replace(/([A-Z])/g, '-$1').toLowerCase();
      return {
        [style]: window.getComputedStyle(element, null).getPropertyValue(style)
      };
    });
  } else {
    styleName = styleName.replace(/([A-Z])/g, '-$1').toLowerCase();
    return window.getComputedStyle(element, null).getPropertyValue(styleName);
  }
}

export function setElementPropertyValue(element: HTMLElement, styleValue: Record<string, string>): void {
  if (!element || !styleValue) return;
  for (const key in styleValue) {
    element.style.setProperty(key, ((styleValue)[key]));
  }
}
