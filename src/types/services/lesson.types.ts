import { Table } from '..';

export interface Lesson {
  content: string;
  id: string | number;
  subject_id: string;
  title: string;
}

export interface CreateLessonPlan {
  class_policy: string;
  end_time: string;
  grading: string;
  instructor_id: string;
  lesson_id: string;
  lesson_objective: string;
  lesson_requirements: string;
  start_time: string;
  text_books: string;
}

export interface LessonInfo extends Lesson, Table {}
