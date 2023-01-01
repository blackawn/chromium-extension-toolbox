type Binding = {
    value: {
        mousedownCallback: () => void
        mouseupCallback: () => void
        mouseleaveCallback: () => void
        time: number
    }
}

export const longPress = ((element: HTMLElement, binding: Binding) => {
  let timer: NodeJS.Timer | null = null;
  element.addEventListener('mousedown', () => {
    timer = setTimeout(() => {
      binding.value.mousedownCallback?.();
    }, (binding.value.time || 1000));
  });
  element.addEventListener('mouseup', (event: MouseEvent) => {
    if (timer) {
      clearTimeout(timer);
      binding.value.mouseupCallback?.();
    }
  });
  element.addEventListener('mouseleave', () => {
    if (timer) {
      clearTimeout(timer);
      binding.value.mouseleaveCallback?.();
    }
  });
});
