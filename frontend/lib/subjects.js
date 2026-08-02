// ═══════════════════════════════════════════════════════════════════
// Exam-specific subject list. NEET has Biology (no Maths).
// JEE has Maths (no Biology). Every feature that shows a subject
// dropdown should call getSubjects() so we never mix them up.
// ═══════════════════════════════════════════════════════════════════

const SUBJECTS_BY_EXAM = {
  NEET: ['Physics', 'Chemistry', 'Biology'],
  JEE:  ['Physics', 'Chemistry', 'Maths'],
};

export function getExam() {
  try {
    const u = JSON.parse(localStorage.getItem('after12th_user') || '{}');
    return u.exam === 'JEE' ? 'JEE' : 'NEET';
  } catch { return 'NEET'; }
}

export function getSubjects(exam) {
  const e = exam || getExam();
  return SUBJECTS_BY_EXAM[e] || SUBJECTS_BY_EXAM.NEET;
}

// Returns true if this subject is valid for the current (or given) exam.
export function isSubjectValid(subject, exam) {
  return getSubjects(exam).includes(subject);
}

// If the currently-selected subject isn't valid for this exam, return the
// first valid one instead. Prevents "Biology selected but user is JEE" bugs.
export function safeSubject(subject, exam) {
  const list = getSubjects(exam);
  return list.includes(subject) ? subject : list[0];
}
