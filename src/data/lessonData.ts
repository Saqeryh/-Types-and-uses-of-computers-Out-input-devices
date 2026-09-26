import { DeviceInfo, RobotChallengeQuestion } from '../types';

export interface LessonStage {
  id: string;
  number: number;
  title: string;
  shortLabel: string;
  durationEst: string;
  teacherScript: string;
  callToAction: string;
  keyTakeaway: string;
}

export const LESSON_STAGES: LessonStage[] = [
  {
    id: 'welcome',
    number: 1,
    title: 'The Warmup & Secret Mission',
    shortLabel: 'Warmup & Mission',
    durationEst: '0:00 - 1:00',
    teacherScript: 
      'Good morning, super coders! If you can hear my voice, clap once! If you can see my big smile, clap twice! Wonderful! My name is Ms. Bushra, and today we are on a secret tech mission! Look around... Who has ever played a game or watched a video on a computer? Raise your hand high into the sky! Wow, look at all these bright minds! Today, we are going to unlock the computer’s two greatest superpowers!',
    callToAction: 'Clap along with Ms. Bushra and raise your hand!',
    keyTakeaway: 'Engage curiosity, active listening, and establish classroom community.'
  },
  {
    id: 'computer-types',
    number: 2,
    title: 'Super Shapes & Sizes',
    shortLabel: '3 Computer Shapes',
    durationEst: '1:00 - 2:00',
    teacherScript: 
      'Look at our screen! Computers are not just big heavy boxes sitting in offices. They come in super cool shapes and sizes! First, we have the Desktop! Can we say it together? Desktop! It loves to stay cozy on your table. Next, look at this one... The Laptop! It folds open and shut just like a magical book! You can take it in your backpack to school, to grandma’s house, or anywhere in the world! And third... The Tablet! Tap, tap, swipe! Pure touch-screen magic for drawing and learning.',
    callToAction: 'Explore the 3 shapes: fold the laptop, tap the tablet, cozy up the desktop!',
    keyTakeaway: 'Computers exist in multiple form factors suited for different spaces and tasks.'
  },
  {
    id: 'input-superpower',
    number: 3,
    title: 'Superpower 1: INPUT (Sending Things IN)',
    shortLabel: 'Superpower: INPUT',
    durationEst: '2:00 - 3:15',
    teacherScript: 
      'Now, lean in... Computers are smart, but they need OUR help to think. They have two superpowers: INPUT and OUTPUT! When we are hungry, we put yummy apples and bananas IN, right? Everybody say: IN! A computer does the same! When we send letters or instructions into the computer, that device is called an INPUT DEVICE! Look at our Keyboard! Click on it... Click-clack-clack! When our little fingers type: "H-E-L-L-O", we push words IN! And look at our cute Mouse! Click, click! When we click a button, we push orders IN! So, Keyboard and Mouse are... INPUT DEVICES!',
    callToAction: 'Click-clack the keyboard to send H-E-L-L-O in, and click the mouse to launch orders!',
    keyTakeaway: 'Input devices give data, words, and instructions to the computer.'
  },
  {
    id: 'output-superpower',
    number: 4,
    title: 'Superpower 2: OUTPUT (Sharing Things OUT)',
    shortLabel: 'Superpower: OUTPUT',
    durationEst: '3:15 - 4:00',
    teacherScript: 
      'Now, what happens after the computer gets the information? Does it keep it secret? No! It shares it back with us! It gives things OUT! Everybody open your hands forward and say: OUT! Look at the Screen or Monitor! Does it show colorful cartoons and games to our eyes? Yes! It shows bright pictures OUT! And look at the Printer! Shhhhh-kachunk! It shoots our real drawings and homework OUT onto paper!',
    callToAction: 'Watch cartoons appear on the monitor, and print out your real drawing!',
    keyTakeaway: 'Output devices display, present, or print results back to the user.'
  },
  {
    id: 'robot-challenge',
    number: 5,
    title: 'The Ultimate Robot Challenge!',
    shortLabel: 'Robot Game',
    durationEst: '4:00 - 4:45',
    teacherScript: 
      'Are you ready for the ultimate Robot Challenge? Stand up on your feet, little robots! Here are the rules: If I say an INPUT device, tuck your hands close to your chest and say: IN! If I say an OUTPUT device, open your arms wide like an airplane and say: OUT! Robot Command number one: Computer MOUSE! YES! Spot on! Hands to chest, it pushes clicks IN! Robot Command number two: Computer SCREEN! Fantastic! Arms wide open, it shows pictures OUT! Super speed round: KEYBOARD! PRINTER! Give yourselves a huge round of applause! Take your seats, tech stars!',
    callToAction: 'Stand up and do the robot poses: Hands to chest for IN, Airplane arms for OUT!',
    keyTakeaway: 'Kinesthetic movement (TPR) cements input vs. output classification.'
  },
  {
    id: 'badge-ceremony',
    number: 6,
    title: 'Official Super Coder Badges',
    shortLabel: 'Super Coder Badge',
    durationEst: '4:45 - 5:00',
    teacherScript: 
      'Look at our screen! Every single one of you just passed the challenge and earned your official Super Coder Badge! Remember: We have Desktops, Laptops, and Tablets. We send things IN with our Keyboard and Mouse. We get things OUT from our Screen and Printer. You were absolutely brilliant today, boys and girls! Thank you for being such amazing little coders! And thank you, respected committee. That concludes our 5-minute demonstration.',
    callToAction: 'Claim your personalized certificate and Super Coder Badge!',
    keyTakeaway: 'Synthesizing core learning concepts and celebrating student agency.'
  }
];

export const COMPUTER_DEVICES: DeviceInfo[] = [
  {
    id: 'desktop',
    name: 'Cozy Desktop',
    category: 'both',
    actionWord: 'IN & OUT',
    gestureDescription: 'Resting on table with separate screen and keyboard',
    analogy: 'A cozy house that stays right on your desk',
    soundType: 'laptop',
    description: 'A powerful computer made of a tower, separate screen, and keyboard that stays cozy on your table.',
    catchphrase: 'I love staying cozy on your desk!'
  },
  {
    id: 'laptop',
    name: 'Magical Laptop',
    category: 'both',
    actionWord: 'IN & OUT',
    gestureDescription: 'Folding hands open and shut like a storybook',
    analogy: 'Folds open and shut like a magical book',
    soundType: 'laptop',
    description: 'An all-in-one computer that folds shut so you can carry it in your backpack to school or grandma’s house!',
    catchphrase: 'Fold me shut and take me on adventures!'
  },
  {
    id: 'tablet',
    name: 'Touchscreen Tablet',
    category: 'both',
    actionWord: 'IN & OUT',
    gestureDescription: 'Tap, tap, swipe with your fingertips',
    analogy: 'A glowing digital sketchbook for your fingers',
    soundType: 'tablet',
    description: 'A flat touch-screen computer you hold in your hands. Pure touch-screen magic for drawing and learning!',
    catchphrase: 'Tap, tap, swipe! Pure touch magic!'
  },
  {
    id: 'keyboard',
    name: 'Computer Keyboard',
    category: 'input',
    actionWord: 'IN',
    gestureDescription: 'Tuck hands to chest: Click-clack-clack!',
    analogy: 'Pushing letters H-E-L-L-O into the computer’s brain',
    soundType: 'keyboard',
    description: 'Full of buttons! When your little fingers type, you push words and numbers IN to the computer.',
    catchphrase: 'Click-clack-clack! Words go IN!'
  },
  {
    id: 'mouse',
    name: 'Computer Mouse',
    category: 'input',
    actionWord: 'IN',
    gestureDescription: 'Tuck hands to chest: Click, click!',
    analogy: 'A magic wand that sends your clicks and orders IN',
    soundType: 'mouse',
    description: 'Click, click! You hold it in your palm. When you click its buttons, you send orders and instructions IN.',
    catchphrase: 'Click, click! Orders go IN!'
  },
  {
    id: 'screen',
    name: 'Screen / Monitor',
    category: 'output',
    actionWord: 'OUT',
    gestureDescription: 'Open arms wide like an airplane!',
    analogy: 'A magical glowing window shining pictures OUT to our eyes',
    soundType: 'screen',
    description: 'Shows bright, colorful cartoons, games, and words so our eyes can see what the computer is thinking!',
    catchphrase: 'Bright pictures shine OUT to your eyes!'
  },
  {
    id: 'printer',
    name: 'Paper Printer',
    category: 'output',
    actionWord: 'OUT',
    gestureDescription: 'Open arms wide: Shhhhh-kachunk!',
    analogy: 'A paper slide shooting your real art OUT into the world',
    soundType: 'printer',
    description: 'Shhhhh-kachunk! It takes digital drawings and homework and shoots them OUT onto real paper!',
    catchphrase: 'Shhhhh-kachunk! Paper shoots OUT!'
  }
];

export const ROBOT_CHALLENGE_QUESTIONS: RobotChallengeQuestion[] = [
  {
    id: 'q1',
    deviceName: 'Computer MOUSE',
    correctAnswer: 'IN',
    promptQuote: 'Robot Command number one: Computer MOUSE!',
    hint: 'You click it with your fingers to send orders inside!',
    gestureHint: 'Tuck hands close to your chest and say: IN!',
    iconName: 'Mouse'
  },
  {
    id: 'q2',
    deviceName: 'Computer SCREEN',
    correctAnswer: 'OUT',
    promptQuote: 'Robot Command number two: Computer SCREEN!',
    hint: 'It shines colorful cartoons and games out to your eyes!',
    gestureHint: 'Open your arms wide like an airplane and say: OUT!',
    iconName: 'Tv'
  },
  {
    id: 'q3',
    deviceName: 'Computer KEYBOARD',
    correctAnswer: 'IN',
    promptQuote: 'Super speed round: KEYBOARD!',
    hint: 'Click-clack-clack! You type letters like H-E-L-L-O inside!',
    gestureHint: 'Tuck hands close to your chest and say: IN!',
    iconName: 'Keyboard',
    speedRound: true
  },
  {
    id: 'q4',
    deviceName: 'Paper PRINTER',
    correctAnswer: 'OUT',
    promptQuote: 'Next command: PRINTER!',
    hint: 'Shhhhh-kachunk! It shoots your real drawings out onto paper!',
    gestureHint: 'Open your arms wide like an airplane and say: OUT!',
    iconName: 'Printer',
    speedRound: true
  },
  {
    id: 'q5',
    deviceName: 'Audio SPEAKERS',
    correctAnswer: 'OUT',
    promptQuote: 'Bonus robot challenge: SPEAKERS / HEADPHONES!',
    hint: 'They play energetic music and Ms. Bushra’s voice out to your ears!',
    gestureHint: 'Open your arms wide like an airplane and say: OUT!',
    iconName: 'Volume2'
  },
  {
    id: 'q6',
    deviceName: 'Singing MICROPHONE',
    correctAnswer: 'IN',
    promptQuote: 'Bonus robot challenge: MICROPHONE!',
    hint: 'You speak or sing into it to send your voice inside the computer!',
    gestureHint: 'Tuck hands close to your chest and say: IN!',
    iconName: 'Mic'
  }
];

export const PEDAGOGICAL_FRAMEWORK = {
  lessonTitle: 'The Two Superpowers: Input & Output (CSTA 1A-CS-02)',
  targetGrade: 'Kindergarten to 2nd Grade (Ages 5-8)',
  duration: '5 Minutes Structured Demonstration',
  pedagogyMethod: 'Total Physical Response (TPR) + Concrete-Representational-Abstract (CRA)',
  objectives: [
    'Recognize 3 common computing devices (Desktop, Laptop, Tablet).',
    'Distinguish between computer Input (data in) and Output (data out) using the human nutrition analogy.',
    'Classify common hardware (Keyboard, Mouse, Screen, Printer) using active physical gestures.',
    'Build computational identity and enthusiasm through the Super Coder Badge.'
  ],
  committeeCheckpoints: [
    { time: '0:00 - 1:00', focus: 'Attention Hook & Audience Community (Auditory & Visual Clap Cues, Hand Raise)' },
    { time: '1:00 - 2:00', focus: 'Form Factor Discovery (Desktop, Laptop fold, Tablet touch-screen)' },
    { time: '2:00 - 3:15', focus: 'Conceptual Metaphor & Input Exploration (Hungry Food In -> Keyboard & Mouse)' },
    { time: '3:15 - 4:00', focus: 'Output Manifestation (Screen cartoons, Printer mechanical paper feed)' },
    { time: '4:00 - 4:45', focus: 'Formative Assessment via Kinesthetic TPR Game (Robot Challenge IN vs OUT)' },
    { time: '4:45 - 5:00', focus: 'Summative Synthesis & Super Coder Badge Conferral' }
  ]
};
