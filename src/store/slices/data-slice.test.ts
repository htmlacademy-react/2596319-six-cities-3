import { describe, it, expect } from 'vitest';
import { dataSlice, setServerError } from './data-slice';

describe('Slice: Data', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { isServerError: false };

    const result = dataSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = dataSlice.reducer(undefined, emptyAction);

    expect(result).toBeDefined();
    expect(result.isServerError).toBe(false);
  });

  it('should set isServerError to "true" with setServerError action', () => {
    const initialState = { isServerError: false };
    const expectedState = { isServerError: true };

    const result = dataSlice.reducer(initialState, setServerError(true));

    expect(result).toEqual(expectedState);
  });

  it('should set isServerError to "false" with setServerError action', () => {
    const initialState = { isServerError: true };
    const expectedState = { isServerError: false };

    const result = dataSlice.reducer(initialState, setServerError(false));

    expect(result).toEqual(expectedState);
  });
});
