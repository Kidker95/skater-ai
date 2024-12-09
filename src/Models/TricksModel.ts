export class TricksModel {
    trickLine: Trick[];
    hasGrinds: boolean;
    hasSlides: boolean;
    description:string;
    overallDifficulty: Difficulty;
    numberOfTricks: number;
}

export interface Trick {
    name: string;
    difficulty: Difficulty;
    stance: Stance;
}

export enum Difficulty {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
    Mixed = "Mixed"
}

export enum Stance {
    Regular = "Regular",
    Fakie = "Fakie",
    Nollie = "Nollie",
    Switch = "Switch"
}