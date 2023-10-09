import { create } from "zustand";

interface ProgressBar {
  progress: number;
  setProgress: (progress: number) => void;
}

interface FormPage {
  page: number;
  setPage: (page: number) => void;
}

interface FormData {
  company: string;

  logoStyle: string[];
  logoColor: string[];
  fontStyle: string[];

  setCompany: (company: string) => void;
  setLogoStyle: (style: string) => void;
  setLogoColor: (color: string) => void;
  setFontStyle: (font: string) => void;

  removeLogoStyle: (style: string) => void;
  removelogoColor: (color: string) => void;
  removeFontStyle: (font: string) => void;

  removeAllLogoStyles: () => void;
  removeAllLogoColors: () => void;
  removeAllFontStyles: () => void;
  clearCompany: () => void;
}

export const useProgressBar = create<ProgressBar>((set) => ({
  progress: 33,
  setProgress: (progress) => set(() => ({ progress })),
}));

export const useFormPage = create<FormPage>((set) => ({
  page: 0,
  setPage: (page) => set(() => ({ page })),
}));

export const useFormData = create<FormData>((set) => ({
  company: "",

  logoStyle: [],
  logoColor: [],
  fontStyle: [],

  setCompany: (company) => set(() => ({ company })),

  setLogoStyle: (style) =>
    set((state) => ({ ...state, logoStyle: [...state.logoStyle, style] })),

  setLogoColor: (color) =>
    set((state) => ({ ...state, logoColor: [...state.logoColor, color] })),

  setFontStyle: (font) =>
    set((state) => ({ ...state, fontStyle: [...state.fontStyle, font] })),

  removeLogoStyle: (style) =>
    set((state) => ({
      ...state,
      logoStyle: state.logoStyle.filter((s) => s !== style),
    })),

  removelogoColor: (color) =>
    set((state) => ({
      ...state,
      logoColor: state.logoColor.filter((c) => c !== color),
    })),

  removeFontStyle: (font) =>
    set((state) => ({
      ...state,
      fontStyle: state.fontStyle.filter((f) => f !== font),
    })),

  removeAllLogoStyles: () => set((state) => ({ ...state, logoStyle: [] })),

  removeAllLogoColors: () => set((state) => ({ ...state, logoColor: [] })),

  removeAllFontStyles: () => set((state) => ({ ...state, fontStyle: [] })),

  clearCompany: () => set((state) => ({ ...state, company: "" })),
}));
