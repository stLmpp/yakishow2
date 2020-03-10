export function Debounce(timeout: number): any {
  let timeoutRef: any = null;
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): any => {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]): any {
      clearTimeout(timeoutRef);
      timeoutRef = setTimeout(() => {
        original.apply(this, args);
      }, timeout);
    };
    return descriptor;
  };
}
