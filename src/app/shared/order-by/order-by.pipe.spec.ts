import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order', () => {
    let unorderedArray = [3, 1, 2];
    unorderedArray = pipe.transform(unorderedArray);
    expect(unorderedArray).toEqual([1, 2, 3]);
  });
});
