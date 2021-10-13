import { Table } from '..';

export interface Lesson {
  content: string;
  id: string | number;
  subject_id: string;
  title: string;
}

export interface LessonInfo extends Lesson, Table {}
