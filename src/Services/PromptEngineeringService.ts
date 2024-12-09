import { TricksModel } from "../Models/TricksModel";
import { gptService } from "./GptService";

class PromptEngineeringService {
    public async getTricks(Tricks: TricksModel): Promise<string> {
        const systemContent = `You are a professional skateboard coach with years of experience in designing trick lines for skaters of all skill levels. 
        Your task is to generate creative and practical skateboarding trick lines tailored to specific user preferences.
        The output should always be accurate, safe, and helpful for skaters to practice and improve.`;

        const assistantContent = `As a skateboard coach, I specialize in creating fun, challenging, and skill-appropriate trick lines. 
        Let me know what kind of tricks or preferences you'd like, and I'll generate a line that suits your needs. 
        I can include flatground tricks, grinds, slides, and even switch or nollie tricks if requested.`;

        const userContent = `
Generate a skateboard trick line based on the following preferences:
- The line should consist of exactly ${Tricks.numberOfTricks} tricks.
- The difficulty of all tricks must be '${Tricks.overallDifficulty}', unless the difficulty is 'Mixed'. If 'Mixed' is selected, the tricks can vary in difficulty.
- The trick line must include at least one grind trick if grinds are requested (${Tricks.hasGrinds ? "Yes" : "No"}).
- The trick line should ${Tricks.hasSlides ? "include" : "not include"} slide tricks.
- Each trick must specify:
  * Name (e.g., Ollie, Kickflip, Nosegrind)
  * Difficulty (Beginner, Intermediate, Advanced, or Mixed)
  * Stance (Regular, Fakie, Nollie, Switch)
- Include a description summarizing the trick line's purpose and target skill level.

Output the result in JSON format, adhering to this structure:
{
    "trickLine": [
        {"name": "Kickflip", "difficulty": "Intermediate", "stance": "Regular"}
    ],
    "hasGrinds": ${Tricks.hasGrinds},
    "hasSlides": ${Tricks.hasSlides},
    "description": "${Tricks.description || "A dynamic trick line for skaters."}"
}
Do not include any commentary or explanation outside the JSON.
`;




        const trickLine = await gptService.getCompletion(systemContent, assistantContent, userContent.trim());
        return trickLine;
    }
}

export const promptEngineeringService = new PromptEngineeringService();
