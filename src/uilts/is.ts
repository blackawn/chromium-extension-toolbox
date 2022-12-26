function isString(str: any): str is string | String {
  return (typeof str === 'string' || str instanceof String) &&
      Object.prototype.toString.call(str) === '[object String]'
}

function isNumber(num: any): num is number | Number {
  return (typeof num === 'number' || num instanceof Number) && !Number.isNaN(Number(num))
}

function isBoolean(boolean: any): boolean is boolean | Boolean {
  return typeof boolean === 'boolean' || boolean instanceof Boolean
}

function isArray(array: any): array is any[] | Array<any> {
  return Array.isArray(array) || array instanceof Array
}

function isObject(object: any): object is object {
  return object !== null && typeof object === 'object' && !Array.isArray(object) && !(object instanceof Array)
}


function isElement(element: any): element is Element | HTMLDocument {
  return (
    typeof HTMLElement === 'object' ? element instanceof HTMLElement : // DOM2
      element &&
          typeof element === 'object' &&
          element !== null && element.nodeType === 1 &&
          typeof element.nodeName === 'string'
  )
}

export {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isElement
}
