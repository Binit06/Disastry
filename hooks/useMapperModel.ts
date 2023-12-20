import { create } from 'zustand';

interface MapperModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useMapperModel = create<MapperModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useMapperModel