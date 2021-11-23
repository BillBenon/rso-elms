/* eslint-disable no-unused-vars */  

  export interface SampleQuestionInfo{
      question: string;
      mark: number;
  }

  export interface MarkingRequired{
      answer_id: string;
      mark: number;
  }
  
  export interface StudentAnswerInfo{
      openAnswer: string;
      markScored: number;
      marked: boolean;
      id: string;
      question: SampleQuestionInfo
  }
  
  