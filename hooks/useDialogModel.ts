import { create } from 'zustand';

interface DialogModelStore {
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
    predicted_val: string | null;
}

const useDialogModel = create<DialogModelStore>((set) => ({
    isOpen: false,
    onOpen: (id) => set({isOpen: true, predicted_val: id}),
    onClose: () => set({isOpen: false}),
    predicted_val: null,
}));

export default useDialogModel