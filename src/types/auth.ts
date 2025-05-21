import type { User } from './chat';

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
}

export interface AuthContextType extends AuthState {
    login: (token: string, user?: User) => void;
    logout: () => void;
}
