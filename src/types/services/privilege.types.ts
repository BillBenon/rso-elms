/* eslint-disable no-unused-vars */
export enum PrivilegeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum PrivilegeFeatureType {
  ADMIN = 'ADMIN',
  EVALUATION = 'EVALUATION',
  REPORTING = 'REPORTING',
  INTERACTIVE_LEARNING = 'INTERACTIVE_LEARNING',
}

export interface PrivilegeUpdate {
  id: string;
  name: string;
  status: PrivilegeStatus;
  description: string;
  feature_type: PrivilegeFeatureType;
}

export interface PrivilegeRes extends PrivilegeUpdate {}

export enum Privileges {
  //evaluation
  CAN_ACCESS_EVALUATIONS = 'CAN_ACCESS_EVALUATIONS',
  CAN_CREATE_EVALUATION = 'CAN_CREATE_EVALUATION',
  CAN_MODIFY_EVALUATION = 'CAN_MODIFY_EVALUATION',
  CAN_DELETE_EVALUATION = 'CAN_DELETE_EVALUATION',
  //reports
  CAN_ACCESS_REPORTS = 'CAN_ACCESS_REPORTS',
  CAN_DOWNLOAD_REPORTS = 'CAN_DOWNLOAD_REPORTS',
  //users
  CAN_ACCESS_USERS = 'CAN_ACCESS_USERS',
  CAN_CREATE_USER = 'CAN_CREATE_USER',
  CAN_MODIFY_USER = 'CAN_MODIFY_USER',
  CAN_DELETE_USER = 'CAN_DELETE_USER',
  CAN_ACCESS_PROFILE = 'CAN_ACCESS_PROFILE',
  // ranks
  CAN_CREATE_RANK = 'CAN_CREATE_RANK',
  CAN_ACCESS_RANKS = 'CAN_ACCESS_RANKS',
  CAN_EDIT_RANK = 'CAN_EDIT_RANK',
  //role
  CAN_ACCESS_ROLES = 'CAN_ACCESS_ROLES',
  CAN_CREATE_ROLE = 'CAN_CREATE_ROLE',
  CAN_MODIFY_ROLE = 'CAN_MODIFY_ROLE',
  CAN_ACCESS_ROLE = 'CAN_ACCESS_ROLE',
  CAN_ASSIGN_ROLE = 'CAN_ASSIGN_ROLE',
  //academy
  CAN_CREATE_ACADEMY = 'CAN_CREATE_ACADEMY',
  CAN_MODIFY_ACADEMY = 'CAN_MODIFY_ACADEMY',
  CAN_DELETE_ACADEMY = 'CAN_DELETE_ACADEMY',
  CAN_ACCESS_ACADEMY = 'CAN_ACCESS_ACADEMY',
  CAN_ASSIGN_ACADEMY_INCHARGE = 'CAN_ASSIGN_ACADEMY_INCHARGE',
  CAN_MODIFY_INSTITUTION = 'CAN_MODIFY_INSTITUTION',
  // academic year
  CAN_ACCESS_ACADEMIC_YEARS = 'CAN_ACCESS_ACADEMIC_YEARS',
  CAN_CREATE_ACADEMIC_YEAR = 'CAN_CREATE_ACADEMIC_YEAR',
  CAN_MODIFY_ACADEMIC_YEAR = 'CAN_MODIFY_ACADEMIC_YEAR',
  CAN_DELETE_ACADEMIC_YEAR = 'CAN_DELETE_ACADEMIC_YEAR',
  CAN_ACCESS_ACADEMIC_YEAR = 'CAN_ACCESS_ACADEMIC_YEAR',
  // divisions
  CAN_ACCESS_DIVISIONS = 'CAN_ACCESS_DIVISIONS',
  CAN_CREATE_DIVISION = 'CAN_CREATE_DIVISION',
  CAN_MODIFY_DIVISION = 'CAN_MODIFY_DIVISION',
  CAN_DELETE_DIVISION = 'CAN_DELETE_DIVISION',
  //programs
  CAN_ACCESS_PROGRAMS = 'CAN_ACCESS_PROGRAMS',
  CAN_CREATE_PROGRAM = 'CAN_CREATE_PROGRAM',
  CAN_MODIFY_PROGRAM = 'CAN_MODIFY_PROGRAM',
  CAN_DELETE_PROGRAM = 'CAN_DELETE_PROGRAM',
  // levels
  CAN_CREATE_LEVEL = 'CAN_CREATE_LEVEL',
  CAN_ACCESS_LEVELS = 'CAN_ACCESS_LEVELS',
  CAN_MODIFY_LEVEL = 'CAN_MODIFY_LEVEL',
  CAN_DELETE_LEVEL = 'CAN_DELETE_LEVEL',
  //program levels
  CAN_ACCESS_PROGRAM_LEVELS = 'CAN_ACCESS_PROGRAM_LEVELS',
  CAN_CREATE_PROGRAM_LEVELS = 'CAN_CREATE_PROGRAM_LEVELS',
  CAN_MODIFY_PROGRAM_LEVELS = 'CAN_MODIFY_PROGRAM_LEVELS',
  CAN_DELETE_PROGRAM_LEVELS = 'CAN_DELETE_PROGRAM_LEVELS',
  //modules
  CAN_ACCESS_MODULES = 'CAN_ACCESS_MODULES',
  CAN_CREATE_MODULES = 'CAN_CREATE_MODULES',
  CAN_MODIFY_MODULES = 'CAN_MODIFY_MODULES',
  CAN_DELETE_MODULES = 'CAN_DELETE_MODULES',
  CAN_TEACH_MODULE = 'CAN_TEACH_MODULE',
  //subjects
  CAN_ACCESS_SUBJECTS = 'CAN_ACCESS_SUBJECTS',
  CAN_CREATE_SUBJECTS = 'CAN_CREATE_SUBJECTS',
  CAN_MODIFY_SUBJECTS = 'CAN_MODIFY_SUBJECTS',
  CAN_DELETE_SUBJECTS = 'CAN_DELETE_SUBJECTS',
  //module materials
  CAN_ACCESS_MODULE_MATERIALS = 'CAN_ACCESS_MODULE_MATERIALS',
  CAN_CREATE_MODULE_MATERIALS = 'CAN_CREATE_MODULE_MATERIALS',
  CAN_MODIFY_MODULE_MATERIALS = 'CAN_MODIFY_MODULE_MATERIALS',
  CAN_DELETE_MODULE_MATERIALS = 'CAN_DELETE_MODULE_MATERIALS',
  // schedule
  CAN_ACCESS_SCHEDULES = 'CAN_ACCESS_SCHEDULES',
  CAN_CREATE_SCHEDULE = 'CAN_CREATE_SCHEDULE',
  CAN_MODIFY_SCHEDULE = 'CAN_MODIFY_SCHEDULE',
  CAN_DELETE_SCHEDULE = 'CAN_DELETE_SCHEDULE',
  CAN_ACCESS_CALENDER = 'CAN_ACCESS_CALENDER',
  //events
  CAN_ACCESS_EVENTS = 'CAN_ACCESS_EVENTS',
  CAN_CREATE_EVENT = 'CAN_CREATE_EVENT',
  CAN_MODIFY_EVENT = 'CAN_MODIFY_EVENT',
  CAN_DELETE_EVENT = 'CAN_DELETE_EVENT',
  //venues
  CAN_ACCESS_VENUES = 'CAN_ACCESS_VENUES',
  CAN_CREATE_VENUE = 'CAN_CREATE_VENUE',
  CAN_MODIFY_VENUE = 'CAN_MODIFY_VENUE',
  CAN_DELETE_VENUE = 'CAN_DELETE_VENUE',
  //timetable
  CAN_ACCESS_TIMETABLE = 'CAN_ACCESS_TIMETABLE',
  CAN_CREATE_TIMETABLE = 'CAN_CREATE_TIMETABLE',
  CAN_MODIFY_TIMETABLE = 'CAN_MODIFY_TIMETABLE',
  //registration control
  CAN_ACCESS_REG_CONTROLS = 'CAN_ACCESS_REG_CONTROLS',
  CAN_CREATE_REG_CONTROL = 'CAN_CREATE_REG_CONTROL',
  CAN_MODIFY_REG_CONTROL = 'CAN_MODIFY_REG_CONTROL',
  CAN_DELETE_REG_CONTROL = 'CAN_DELETE_REG_CONTROL',
  //intakes
  CAN_ACCESS_INTAKES = 'CAN_ACCESS_INTAKES',
  CAN_CREATE_INTAKE = 'CAN_CREATE_INTAKE',
  CAN_MODIFY_INTAKE = 'CAN_MODIFY_INTAKE',
  CAN_DELETE_INTAKE = 'CAN_DELETE_INTAKE',
  //program intake
  CAN_ACCESS_PROGRAMS_IN_INTAKE = 'CAN_ACCESS_PROGRAMS_IN_INTAKE',
  CAN_CREATE_PROGRAMS_IN_INTAKE = 'CAN_CREATE_PROGRAMS_IN_INTAKE',
  CAN_MODIFY_PROGRAMS_IN_INTAKE = 'CAN_MODIFY_PROGRAMS_IN_INTAKE',
  CAN_DELETE_PROGRAMS_IN_INTAKE = 'CAN_DELETE_PROGRAMS_IN_INTAKE',
  //instructor on program
  CAN_ACCESS_INSTRUCTORS_ON_PROGRAM = 'CAN_ACCESS_INSTRUCTORS_ON_PROGRAM',
  CAN_CREATE_INSTRUCTORS_ON_PROGRAM = 'CAN_CREATE_INSTRUCTORS_ON_PROGRAM',
  //student approval
  CAN_ACCESS_STUDENT_APPROVAL = 'CAN_ACCESS_STUDENT_APPROVAL',
  CAN_MODIFY_STUDENT_APPROVAL = 'CAN_MODIFY_STUDENT_APPROVAL',
  //intake pprogra
  CAN_ACCESS_INTAKE_PROGRAM_MODULES = 'CAN_ACCESS_INTAKE_PROGRAM_MODULES',
  CAN_CREATE_INTAKE_PROGRAM_MODULES = 'CAN_CREATE_INTAKE_PROGRAM_MODULES',
  CAN_MODIFY_INTAKE_PROGRAM_MODULES = 'CAN_MODIFY_INTAKE_PROGRAM_MODULES',
  CAN_DELETE_INTAKE_PROGRAM_MODULES = 'CAN_DELETE_INTAKE_PROGRAM_MODULES',
  //lesson
  CAN_ACCESS_LESSON = 'CAN_ACCESS_LESSON',
  CAN_CREATE_LESSON = 'CAN_CREATE_LESSON',
  CAN_MODIFY_LESSONS = 'CAN_MODIFY_LESSONS',
  CAN_DELETE_LESSON = 'CAN_DELETE_LESSON',
  //instructor on program level
  CAN_ACCESS_INSTRUCTORS_ON_LEVEL_PRORAM = 'CAN_ACCESS_INSTRUCTORS_ON_LEVEL_PRORAM',
  CAN_CREATE_INSTRUCTORS_ON_LEVEL_PRORAM = 'CAN_CREATE_INSTRUCTORS_ON_LEVEL_PRORAM',
  CAN_DELETE_INSTRUCTORS_ON_LEVEL_PRORAM = 'CAN_DELETE_INSTRUCTORS_ON_LEVEL_PRORAM',
  //student on program level
  CAN_CREATE_STUDENTS_ON_LEVEL_PRORAM = 'CAN_CREATE_STUDENTS_ON_LEVEL_PRORAM',
  CAN_ACCESS_STUDENTS_ON_LEVEL_PRORAM = 'CAN_ACCESS_STUDENTS_ON_LEVEL_PRORAM',
  CAN_DELETE_STUDENTS_ON_LEVEL_PRORAM = 'CAN_DELETE_STUDENTS_ON_LEVEL_PRORAM',
  //privilege
  CAN_ACCESS_PRIVILEGES = 'CAN_ACCESS_PRIVILEGES',

  //user profile info
  CAN_ACCESS_USERS_PERSONAL_INFO = 'CAN_ACCESS_USERS_PERSONAL_INFO',
  CAN_ACCESS_USERS_NEXTOFKIN = 'CAN_ACCESS_USERS_NEXTOFKIN',
  CAN_ACCESS_USERS_RANKS = 'CAN_ACCESS_USERS_RANKS',
  CAN_ACCESS_USERS_ROLES = 'CAN_ACCESS_USERS_ROLES',
}
