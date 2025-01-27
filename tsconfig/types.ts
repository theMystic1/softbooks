import { ReactNode } from "react";

export type LayoutChildren = {
  children: ReactNode;
};

export type ClientLayoutProps = {
  children: ReactNode;
};

export type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

export type BtnProps = {
  text: string;
  onClick?: (e?: any) => void;
  type?: "button" | "submit" | "reset";
  category?: "primary" | "secondary";
};

export type FileChange = {
  onFileChange: (path: string) => void;
};

export type AuthCredentials = {
  email: string;
  password: string;
  name: string;
  idNumber: number;
  profileImage?: string;
};
