import { expect } from 'chai';
import { source, target } from '../../src/index';

describe('index', () => {
  it('should be exported', () => {
    expect(source).to.exist;
    expect(target).to.exist;
  });
});
