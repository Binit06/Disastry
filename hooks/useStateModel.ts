import { create } from "zustand";

interface StateProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: (name: string) => void,
    state: string | null;
}

const useStateModel = create<StateProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: (name) => set({isOpen: false, state: name}),
    state: "Maharashtra"
}))

export default useStateModel