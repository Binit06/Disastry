interface PredictionListProps {
    label: string;
    prediction: string;
    xcord: string;
    ycord: string;
    formation: string;
    handleClick: () => void;
}

const PredictionList: React.FC<PredictionListProps> = ({
    label,
    prediction,
    xcord,
    ycord,
    formation,
    handleClick
}) => {
    let borderColor = "";

    // Determine border color based on prediction string
    switch (prediction) {
        case "Safe":
            borderColor = "#09C63E"; // Change to the color you want for Safe prediction
            break;
        case "Moderate":
            borderColor = "#FFE70D"; // Change to the color you want for Moderate prediction
            break;
        case "Dangerous":
            borderColor = "#FC9010"; // Change to the color you want for Dangerous prediction
            break;
        case "Critical":
            borderColor = "#FF0303"; // Change to the color you want for Critical prediction
            break;
        default:
            break;
    }

    const positionStyles: React.CSSProperties = {
        position: "absolute",
        border: `4px solid ${borderColor}`,
        top: `${xcord}%`,
        right: `${ycord}%`,
        borderRadius: "50%",
        transition: "all 250ms",
        cursor: "pointer"
    };

    return (
        <div
            className="hover:scale-150 w-4 h-4"
            style={positionStyles}
            onClick={handleClick}
        ></div>
    );
};

export default PredictionList;
