import "./Form.css";
import { useForm } from "react-hook-form";
import { TricksModel, Difficulty } from "../../../Models/TricksModel";
import { promptEngineeringService } from "../../../Services/PromptEngineeringService";
import { useState } from "react";
import { Spinner } from "../Spinner/Spinner";

interface FormInputs {
    numberOfTricks: number;
    overallDifficulty: Difficulty;
    hasGrinds: boolean;
    hasSlides: boolean;
}

export function Form(): JSX.Element {
    const { register, handleSubmit } = useForm<FormInputs>();
    const [isLoading, setIsLoading] = useState(false);
    const [tricks, setTricks] = useState<TricksModel | null>(null);
    const [showNextButton, setShowNextButton] = useState(false);

    const send = async (data: FormInputs) => {
        setIsLoading(true);
        setTricks(null);
        setShowNextButton(false);

        const tricksRequest: TricksModel = {
            trickLine: [],
            hasGrinds: data.hasGrinds,
            hasSlides: data.hasSlides,
            description: `A trick line with ${data.numberOfTricks} tricks and ${data.overallDifficulty} difficulty.`,
            overallDifficulty: data.overallDifficulty,
            numberOfTricks: data.numberOfTricks,
        };

        try {
            const completion = await promptEngineeringService.getTricks(tricksRequest);
            const parsedTricks: TricksModel = JSON.parse(completion);
            setTricks(parsedTricks);
        } catch (error) {
            console.error("Error fetching tricks:", error);
        } finally {
            setIsLoading(false); // Stop the spinner
            setTimeout(() => setShowNextButton(true), 3000);
        }
    };

    const resetForm = () => {
        setTricks(null);
        setShowNextButton(false);
    };

    return (
        <div className="Form">
            {!tricks && !isLoading && (
                <form onSubmit={handleSubmit(send)}>
                    <label>Number Of Tricks</label>
                    <br />
                    <input type="number" title="1 to 8 tricks" min={1} max={8} required {...register("numberOfTricks", { valueAsNumber: true })} />
                    <br /><br />

                    <label>Overall Difficulty</label><br />
                    <select {...register("overallDifficulty", { required: true })} defaultValue="">
                        <option disabled  defaultValue="">Choose Difficulty</option>
                        {Object.values(Difficulty).map((difficulty) => (
                            <option key={difficulty} value={difficulty}>{difficulty}</option>))}</select>
                    <br /><br />

                    <label><input type="checkbox" {...register("hasGrinds")} />Include Grinds</label><br /><label>
                        <input type="checkbox" {...register("hasSlides")} />Include Slides</label>
                    <br /><br />
                    <button type="submit">🛹</button>
                </form>
            )}

            <div className="ResponseArea">
                {isLoading && <Spinner />}
                {tricks && (
                    <div className="Card">
                        <h3>Your Trick Line:</h3>
                        <ul>
                            {tricks.trickLine.map((trick, index) => {
                                const displayName =
                                    trick.stance === "Regular" || trick.name.toLowerCase().includes(trick.stance.toLowerCase())
                                        ? trick.name
                                        : `${trick.stance} ${trick.name}`;

                                return (
                                    <li key={index}><strong>{displayName}</strong> - {trick.difficulty}</li>
                                );
                            })}
                        </ul>
                        <p>{tricks.description}</p>
                    </div>
                )}


                {showNextButton && (<button className={`NextButton fadeIn`} onClick={resetForm}>Next Line?</button>)}
            </div>
        </div>
    );
}
