export type LessonStageId = 
  | 'welcome'
  | 'computer-types'
  | 'input-superpower'
  | 'output-superpower'
  | 'robot-challenge'
  | 'badge-ceremony';

export type DeviceType = 'input' | 'output' | 'both';

export interface DeviceInfo {
  id: string;
  name: string;
  category: DeviceType;
  actionWord: 'IN' | 'OUT' | 'IN & OUT';
  gestureDescription: string;
  analogy: string;
  soundType: 'keyboard' | 'mouse' | 'screen' | 'printer' | 'tablet' | 'laptop';
  description: string;
  catchphrase: string;
}

export interface RobotChallengeQuestion {
  id: string;
  deviceName: string;
  correctAnswer: 'IN' | 'OUT';
  promptQuote: string;
  hint: string;
  gestureHint: string;
  iconName: string;
  speedRound?: boolean;
}

export interface CertificateData {
  studentName: string;
  avatarId: string;
  badgeTitle: string;
  completionDate: string;
  teacherSignature: string;
}
