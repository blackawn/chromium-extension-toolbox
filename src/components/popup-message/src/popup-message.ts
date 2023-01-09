import { createVNode, render } from 'vue';

import PopupMessageComponent from './index.vue';
import utils from '~/utils/utils';

const instanceList: Array<any> = [];

const appendToElement = (param: string | HTMLElement): HTMLElement => {
  let toTargetElement: HTMLElement | null = document.body;
  if (param) {
    if (utils.isString(param)) {
      toTargetElement = document.querySelector<HTMLElement>(param);
    }

    if (utils.isElement(param)) {
      toTargetElement = param;
    }
  }

  return toTargetElement || document.body;
};

const initInstance = (options: any) => {
  const container = document.createElement('div');


  let diffOffset = 0;
  instanceList.forEach((item) => {
    diffOffset += item.proxy.$el.offsetHeight + (options.offset || 16);
  });


  const vNode = createVNode(
    PopupMessageComponent,
    {
      ...options,
      offset: diffOffset,
      onClose: () => { // hidden message
        // options.onClose?.()
        options.onClose && options.onClose();
        const index = instanceList.indexOf(vNode.component);
        if (index !== -1) {
          instanceList.splice(index, 1);

          for (let i = index; i < instanceList.length; i++) {
            const instance = instanceList[i];
            instance.props.offset -= instance.vnode.el.offsetHeight + (options.offset || 16);
          }
        }
      },
      onDestroy: () => {
        // remove message dom
        render(null, container);
      }
    }
  );

  render(vNode, container);
  appendToElement(options.toTargetElement).appendChild(container.firstElementChild!);

  instanceList.push(vNode.component);
};

export default function PopupMessage(options?: any) {
  initInstance(options);
}
