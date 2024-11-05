import { User } from "firebase/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PropsType {
  children: ReactNode;
  user: User | null;
}

export const ProtectedRoute = ({ children, user }: PropsType) => {
  return user ? children : <Navigate to="/"></Navigate>;
};
