import useDialogModel from "@/hooks/useDialogModel"
import Modal from "../Model/Model"
import Input from "../Input/input"
import Button from "../Button/button"
import useMapperModel from "@/hooks/useMapperModel"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

const MapperBox = () => {

    const mapper = useMapperModel()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            x_cord: null,
            y_cord: null,
            mass_of_Fuel: null,
            peek_overpressure: null,

        }
    })

    const supabaseClient = useSupabaseClient()
    const { onClose, isOpen } = useMapperModel()
    const onChange = (open: boolean) => {
        if(!open){
            onClose()
        }
    }


    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        router.refresh()
        console.log("Mapper Created")
        mapper.onClose()
    }
    return(
        <Modal
        isOpen={isOpen}
        onChange={onChange}
        >
            <div>
                <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div>Enter the X Coordinate</div>
                        <Input 
                        placeholder="Enter the coordinate"
                        type="text"
                        className="py-3"
                        {...register("x_cord")}
                        />
                    </div>
                    <div>
                        <div>Enter the Y Coordinate</div>
                        <Input 
                        placeholder="Enter the coordinate"
                        type="text"
                        className="py-3"
                        {...register("y_cord")}
                        />
                    </div>
                    <div>
                        <div>Enter the Mass Of Fuel that went out</div>
                        <Input 
                        placeholder="Mass Of Fuel Lost"
                        type="text"
                        className="py-3"
                        {...register("mass_of_Fuel")}
                        />
                    </div>
                    <div>
                        <div>Enter the Peak OverPressure</div>
                        <Input 
                        placeholder="Peak OverPressure"
                        type="text"
                        className="py-3"
                        {...register("peek_overpressure")}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </Modal>
    )
}

export default MapperBox