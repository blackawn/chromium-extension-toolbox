import { createVNode, render } from 'vue';
import PopupMessageComponent from './index.vue';
import type { Options } from './popup-message.type';
import utils from '~/utils/utils';

const instanceMap = new Map<string, any>();
let keyCounter = 0;

const appendToElement = (element?: string | HTMLElement): HTMLElement => {
  let toTargetElement: HTMLElement | null = document.body;
  if (element) {
    if (utils.isString(element)) {
      toTargetElement = document.querySelector<HTMLElement>(element);
    }

    if (utils.isElement(element)) {
      toTargetElement = element;
    }
  }

  return toTargetElement || document.body;
};

class PopupMessage {
  key: string;
  options: Options;
  container: HTMLElement;
  vNode: any;

  constructor(key: string, options: Options) {
    this.key = key;
    this.options = options;
    this.container = document.createElement('div');
  }

  create() {


    const vNode = createVNode(
      PopupMessageComponent,
      {
        ...this.options,
        offset: this.computerOffset(),
        onInvisible: () => {
          this.options.onInvisible?.();
          this.invisible();
        },
        onDestroy: () => {
          render(null, this.container);
        }
      }
    );

    render(vNode, this.container);
    appendToElement(this.options.toTargetElement).appendChild(this.container.firstElementChild!);
    this.vNode = vNode.component;
    instanceMap.set(this.key, this.vNode);
  }

  computerOffset() {
    let offset = 0;
    instanceMap.forEach((item) => {
      offset += item.proxy.$el.offsetHeight + (this.options.offset || 16);
    });

    return offset;
  }

  invisible() {
    if (instanceMap.has(this.key)) {
      instanceMap.delete(this.key);
      instanceMap.forEach((item) => {
        item.props.offset -= item.proxy.$el.offsetHeight + (this.options.offset || 16);
      });
    }
  }
}

export default function usePopupMessage(options: Options) {
  const key = `KEY_${keyCounter}`;
  keyCounter += 1;
  const instance = new PopupMessage(key, options);
  instance.create();
  return instance;
}
