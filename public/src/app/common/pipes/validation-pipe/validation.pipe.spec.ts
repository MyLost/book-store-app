import { ValidationPipe } from './validation.pipe';

describe('VadationPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidationPipe();
    expect(pipe).toBeTruthy();
  });
});
