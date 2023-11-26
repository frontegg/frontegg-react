import { FronteggProvider } from './FronteggProvider';
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as QueryKeeper from './queryKeeper';
import 'whatwg-fetch';

describe('FronteggProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should call useQueryKeeper when no external history is provided ', async () => {
    const mockUseQueryKeeper = jest.spyOn(QueryKeeper, 'useQueryKeeper');
    render(<FronteggProvider contextOptions={{ baseUrl: 'mock-base-url' }} />, { wrapper: BrowserRouter as any });
    expect(mockUseQueryKeeper).toHaveBeenCalled();
  });

  test('Should not call useQueryKeeper when external history is provided ', async () => {
    const mockUseQueryKeeper = jest.spyOn(QueryKeeper, 'useQueryKeeper');
    render(<FronteggProvider contextOptions={{ baseUrl: 'mock-base-url' }} history={true as any} />, {
      wrapper: BrowserRouter as any,
    });
    expect(mockUseQueryKeeper).not.toHaveBeenCalled();
  });
});
