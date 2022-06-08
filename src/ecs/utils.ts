import { ComponentOptions } from './model';

export function matchTags(tags: string[], sourceTags: string[]) {
  return tags.every(tag => sourceTags.includes(tag));
}

export function parseTags(tags: string[]) {
  return tags.reduce((obj: Record<string, string>, tag) => {
    const [key, val] = tag.split(':');
    obj[key] = val || key;
    return obj;
  }, {});
}

export function buildComponentId(opt: ComponentOptions) {
  return `${opt.componentName}::${opt.entityId}`;
}

export function parseComponentId(id: string) {
  const [componentName, entityId] = id.split('::');
  return {
    componentName,
    entityId,
  };
}
