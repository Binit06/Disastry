"use client"
import { useEffect, useState } from "react";
import Button from "../Button/button"
import Input from "../Input/input"
import axios from "axios";
import useDialogModel from "@/hooks/useDialogModel";
import useStateModel from "@/hooks/useStateModel";
import Image from "next/image";
import PredictionList from "./predictionPin";
import { Data } from "@/types";
import useMapperModel from "@/hooks/useMapperModel";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { stat } from "fs";

interface PredictionPlaygroundProps {
    data: Data;
}

const PredictionPlayground:React.FC<PredictionPlaygroundProps> = ({data}) => {
    const [formData, setFormData] = useState({
        formationYear: '',
        industryType: '',
        weather: '',
        materialQuality: '',
        peakOverPressure: '',
        massFlow: ''
    });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const [profileData, setProfileData] = useState<number | null>(null)

    const instance = axios.create({
        baseURL: 'http://localhost:5000',
    })

    const [isLoadingRank, setIsLoadingRank] = useState(false)
    const prediction = async (event: any) => {
        setIsLoadingRank(true)
        event.preventDefault()
        console.log("Form Data : ", formData)
        instance.get('/predict', {
            params:{
                formation: formData["formationYear"],
                type: formData["industryType"],
                weather: formData["weather"],
                material: formData["materialQuality"]
            }
        })
        .then((response) => {
            let res = '0'
            if(response.data > 10){
                res = '10'
            } else if (response.data < 0){
                res = '0'
            } else {
                res = response.data
            }
            setProfileData(parseFloat(res))
            setIsLoadingRank(false)
        }).catch((error) => {
            console.log(error)
            console.log(error.response.status)
            console.log(error.response.headers)
            setIsLoadingRank(false)
        })
    }

    const { isOpen } = useDialogModel()
    const StateModel = useStateModel()
    const {state} = useStateModel()
    const [safety, setSafety] = useState<string | null>(null)
    const [formationYear, setFormationYear] = useState<string | null>(null)

    const handleMapClick = (safety: string, data: string, year: string) => {
        setSafety(safety)
        setProfileData(parseFloat(data))
        setFormationYear(year)
    }

    const IndustryArray = [
        {label: "Industry 1", prediction: "Safe", state: "Maharashtra", xcord: "28", ycord: "40", formation: "2022", handleClick:() => handleMapClick("SAFE", "2.56", "2022")},
        {label: "Industry 2", prediction: "Safe", state: "Maharashtra", xcord: "55", ycord: "70", formation: "2015", handleClick:() => handleMapClick("SAFE", "1.59", "2015")},
        {label: "Industry 3", prediction: "Moderate", state: "Maharashtra", xcord: "120", ycord: "80", formation: "2003", handleClick:() => handleMapClick("MODERATE", "4.5", "2003")},
        {label: "Industry 4", prediction: "Moderate", state: "Maharashtra", xcord: "60", ycord: "85", formation: "1985", handleClick:() => handleMapClick("MODERATE", "5.8", "1985")},
        {label: "Industry 5", prediction: "Critical", state: "Maharashtra", xcord: "30", ycord: "10", formation: "1700", handleClick:() => handleMapClick("CRITICAL", "9.7", "1700")},
        {label: "Industry 1", prediction: "Safe", state: "Madhya Pradesh", xcord: "28", ycord: "40", formation: "2022", handleClick:() => handleMapClick("SAFE", "2.56", "2022")},
        {label: "Industry 2", prediction: "Safe", state: "Madhya Pradesh", xcord: "92", ycord: "70", formation: "2015", handleClick:() => handleMapClick("SAFE", "1.59", "2015")},
        {label: "Industry 3", prediction: "Moderate", state: "Madhya Pradesh", xcord: "120", ycord: "80", formation: "2003", handleClick:() => handleMapClick("MODERATE", "4.5", "2003")},
        {label: "Industry 4", prediction: "Moderate", state: "Madhya Pradesh", xcord: "65", ycord: "75", formation: "1985", handleClick:() => handleMapClick("MODERATE", "5.8", "1985")},
        {label: "Industry 5", prediction: "Critical", state: "Madhya Pradesh", xcord: "75", ycord: "10", formation: "1700", handleClick:() => handleMapClick("CRITICAL", "9.7", "1700")},
        {label: "Industry 6", prediction: "Moderate", state: "Madhya Pradesh", xcord: "80", ycord: "40", formation: "1884", handleClick:() => handleMapClick("MODERATE", "7.8", "1884")},
        {label: "Industry 1", prediction: "Safe", state: "Rajasthan", xcord: "28", ycord: "40", formation: "2022", handleClick:() => handleMapClick("SAFE", "2.56", "2022")},
        {label: "Industry 2", prediction: "Safe", state: "Rajasthan", xcord: "92", ycord: "70", formation: "2015", handleClick:() => handleMapClick("SAFE", "1.59", "2015")},
        {label: "Industry 3", prediction: "Safe", state: "Rajasthan", xcord: "120", ycord: "30", formation: "2003", handleClick:() => handleMapClick("SAFE", "2.5", "2003")},
        {label: "Industry 4", prediction: "Moderate", state: "Rajasthan", xcord: "65", ycord: "75", formation: "1985", handleClick:() => handleMapClick("MODERATE", "5.8", "1985")},
        {label: "Industry 5", prediction: "Critical", state: "Rajasthan", xcord: "75", ycord: "10", formation: "1700", handleClick:() => handleMapClick("CRITICAL", "9.7", "1700")},
        {label: "Industry 6", prediction: "Critical", state: "Rajasthan", xcord: "80", ycord: "40", formation: "1884", handleClick:() => handleMapClick("CRITICAL", "9.8", "1884")},
        {label: "Industry 1", prediction: "Safe", state: "Uttar Pradesh", xcord: "75", ycord: "37", formation: "2022", handleClick:() => handleMapClick("SAFE", "2.56", "2022")},
        {label: "Industry 2", prediction: "Safe", state: "Uttar Pradesh", xcord: "50", ycord: "60", formation: "2015", handleClick:() => handleMapClick("SAFE", "1.59", "2015")},
        {label: "Industry 3", prediction: "Moderate", state: "Uttar Pradesh", xcord: "100", ycord: "50", formation: "2003", handleClick:() => handleMapClick("MODERATE", "4.5", "2003")},
        {label: "Industry 4", prediction: "Moderate", state: "Uttar Pradesh", xcord: "60", ycord: "85", formation: "1985", handleClick:() => handleMapClick("MODERATE", "5.8", "1985")},
        {label: "Industry 5", prediction: "Critical", state: "Uttar Pradesh", xcord: "75", ycord: "10", formation: "1700", handleClick:() => handleMapClick("CRITICAL", "9.7", "1700")},
        {label: "Industry 1", prediction: "Safe", state: "Gujarat", xcord: "28", ycord: "20", formation: "2022", handleClick:() => handleMapClick("SAFE", "2.56", "2022")},
        {label: "Industry 2", prediction: "Safe", state: "Gujarat", xcord: "120", ycord: "0", formation: "2015", handleClick:() => handleMapClick("SAFE", "1.59", "2015")},
        {label: "Industry 3", prediction: "Safe", state: "Gujarat", xcord: "120", ycord: "30", formation: "2003", handleClick:() => handleMapClick("SAFE", "2.5", "2003")},
        {label: "Industry 4", prediction: "Moderate", state: "Gujarat", xcord: "105", ycord: "45", formation: "1985", handleClick:() => handleMapClick("MODERATE", "5.8", "1985")},
        {label: "Industry 5", prediction: "Critical", state: "Gujarat", xcord: "75", ycord: "10", formation: "1700", handleClick:() => handleMapClick("CRITICAL", "9.7", "1700")},
        {label: "Industry 6", prediction: "Critical", state: "Gujarat", xcord: "80", ycord: "40", formation: "1884", handleClick:() => handleMapClick("CRITICAL", "9.8", "1884")},
        {label: "Industry 1", prediction: "Safe", state: "Andhra Pradesh", xcord: "125", ycord: "55", formation: "2022", handleClick:() => handleMapClick("SAFE", "2.56", "2022")},
        {label: "Industry 2", prediction: "Safe", state: "Andhra Pradesh", xcord: "30", ycord: "0", formation: "2015", handleClick:() => handleMapClick("SAFE", "1.59", "2015")},
        {label: "Industry 3", prediction: "Safe", state: "Andhra Pradesh", xcord: "100", ycord: "70", formation: "2003", handleClick:() => handleMapClick("SAFE", "2.5", "2003")},
        {label: "Industry 4", prediction: "Moderate", state: "Andhra Pradesh", xcord: "105", ycord: "45", formation: "1985", handleClick:() => handleMapClick("MODERATE", "5.8", "1985")},
        {label: "Industry 5", prediction: "Critical", state: "Andhra Pradesh", xcord: "50", ycord: "15", formation: "1700", handleClick:() => handleMapClick("CRITICAL", "9.7", "1700")},
        {label: "Industry 6", prediction: "Critical", state: "Andhra Pradesh", xcord: "80", ycord: "45", formation: "1884", handleClick:() => handleMapClick("CRITICAL", "9.8", "1884")},
    ]

    const [radiusFactor, setRadiusFactor] = useState<string | null>(null)
    const RadiusFactor = () => {
        const a = (634 * (Math.pow(data.Mass_Released, 1/5)))/1000
        const error = data.Peak_OverPressure_Bar * a 
        setRadiusFactor(a.toFixed(2).toString() + " ± " + error.toFixed(2).toString() + "Km")
    }

    useEffect(() => {
        RadiusFactor();
    }, [data.Mass_Released]);

    const [mousePosition, setMousePosition] = useState({ x: "0", y: "0" });
    const mapper = useMapperModel()
    const handleNewMapClick = (event: any) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
        mapper.onOpen()
    };

    const dynamicWidth = `${1.14 * 300}px`;
    const dynamicWidthNew = `${1.5 * 300}px`;

    const dynamicStyles:React.CSSProperties = {
    position: "absolute",
    border: "2px solid #ff0000",
    width: dynamicWidth,
    aspectRatio: "1 / 1",
    top: "40%",
    right: "12%",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 0, 0, 0.25)",
    transformOrigin: "center"
    };

    const dynamicStylesNew:React.CSSProperties = {
        position: "absolute",
        border: "2px solid #ff0000",
        width: dynamicWidthNew,
        aspectRatio: "1 / 1",
        top: "-7%",
        right: "62%",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 0, 0, 0.25)",
        transformOrigin: "center"
        };

    const [isLoading, setIsLoading] = useState(false)
    const supabase = useSupabaseClient()
    const router = useRouter()
    const handleRadiusSubmit = async () => {
        setIsLoading(true)
        console.log(formData)
        const { error } = await supabase
            .from('Data')
            .update({"Mass_Released": parseFloat(formData["massFlow"])})
            .eq('UUID', "a75a4060-0cfc-41a9-ac4c-d1122359f622")
        
        if(error){
            console.log(error)
        }
        
        const { error: OverError } = await supabase
            .from('Data')
            .update({"Peak_OverPressure_Bar": formData["peakOverPressure"]})
            .eq('UUID', "a75a4060-0cfc-41a9-ac4c-d1122359f622")
        
        if(OverError){
            console.log(OverError)
        }

        router.refresh()
        setIsLoading(false)
    }

    const [MapLocation, setMapLocation] = useState("/images/Maharashtra.jpeg")

    useEffect(() => {
        if(state === "Madhya Pradesh"){
            setMapLocation("/images/Madhya_Pradesh.jpeg")
        } else if (state === "Maharashtra"){
            setMapLocation("/images/Maharashtra.jpeg")
        } else if (state === "Uttar Pradesh") {
            setMapLocation("/images/Uttar_Pradesh.jpeg")
        } else if(state === "Rajasthan"){
            setMapLocation("/images/Rajasthan.jpeg")
        } else if(state === "Gujarat"){
            setMapLocation("/images/Gujarat.jpeg")
        } else if(state === "Andhra Pradesh"){
            setMapLocation("/images/Andhra_Pradesh.jpeg")
        } else {
            setMapLocation("/images/NonState.png")
        }
    }, [state])
    return(
        <>
        <div className="flex flex-row w-[100%] h-[100%]">
            <div className="w-[60%] ml-[40px] flex flex-col justify-between h-[80vh] gap-y-8">
                <div className="mt-[40px] flex flex-row gap-x-4 items-center">
                    <div className="font-medium text-[30px] text-black">
                        SEARCH ANY STATE
                    </div>
                    <Button onClick={StateModel.onOpen} className="w-fit rounded-md bg-transparent border-2 border-neutral-500 border-dashed font-medium">{state !== "No State Selected" ? state: "Select a State"}</Button>
                </div>
                <div className="w-full shadow-lg border-2 border-neutral-200 rounded-lg h-full flex items-center px-8 flex-row gap-x-8 py-5">
                    <div className={`w-[35%] h-40 relative ${isOpen ? "hidden": "visible"}`}>
                        {/* <Image src={"/images/arc.png"} alt="" fill className="object-fit aspect-square w-1/2"/> */}
                        <Image src={"/images/arc.png"} fill alt="" className="relative"/>
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 border-2 px-3 flex items-center aspect-square rounded-full text-xl font-semibold border-indigo-200">{profileData?.toFixed(2)}</div>
                        <div className="absolute left-1/2 bottom-[0px]">
                            <div className={`w-[135px] border-2 border-black origin-top-left rounded-lg transition-all`} style={{ transform: `rotate(-${180 - (profileData || 0) * 18}deg)` }}></div>
                        </div>
                    </div>
                    <div className="relative w-[65%] h-[14rem] bg-green-400 rounded-lg">
                        <div className="absolute border-4 border-white bottom-[-5%] right-[-4%] rounded-xl w-[35%] h-[20%]">
                            <div className="w-full h-full relative">
                                <div className="absolute bottom-10 right-6 text-lg font-bold">RATING</div>
                            </div>
                        </div>
                        <div className="absolute border-4 rounded-full border-white top-[5%] left-[2%] w-10 h-10"></div>
                        <div className="left-16 absolute top-5 text-xl font-semibold">YOUR INDUSTRY FALLS IN {safety} ZONE</div>
                        <div className="absolute top-14 left-14 max-h-30 overflow-hidden">Industry Summary: The industry was established on {formationYear} and has been given a prediction of {safety} by the disastry prediction system on the basis of its quality of material used, weather conditions and other params</div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-y-3">
                    <div className="font-medium text-[30px] text-black">
                        PREDICT INDUSTRY RANK
                    </div>
                    <form className="w-full flex flex-row gap-x-4" onSubmit={prediction}>
                        <Input
                            placeholder="Formation Year"
                            type="text"
                            name="formationYear"
                            value={formData.formationYear}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Industry Type"
                            type="text"
                            name="industryType"
                            value={formData.industryType}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Weather Today"
                            type="text"
                            name="weather"
                            value={formData.weather}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Material Used Quality"
                            type="text"
                            name="materialQuality"
                            value={formData.materialQuality}
                            onChange={handleInputChange}
                        />
                        <Button className="rounded-lg bg-indigo-500" type="submit" disabled={isLoadingRank}>{isLoadingRank? "Predicting": "Predict Rank"}</Button>
                    </form>
                    <form className="w-full flex flex-row gap-x-4">
                        <Input
                            placeholder="Peak OverPressure"
                            type="text"
                            name="peakOverPressure"
                            value={formData.peakOverPressure}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Mass Flowing Out"
                            type="text"
                            name="massFlow"
                            value={formData.massFlow}
                            onChange={handleInputChange}
                        />
                        <Button className="rounded-lg bg-indigo-500" onClick={handleRadiusSubmit} disabled={isLoading}>{isLoading ? "Predicting": "Predict Radius"}</Button>
                    </form>
                </div>
                <div className="w-fit h-fit px-3 py-2 rounded-md bg-neutral-400">
                    <p>The prediction for the extent of radius of damage comes out to be : {radiusFactor}</p>
                </div>
            </div>
            <div className="w-[40%] flex items-center justify-center px-4">
                <div className={`relative w-full h-[60vh] rounded-lg shadow-black ${state === "No State Selected" ? "shadow-none opacity-25": "shadow-md"}`}>
                <Image src={MapLocation} alt="Maharashtra" fill className={`bg-cover bg-no-repeat bg-center absolute h-28 rounded-lg`}/>
                    <div className="relative w-[80%] h-[65%]">
                        {IndustryArray.filter((items) => items.state === state).map((item) => (
                            <PredictionList key={item.label} {...item}/>
                        ))}
                    </div>
                </div>
            </div>
            <a href="file:///C:/Users/Admin/Downloads/aboutus.zip/aboutus/index.html" target="_blank" rel="noopener noreferrer">
                Open in New Tab
            </a>
        </div>
        </>
    )
}

export default PredictionPlayground