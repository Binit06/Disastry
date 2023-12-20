import useStateModel from "@/hooks/useStateModel"
import Modal from "../Model/Model"
import State from "./statelist"
import { useState } from "react"
import Button from "../Button/button"
import { useRouter } from "next/navigation"

const StateList = () => {

    const {onClose, isOpen} = useStateModel()
    const statemodel = useStateModel()
    const router = useRouter()

    const onChange = (open: boolean) => {
        if(!open){
            if(selecteOption){
                onClose(selecteOption)
            } else{
                onClose("No State Selected")
                setSelectedOption(null)
            }
            router.refresh()
        }
    }

    const [selecteOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionClick = (label: string) => {
        if(selecteOption !== null){
            setSelectedOption(null)
        } else{
            setSelectedOption(label)
        }
    }
    const stateData = [
        {label: "Maharashtra", handleClick: () => handleOptionClick("Maharashtra"), disable: selecteOption !== null && selecteOption !== "Maharashtra"}, 
        {label: "Madhya Pradesh", handleClick: () => handleOptionClick("Madhya Pradesh"), disable: selecteOption !== null && selecteOption !== "Madhya Pradesh"}, 
        {label: "Rajasthan", handleClick: () => handleOptionClick("Rajasthan"), disable: selecteOption !== null && selecteOption !== "Rajasthan"}, 
        {label: "Uttar Pradesh", handleClick: () => handleOptionClick("Uttar Pradesh"), disable: selecteOption !== null && selecteOption !== "Uttar Pradesh"}, 
        {label: "Gujarat", handleClick: () => handleOptionClick("Gujarat"), disable: selecteOption !== null && selecteOption !== "Gujarat"}, 
        {label: "Andhra Pradesh", handleClick: () => handleOptionClick("Andhra Pradesh"), disable: selecteOption !== null && selecteOption !== "Andhra Pradesh"}
    ]
    return(
        <Modal
        isOpen={isOpen}
        onChange={onChange}
        >
            <div className="flex flex-col gap-y-3">
                <div className="text-center text-lg">
                    Choose any State
                </div>
                <div className="flex flex-col gap-y-4">
                    {stateData.map((item) => (
                        <State key={item.label} {...item}/>
                    ))}
                </div>
                <Button className="rounded-lg bg-indigo-500 bg-opacity-60" disabled={selecteOption===null} onClick={() => statemodel.onClose(selecteOption || "No Data")}>Choose State</Button>
                <Button className="rounded-lg bg-indigo-500 bg-opacity-60" onClick={() => {setSelectedOption(null)}} disabled={selecteOption === null}> Reset</Button>
            </div>
        </Modal>
    )
}

export default StateList