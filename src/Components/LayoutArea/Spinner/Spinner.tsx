import "./Spinner.css";
import sk8gif from "../../../Assets/Images/s8Spinner.gif"

export function Spinner(): JSX.Element {
    return (
        <div className="Spinner">         
                <img src={sk8gif} alt="loading..."/>
        </div>
    );
}
