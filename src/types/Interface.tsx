export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  gender: string;
  type: string;
}

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export interface CardProps {
  character?: Character;
  onClick?: () => void;
  name: string;
  image: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  locationName?: string;
  originName?: string;
}

export interface CardListProps {
  characters: Character[];
  onCharacterClick: (id: string) => void;
}

export interface CharacterDetailsProps {
  characterId: string;
  onClose: () => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorButtonProps {
  onClick: () => void;
}

export interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onEnter: (valid: boolean) => void;
  showError: (message: string) => void;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface LayoutProps {
  className?: string;
}

export interface LoadingProps {
  message?: string;
}

export interface PopupContextProps {
  isVisible: boolean;
  showPopup: () => void;
  hidePopup: () => void;
}
