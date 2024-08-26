import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generateQuiz = async (text:any, settings:any) => {
  // Make this function async
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  });

  try {
    const prompt = `you are a teacher that excels in creating japanese quizes in japanese only, create a japanese quiz with the following settings: ${JSON.stringify(
      settings
    )}. Return in this JSON format: example: {questions: [{
        "question": string,
        "type": "multiple-choice",
        "answers": string[], 
        "correctAnswer": string
        "explanation": string // 1 sentence explanation of why the correct answer is correct
        },]}, example:
        //information recall example:
        {
            "questions": [
                {
                    "question": "台風10号の影響で、27日の午前中に線状降水帯が発生する可能性が高いのはどの地域ですか？",
                    "displaytype": "multiple-choice",
                    "type": "infomation-recall",
                    "answers": [
                        "近畿地方",
                        "東海地方",
                        "四国地方",
                        "東北地方"
                    ],
                    "correctAnswer": "東海地方",
                    "explanation": "台風10号の影響で、27日の午前中に東海地方で線状降水帯が発生する可能性が高いとされています。"
                },
            ]
        }
        //inference example:
        {
            "questions": [{
            "question": "台風10号が接近する時、奄美地方ではどのような強風が吹く可能性がありますか？",
            "displaytype": "multiple-choice",
            "type": "inference",
            "answers": [
            "走行中のトラックが横転するほどの猛烈な風",
            "一部の住宅が倒壊するほどの猛烈な風",
            "電柱が倒れるほどの猛烈な風",
            "傘がさせない程度の強風"
            ],
            "correctAnswer": "走行中のトラックが横転するほどの猛烈な風",
            "explanation": "本文によると、台風接近に伴い奄美地方では27日に最大風速30メートルとなり、これは走行中のトラックが横転するほどの猛烈な風とされています。"
            }]},
        
        from the following text: "${text}" `; // Correctly format the prompt

    const result = await model.generateContent(prompt);
    const response = result.response;
    const quiz = await response.text();
    return quiz;
  } catch (error) {
    console.log('Error generating translation:', error);
    return 'Error generating translation';
  }
};

export async function POST(req:any) {
  // Get the body
  const { text, settings } = await req.json(); // Ensure the keys match the request
 
  const generatedQuiz = await generateQuiz(text, settings); // Await the translation
  return Response.json({ quiz: generatedQuiz }); // Return the translation in the correct format
}
