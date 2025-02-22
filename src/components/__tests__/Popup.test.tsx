import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Popup from '../Popup/Popup';

const hidePopupMock = vi.fn();
const handleUnselectAllItemsMock = vi.fn();

vi.mock('../../hooks/usePopup', () => ({
  usePopup: () => ({
    isVisible: true,
    hidePopup: vi.fn(),
  }),
}));

vi.mock('../../hooks/useSelection', () => ({
  default: () => ({
    selectedItems: [1, 2],
    handleUnselectAllItems: vi.fn(),
  }),
}));

vi.mock('../../hooks/usePopup', () => ({
  usePopup: () => ({
    isVisible: true,
    hidePopup: hidePopupMock,
  }),
}));

vi.mock('../../hooks/useSelection', () => ({
  default: () => ({
    selectedItems: [1, 2],
    handleUnselectAllItems: handleUnselectAllItemsMock,
  }),
}));

describe('Popup Component', () => {
  it('renders Popup component when visible', () => {
    render(<Popup />);
    expect(screen.getByText('Number of selected items: 2')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /load/i })).toBeInTheDocument();
  });

  it('does not render Popup component when not visible', () => {
    render(<Popup />);
    expect(
      screen.queryByText('Number of selected items:')
    ).not.toBeInTheDocument();
  });

  it('calls handleUnselectAllItems and hidePopup on Unselect all button click', () => {
    render(<Popup />);
    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(handleUnselectAllItemsMock).toHaveBeenCalledTimes(1);
    expect(hidePopupMock).toHaveBeenCalledTimes(1);
  });
});
