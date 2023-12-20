import useDialogModel from "@/hooks/useDialogModel"
import Image from "next/image"
import PredModal from "../Model/PredModel"

const DialogBox = () => {

    const { onClose, isOpen, predicted_val } = useDialogModel()
    const onChange = (open: boolean) => {
        if(!open){
            onClose()
        }
    }
    return(
        <PredModal
        isOpen={isOpen}
        onChange={onChange}
        >
            {predicted_val}
            <div className="w-80 h-40 relative">
                {/* <Image src={"/images/arc.png"} alt="" fill className="object-fit aspect-square w-1/2"/> */}
                <Image src={"/images/arc.png"} fill alt="" className="relative"/>
                <div className="absolute left-1/2 bottom-[0px]">
                    <div className={`w-36 border-2 border-black origin-top-left rounded-lg`} style={{ transform: `rotate(-${180 - (parseFloat(predicted_val || '0')|| 0) * 18}deg)` }}></div>
                </div>
            </div>
        </PredModal>
    )
}

export default DialogBox