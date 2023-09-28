import {create} from 'zustand';

interface ProgressBar {
    progress: number;
    setProgress: (progress: number) => void;
}

interface formPage {
    page: number;
    setPage: (page: number) => void;
}

export const useProgressBar = create<ProgressBar>((set) => ({
    progress: 33,
    setProgress: (progress) => set(() => ({progress})),
}))

export const useFormPage = create<formPage>((set) => ({
    page: 0,
    setPage: (page) => set(() => ({page})),
}))