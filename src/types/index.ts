export type PatientStatus = 'Active' | 'Inactive';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: PatientStatus;
  lastVisit: string;
  createdAt: any; // Firestore Timestamp
  initials?: string; // Optional helper
  avatarColor?: string; // Optional helper
}

// ─── KPI ───────────────────────────────────────────────────────────────────
export interface KpiData {
  label: string;
  value: string;
  badge?: string;
  badgeColor?: string;
  icon: string;
  iconBg: string;
  accentColor: string;
}

// ─── Activity ───────────────────────────────────────────────────────────────
export interface ActivityRow {
  id: string;
  name: string;
  initials: string;
  status: 'STABLE' | 'OBSERVATION' | 'URGENT' | 'DISCHARGED';
  condition: string;
  lastVisit: string;
  avatarColor: string;
}

// ─── Appointment ────────────────────────────────────────────────────────────
export interface Appointment {
  id: string;
  title: string;
  patient: string;
  time: string;
  month: string;
  day: string;
  icon: string;
  faded?: boolean;
}

// ─── User ───────────────────────────────────────────────────────────────────
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// ─── Chart ───────────────────────────────────────────────────────────────────
export interface VisitDataPoint {
  month: string;
  admissions: number;
  discharges: number;
}

export interface ConditionDataPoint {
  name: string;
  value: number;
  color: string;
}

// ─── Department ─────────────────────────────────────────────────────────────
export interface Department {
  name: string;
  staff: number;
  waitTime: string;
  efficiency: number;
  status: 'Optimal' | 'Delayed' | 'At Risk';
}
