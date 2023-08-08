type AnyObject = Record<string, any>;

export function merge(lhs: AnyObject, rhs: AnyObject): AnyObject {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as AnyObject, rhs[p] as AnyObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(object: AnyObject | unknown, path: string, value: unknown): AnyObject | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<AnyObject>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as AnyObject, result);
}
