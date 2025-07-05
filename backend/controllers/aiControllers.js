import * as genAI from '@google/generative-ai';
import {questionAnswerPrompt, conceptExplainPrompt} from '../utils/prompts.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';


// console.log("Google API Key:", process.env.GOOGLE_AI_API_KEY);


 const ai = new genAI.GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);


//generate interview questions and answers using gemini
const generateInterviewQuestions =asyncHandler(async (req, res) => {
   const {role,experience,topicsToFocus, numberOfQuestions} = req.body;

   if(!role || !experience || !topicsToFocus || !numberOfQuestions) {
       throw new ApiError(400, "All fields are required");
   }

   const prompt= questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);
    
   if(!prompt) {
       throw new ApiError(400, "Invalid prompt");
   }

   const model = ai.getGenerativeModel({ model: "gemini-2.5-pro" });

const result = await model.generateContent(prompt);
const response = await result.response;
const rawText = await response.text();



   const cleanedText = rawText
       .replace(/^```json\s*/,"") // Remove starting ```json
       .replace(/```$/,"") //remove ending ```
       .trim();

//parsing the cleaned text
let data;
try {
    data = JSON.parse(cleanedText);
} catch (e) {
    throw new ApiError(500, "Failed to parse AI response as JSON");
}

res.status(200).json(
    new ApiResponse(200,data, "Interview questions generated successfully")
);
}
);


//generate concept explanation using gemini
 const generateConceptExplanation = asyncHandler(async (req, res) => {
    // console.log("REQ BODY:", req.body);
    const {question} = req.body 

    if (!question) {
        return res.status(400).json({ message: "Missing required field" });
    }

    const prompt = conceptExplainPrompt(question);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    const cleanedText = rawText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();

    let data;
    try {
        data = JSON.parse(cleanedText);
    } catch (e) {
        throw new ApiError(500, "Failed to parse AI response as JSON");
    }

    res.status(200).json(
        new ApiResponse(200, data, "Concept explanation generated successfully")
    );
});

export {generateInterviewQuestions,generateConceptExplanation};