import React, { createContext, useContext } from 'react';
import useFirebaseAuth from '@/hooks/use_firebase_auth';
import { InAuthuser } from '../models/in_auth_user';

interface InAuthUserContext {
  authUser: InAuthuser | null;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthUserContext = createContext<InAuthUserContext>({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => ({ user: null, credential: null }),
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
});

export const AuthUserProvider = function ({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
};

export const useAuth = () => useContext(AuthUserContext);
