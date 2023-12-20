"use client"
import Input from "@/components/Input/input"
import { Data } from "@/types";
import { useEffect, useState } from "react";

const Simulation = () => {
    const [rangeValue, setRangeValue] = useState(0); // Initial value
    const [flowChange, setFlowChange] = useState(0);
    const [lightIntensity, setLightIntensity] = useState(0);
    const [soundIntensity, setSoundIntensity] = useState(0);

    const [rangeValuetwo, setRangeValuetwo] = useState(0); // Initial value
    const [flowChangetwo, setFlowChangetwo] = useState(0);
    const [lightIntensitytwo, setLightIntensitytwo] = useState(0);
    const [soundIntensitytwo, setSoundIntensitytwo] = useState(0);
    
    const handleLightIntensityChange = (event: any) => {
        const newValue = parseFloat(event.target.value);
        setLightIntensity(newValue);
    };
    const handleSoundIntensityChange = (event: any) => {
        const newValue = parseFloat(event.target.value);
        setSoundIntensity(newValue);
    };
    const handleLightIntensityChangetwo = (event: any) => {
        const newValue = parseFloat(event.target.value);
        setLightIntensitytwo(newValue);
    };
    const handleSoundIntensityChangetwo = (event: any) => {
        const newValue = parseFloat(event.target.value);
        setSoundIntensitytwo(newValue);
    };

    const [radiusone, setRadiusOne] = useState<number | null>(0)
    const [radiustwo, setRadiusTwo] = useState<number | null>(0)
    const getRadius = () => {
        const radiusonenew = 648*(Math.pow(flowChange, 1/5))
        setRadiusOne((radiusonenew*300 + radiusonenew*rangeValue*300)/3000)
        console.log((radiusonenew/1000)*30 + "px")
    }

    const handleMassFlowChange = (event: any) => {
        const newValue = parseFloat(event.target.value);
        if(rangeValue !== 0){
            const radiusonenew = 648*(Math.pow(newValue, 1/5))
            setRadiusOne((radiusonenew*300 + radiusonenew*rangeValue*300)/3000)
            setFlowChange(newValue);
        } else {
            setFlowChange(newValue);
        }
    };

    const handleRangeChange = (event: any) => {
        const newValue = parseFloat(event.target.value);
        if(rangeValue !== 0){
            const radiusonenew = 648*(Math.pow(flowChange, 1/5))
            setRadiusOne((radiusonenew*300 + radiusonenew*newValue*300)/3000)
            setRangeValue(newValue);
        } else {
            setRadiusOne(0)
            setRangeValue(newValue);
        }
    };

    const handleRangeChangetwo = (event: any) => {
        const newValue = parseFloat(event.target.value);
        if(rangeValuetwo !== 0){
            const radiusonenew = 648*(Math.pow(flowChangetwo, 1/5))
            setRadiusTwo((radiusonenew*300 + radiusonenew*newValue*300)/3000)
            setRangeValuetwo(newValue);
        }
        setRangeValuetwo(newValue);
    };

    const handleMassFlowChangetwo = (event: any) => {
        const newValue = parseFloat(event.target.value);
        if(rangeValuetwo !== 0){
            const radiusonenew = 648*(Math.pow(newValue, 1/5))
            setRadiusTwo((radiusonenew*300 + radiusonenew*rangeValue*300)/3000)
            setFlowChangetwo(newValue);
        } else {
            setFlowChangetwo(newValue);
        }
    };

    const centerAdjustment = (radiusone || 0) / 2;
    const DynamicStyles: React.CSSProperties = {
        width: `${radiusone}px`,
        height: `${radiusone}px`,
        position: "absolute",
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        border: "4px solid rgba(255, 0, 0, 0.4)",
        top: `calc(22% - ${centerAdjustment}px)`,
        left: `calc(23% - ${centerAdjustment}px)`,
        rotate: "-45deg",
        backgroundColor: "rgba(255, 0, 0, 0.2)"
    }

    const centerAdjustmenttwo = (radiustwo || 0) / 2;
    const DynamicStylesTwo: React.CSSProperties = {
        width: `${radiustwo}px`,
        height: `${radiustwo}px`,
        position: "absolute",
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        border: "4px solid red",
        top: `calc(50% - ${centerAdjustmenttwo}px)`,
        left: `calc(77% - ${centerAdjustmenttwo}px)`,
        rotate: "-45deg",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        opacity: 0.5
    }

    const [Explosion, setExplosion] = useState("False")
    const explode = () => {
        if(rangeValue >= 0.1 && flowChange >= 100 && lightIntensity >= 200 && soundIntensity > 300){
            setExplosion("True")
        }
    }

    const [Effect, setEffect] = useState(false)
    useEffect(() => {
        if(Explosion === "True"){
            setTimeout(() => {
                setEffect(true)
            }, 5000)
        }
    }, [Explosion])
    return(
        <div className="flex flex-row">
            <div className="w-[30%] h-[100vh] bg-gray-800 overflow-auto">
                <div className="py-5 px-5 font-semibold text-xl text-white">PARAMETERS</div>
                <div className="px-5 text-lg font-medium text-white">Refinery 1</div>
                <div className="w-full px-5 mt-5">
                    <div className="text-white font-normal text-sm">Peak OverPressure</div>
                    <input id="typeinp" type="range" min="0" max="0.3" defaultValue={rangeValue} step="0.05" onChange={handleRangeChange} className="w-full"/>
                    <div className="text-white text-sm ml-1">{rangeValue}</div>   
                </div>
                <div className="w-full px-5 mt-2">
                    <div className="text-white font-normal text-sm">Mass Of Fuel Released</div>
                    <input id="typeinp" type="range" min="0" max="5000" defaultValue={rangeValue} step="1" onChange={handleMassFlowChange} className="w-full"/>
                    <div className="text-white text-sm ml-1">{flowChange}</div>   
                </div>
                <div className="w-full px-5 mt-2">
                    <div className="text-white font-normal text-sm">Light Intensity</div>
                    <input id="typeinp" type="range" min="0" max="1000" defaultValue={rangeValue} step="1" onChange={handleLightIntensityChange} className="w-full"/>
                    <div className="text-white text-sm ml-1">{lightIntensity}</div>   
                </div>
                <div className="w-full px-5 mt-2">
                    <div className="text-white font-normal text-sm">Sound Intensity</div>
                    <input id="typeinp" type="range" min="0" max="1000" defaultValue={rangeValue} step="1" onChange={handleSoundIntensityChange} className="w-full"/>
                    <div className="text-white text-sm ml-1">{soundIntensity}</div>   
                </div>
                <div className="flex justify-evenly px-5 py-2">
                    <button className="text-white bg-gray-600 border-gray-800 px-5 py-2 rounded-sm bg-opacity-60" onClick={getRadius}>GET RADIUS</button>
                    <button className="text-white bg-gray-600 border-gray-800 px-5 py-2 rounded-sm bg-opacity-60" onClick={explode}>EXPLODE</button>
                </div>
                <div className="px-5 text-lg font-medium text-white mt-5">Refinery 2</div>
                <div className="w-full px-5 mt-5">
                    <div className="text-white font-normal text-sm">Peak OverPressure</div>
                    <input id="typeinp" type="range" min="0" max="0.3" defaultValue={rangeValuetwo} step="0.05" onChange={handleRangeChangetwo} className="w-full"/>
                    <div className="text-white text-sm ml-1">{rangeValuetwo}</div>   
                </div>
                <div className="w-full px-5 mt-2">
                    <div className="text-white font-normal text-sm">Mass Of Fuel Released</div>
                    <input id="typeinp" type="range" min="0" max="5000" defaultValue={rangeValue} step="1" onChange={handleMassFlowChangetwo} className="w-full"/>
                    <div className="text-white text-sm ml-1">{flowChangetwo}</div>   
                </div>
                <div className="w-full px-5 mt-2">
                    <div className="text-white font-normal text-sm">Light Intensity</div>
                    <input id="typeinp" type="range" min="0" max="1000" defaultValue={rangeValue} step="1" onChange={handleLightIntensityChangetwo} className="w-full"/>
                    <div className="text-white text-sm ml-1">{lightIntensitytwo}</div>   
                </div>
                <div className="w-full px-5 mt-2">
                    <div className="text-white font-normal text-sm">Sound Intensity</div>
                    <input id="typeinp" type="range" min="0" max="1000" defaultValue={rangeValue} step="1" onChange={handleSoundIntensityChangetwo} className="w-full"/>
                    <div className="text-white text-sm ml-1">{soundIntensitytwo}</div>   
                </div>
                <div className="flex justify-evenly px-5 py-2">
                    <button className="text-white bg-gray-600 border-gray-800 px-5 py-2 rounded-sm bg-opacity-60 ">GET RADIUS</button>
                    <button className="text-white bg-gray-600 border-gray-800 px-5 py-2 rounded-sm bg-opacity-60 ">EXPLODE</button>
                </div>
            </div>
            <div className="w-[70%] bg-gray-600 relative layout-main">
                <div className="flex flex-col w-40 h-40 rounded-lg bg-white absolute top-[30%] left-[5%] px-5 py-3 items-center justify-center">
                    <div className="text-lg font-semibold">Main Industry</div>
                    <div className={`text-sm font-light ${lightIntensity > 200 && soundIntensity > 300 && rangeValue >= 0.1 ? "visible": "hidden"}`}>{lightIntensity > 200 && soundIntensity > 300 && rangeValue >= 0.1 && Explosion === "False" ? "Receiving Data . . .": "Data Recieved"}</div>
                </div>
                <div className={`absolute h-fit w-fit px-3 py-2 bg-opacity-50 top-[12%] left-[25%] text-black rounded-md ${lightIntensity > 200 && soundIntensity > 300 && rangeValue >= 0.1 ? "animate-pulse bg-red-600 text-white font-bold": "bg-white"}`}>
                    <div>Refinery 1</div>
                </div>
                <div className={`aspect-square bg-opacity-50 border-opacity-80 overflow-hidden`} style={DynamicStyles}>
                    <div className="Heatmap w-[350px] h-[350px] opacity-50 translate-x-[-50px] translate-y-[-50px] scale-[2]"></div>
                </div>
                <div className={`absolute h-fit w-fit px-3 py-2 bg-opacity-50 top-[37%] left-[75%] text-black rounded-md ${lightIntensitytwo > 200 && soundIntensitytwo > 300 && rangeValuetwo >= 0.1 ? "animate-pulse bg-red-600 text-white font-bold": "bg-white"}`}>
                    <div>Refinery 2</div>
                </div>
                <div className={`aspect-squarebg-red-300 bg-opacity-50 border-opacity-80 overflow-hidden`} style={DynamicStylesTwo}>
                    <div className="HeatmapTwo w-[350px] h-[350px] opacity-50 translate-x-[-50px] translate-y-[-50px] scale-[2]"></div>
                </div>
                <div className={`absolute h-fit w-fit px-3 py-2 bg-opacity-50 top-[60%] left-[75%] text-black rounded-md`}>
                    <div>Refinery 3</div>
                </div>
                <div className="flex w-26 h-20 rounded-lg bg-white absolute top-[85%] left-[8%] px-5 py-3 items-center justify-center scale-125 flex-col">
                    <div className="text-md font-semibold flex items-center justify-center text-center">Storage Body</div>
                    <p className={`text-[8px] text-black ${!Effect ? "hidden": "visible"}`}>{Explosion === "True" && Effect === false? "Receiving Data . . .": "Data Received"}</p>
                </div>
                <div className={`absolute ${lightIntensity > 200 && soundIntensity > 300 && rangeValue >= 0.1 && Explosion === "False" ? "opacity-100": "opacity-0"} px-5 py-3 rounded-md bg-gray-700 bg-opacity-70 border-2 border-gray-600 right-4 top-4 transition-all duration-2000`}>
                    <p className="text-white font-semibold">Sending Data to Main Industry . . .</p>
                </div>
                <div className={`absolute ${lightIntensity > 200 && soundIntensity > 300 && rangeValue >= 0.1 && Explosion === "False" ? "opacity-100": "opacity-0"} px-5 py-3 rounded-md bg-gray-700 bg-opacity-70 border-2 border-gray-600 right-4 top-[10%] transition-all gap-y-2 flex flex-col duration-2000`}>
                    <p className="text-white font-semibold">Mass Of Fuel Released : {flowChange}</p>
                    <p className="text-white font-semibold">Peak OverPressure : {rangeValue}</p>
                    <p className="text-white font-semibold">Sound Intensity : {soundIntensity}</p>
                    <p className="text-white font-semibold">Affected Radius : {(radiusone)?.toFixed(2)}</p>
                </div>
                <div className={`absolute ${Explosion === "True" ? "opacity-100": "opacity-0"} px-5 py-3 rounded-md bg-gray-700 bg-opacity-70 border-2 border-gray-600 right-4 top-4 transition-all duration-2000`}>
                    <p className="text-white font-semibold">{Effect === false ? "Sending Data to Storage Body . . .": "Received Data"}</p>
                </div>
                <div className={`absolute ${Effect === true ? "opacity-100": "opacity-0"} px-5 py-3 rounded-md bg-gray-700 bg-opacity-70 border-2 border-gray-600 right-4 top-[10%] transition-all gap-y-2 flex flex-col duration-2000`}>
                    <p className="text-white font-semibold">Mass Of Fuel Released : {flowChange}</p>
                    <p className="text-white font-semibold">Peak OverPressure : {rangeValue}</p>
                    <p className="text-white font-semibold">Sound Intensity : {soundIntensity}</p>
                    <p className="text-white font-semibold">Affected Radius : {(radiusone)?.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default Simulation