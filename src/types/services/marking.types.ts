/* eslint-disable no-unused-vars */  

  export interface SampleQuestionInfo{
      question: string;
      mark: number;
  }

  export interface MarkingRequired{
      answer_id: string;
      mark: number;
  }

  export interface MarkingCorrection{
    marked: boolean,
    markScored: number,
    answerId: string
  }
  export interface MarkAllEvaluationQuestions{
      studentEvaluation: string;
      correction: MarkingCorrection[];
  }
  
  export interface StudentAnswerInfo{
      openAnswer: string;
      markScored: number;
      marked: boolean;
      id: string;
      question: SampleQuestionInfo
  }
  
  