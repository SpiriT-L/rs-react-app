import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import useSearchQuery from '../../hooks/useSearchQuery';

const TestComponent = ({ key }: { key: string }) => {
  const [query, setQuery] = useSearchQuery(key);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        data-testid="input"
      />
    </div>
  );
};

describe('useSearchQuery', () => {
  const key = 'test-query';

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with an empty string if no query in localStorage', () => {
    const { getByTestId } = render(<TestComponent key={key} />);

    const input = getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('');
  });
});
