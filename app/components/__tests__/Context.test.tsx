import { fireEvent, render, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { AppProvider, useAppContext } from '../../context/context';
import { Character } from '../../types/Interface';

interface TestComponentProps {
  children?: ReactNode;
}

const TestComponent: React.FC<TestComponentProps> = ({ children }) => {
  const { state, dispatch } = useAppContext();

  return (
    <div>
      <p>Characters count: {state.characters.length}</p>
      <p>Is loading: {state.isLoading.toString()}</p>
      <p>Error: {state.error}</p>
      <p>Total pages: {state.totalPages}</p>
      <button
        onClick={() =>
          dispatch({
            type: 'SET_CHARACTERS',
            payload: {
              characters: [
                { id: 1, name: 'Character 1' } as Character,
                { id: 2, name: 'Character 2' } as Character,
              ],
              totalPages: 2,
            },
          })
        }
      >
        Set Characters
      </button>
      <button onClick={() => dispatch({ type: 'SET_LOADING' })}>
        Set Loading
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'SET_ERROR',
            payload: 'Test error',
          })
        }
      >
        Set Error
      </button>
      {children}
    </div>
  );
};

describe('AppProvider and useAppContext', () => {
  it('should provide initial state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByText('Characters count: 0')).toBeInTheDocument();
    expect(screen.getByText('Is loading: true')).toBeInTheDocument();
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Total pages: 0')).toBeInTheDocument();
  });

  it('should update state with SET_CHARACTERS action', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Set Characters'));
    expect(screen.getByText('Characters count: 2')).toBeInTheDocument();
    expect(screen.getByText('Total pages: 2')).toBeInTheDocument();
    expect(screen.getByText('Is loading: false')).toBeInTheDocument();
    expect(screen.getByText('Error:')).toBeInTheDocument();
  });

  it('should update state with SET_LOADING action', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Set Loading'));
    expect(screen.getByText('Is loading: true')).toBeInTheDocument();
  });

  it('should update state with SET_ERROR action', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText('Set Error'));
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    expect(screen.getByText('Is loading: false')).toBeInTheDocument();
  });
});
