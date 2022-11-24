export interface ICurrentQuestion {
  id: number;
  description: string;
  image: string;
  question: string;
  answer: string;
  correctAnswer: number[];
  words: { id: number; word: string; isPicked: boolean }[];
}

export interface IQuestions {
  data: ICurrentQuestion[];
  currentIndexQuestion: number;
  currentQuestion: any;
  status: "loading" | "error" | "fulfilled" | "";
  errorMessage: string;
  isCorrect: boolean;
  level: number;
  experience: number;
  countError: number;
  isFinished: boolean;
  isShowExitWindow: boolean;
}

export interface IWords {
  id: number;
  word: string;
  isPicked: boolean;
}
