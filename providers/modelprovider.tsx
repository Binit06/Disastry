"use client";

import MapperBox from "@/components/DialogBox/Mapper";
import DialogBox from "@/components/DialogBox/dialog";
import StateList from "@/components/DialogBox/state";
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }

    return(
        <>
        <DialogBox />
        <StateList />
        <MapperBox />
        </>
    )
}

export default ModalProvider