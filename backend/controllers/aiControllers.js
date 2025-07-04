import * as genAI from '@google/generative-ai';
import {questionAnswerPrompt, conceptExplainPrompt} from '../utils/prompts.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const ai=new genAI.GoogleGenerativeAI({
    apiKey: process.env.GOOGLE_AI_API_KEY
});

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
   const response = await ai.generateContent({
       model: 'gemini-2.0-flash-lite',
       contents: prompt,
    })
    
    let rawText=response.text;

    const cleanedText = rawText
        .replace(/^```json\s*/,"") // Remove starting ```json
        .replace(/```$/,"") //remove ending ```
        .trim();

//parsing the cleaned text
const data=JSON.parse(cleanedText);

res.status(200).json(
    new ApiResponse(200,data, "Interview questions generated successfully")
);
}
);


//generate concept explanation using gemini
 const generateConceptExplanation = asyncHandler(async (req, res) => {
  
});

export {generateInterviewQuestions,generateConceptExplanation};