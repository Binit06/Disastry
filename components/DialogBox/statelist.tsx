import { useState } from "react";

interface StateProps {
    label: string;
    handleClick: () => void;
    disable: boolean;
}

const State: React.FC<StateProps> = ({
    label,
    handleClick,
    disable
}) => {
    const [clicked, setClicked] = useState(false)
    return(
        <div className={`text-lg w-full text-neutral-700 hover:text-black py-4 px-4 rounded-md hover:border-l-8 transition-all cursor-pointer ${clicked ? "border-2 border-indigo-500 border-l-8": "border-l-4 border-indigo-500"} ${disable? "opacity-50 pointer-events-none": ""}`} onClick={() => {handleClick(), setClicked(!clicked)}}>
            {label}
        </div>
    )
}

export default State