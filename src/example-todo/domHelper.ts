export function live<T extends HTMLElement = HTMLElement>(
  eventName: 'click' | 'mousedown',
  selector: string,
  node: HTMLElement,
  callback: (node: T) => void
) {
  const fnc = (evt: MouseEvent) => {
    const foundNode = (evt.target as any)?.closest(selector);
    if (foundNode) {
      callback(foundNode);
    }
  };
  node.addEventListener(eventName, fnc);
  return function () {
    node.removeEventListener(eventName, fnc);
  };
}
