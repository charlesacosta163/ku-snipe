export const TIER_LIMITS = {
  scout: 1, // 1 course
  sharpshooter: 3, // 3 courses
  elite: 10, // 10 courses
} as const;

export const TIER_FEATURES = [
  {
    tierName: "scout",
    maxSnipedCourses: 2,
    messagingMethod: "Discord notifications",
  },
  {
    tierName: "sharpshooter",
    maxSnipedCourses: 5,
    messagingMethod: "Discord notifications",
  }
];

export const ALL_TERMS = [
  { id: 1, termValue: 'spring25', termName: 'Spring 2025' },
  { id: 2, termValue: 'summer125', termName: 'Summer 1 2025' },
  { id: 3, termValue: 'summer225', termName: 'Summer 2 2025' },
  { id: 4, termValue: 'fall25', termName: 'Fall 2025' },
  { id: 5, termValue: 'winter25', termName: 'Winter 2025' },
  { id: 6, termValue: 'spring26', termName: 'Spring 2026' },
  // { id: 7, termValue: 'summer126', termName: 'Summer 1 2026' },
  // { id: 8, termValue: 'summer226', termName: 'Summer 2 2026' },
  // { id: 9, termValue: 'fall26', termName: 'Fall 2026' },
  // { id: 10, termValue: 'winter26', termName: 'Winter 2026' },
  
]

export const ALL_TERMS_NEW = [
  { id: 1, termValue: '2025SP', termName: 'Spring 2025' },
  { id: 2, termValue: '2025FA', termName: 'Fall 2025' },
  { id: 3, termValue: '2026SP', termName: 'Spring 2026' },
  { id: 4, termValue: '2026FA', termName: 'Fall 2026' },
]

export const ALL_LOCATIONS = [
  { id: 0, locationValue: 'KUU', locationName: 'KEAN UNIVERSITY UNION' },
  { id: 1, locationValue: 'ONL', locationName: 'ONLINE' },
  { id: 2, locationValue: 'BROOK', locationName: 'KEAN AT BROOKDALE' },
  { id: 3, locationValue: 'OCC', locationName: 'KEAN OCEAN' },
  { id: 4, locationValue: 'SKY', locationName: 'KEAN SKYLANDS' },
]

export const ALL_COURSES = [
  { id: 1, code: 'ACCT', name: 'ACCOUNTING' },
  { id: 2, code: 'AD', name: 'ADVERTISING' },
  { id: 3, code: 'IDAFS', name: 'AFRICANA STUDIES' },
  { id: 4, code: 'ASL', name: 'AMERICAN SIGN LANGUAGE' },
  { id: 5, code: 'ANTH', name: 'ANTHROPOLOGY' },
  { id: 6, code: 'ARCH', name: 'ARCHITECTURE' },
  { id: 7, code: 'AH', name: 'ART HISTORY' },
  { id: 8, code: 'AS', name: 'ASIAN STUDIES' },
  { id: 9, code: 'ASTR', name: 'ASTRONOMY (ASTR)' },
  { id: 10, code: 'AT', name: 'ATHLETIC TRAINING' },
  { id: 11, code: 'ASD', name: 'AUTISM SPECTRUM DISORDERS' },
  { id: 12, code: 'BCHM', name: 'BIOCHEMISTRY' },
  { id: 13, code: 'BIO', name: 'BIOLOGY' },
  { id: 14, code: 'BLAW', name: 'BUSINESS LAW' },
  { id: 15, code: 'CHEM', name: 'CHEMISTRY' },
  { id: 16, code: 'CHIN', name: 'CHINESE' },
  { id: 17, code: 'COMM', name: 'COMMUNICATION' },
  { id: 18, code: 'CS', name: 'COMMUNICATION SCI' },
  { id: 19, code: 'CDD', name: 'COMMUNICTN DISORDERS/DEAFNESS' },
  { id: 20, code: 'CPS', name: 'COMPUTER SCIENCE' },
  { id: 21, code: 'CED', name: 'COUNSELOR EDUCATION' },
  { id: 22, code: 'CJ', name: 'CRIMINAL JUSTICE' },
  { id: 23, code: 'DANC', name: 'DANCE' },
  { id: 24, code: 'DSN', name: 'DESIGN' },
  { id: 25, code: 'DPT', name: 'DOCTOR OF PHYSICAL THERAPY' },
  { id: 26, code: 'PSYD', name: 'DOCTOR OF PSYCHOLOGY' },
  { id: 27, code: 'EC', name: 'EARLY CHILDHOOD EDUC' },
  { id: 28, code: 'ES', name: 'EARTH SCIENCE' },
  { id: 29, code: 'ECON', name: 'ECONOMICS' },
  { id: 30, code: 'EDUC', name: 'EDUCATION' },
  { id: 31, code: 'EDL', name: 'EDUCATIONAL LEADERSHIP' },
  { id: 32, code: 'EMSE', name: 'ELEMENTARY,MIDDLE & SECONDARY' },
  { id: 33, code: 'ESL', name: 'ENG AS A SECOND LANG' },
  { id: 34, code: 'ENG', name: 'ENGLISH' },
  { id: 35, code: 'IDEJ', name: 'ENVIRONMENTAL JUSTICE' },
  { id: 36, code: 'ENV', name: 'ENVIRONMENTAL SCIENCE' },
  { id: 37, code: 'EXSC', name: 'EXERCISE SCIENCE' },
  { id: 38, code: 'FIN', name: 'FINANCE' },
  { id: 39, code: 'FA', name: 'FINE ARTS' },
  { id: 40, code: 'FL', name: 'FOREIGN LANGUAGE' },
  { id: 41, code: 'FSC', name: 'FORENSIC SCIENCE' },
  { id: 42, code: 'FREN', name: 'FRENCH' },
  { id: 43, code: 'GE', name: 'GENERAL EDUCATION' },
  { id: 44, code: 'GEOG', name: 'GEOGRAPHY' },
  { id: 45, code: 'GEOL', name: 'GEOLOGY' },
  { id: 46, code: 'GERM', name: 'GERMAN' },
  { id: 47, code: 'GERO', name: 'GERONTOLOGY' },
  { id: 48, code: 'GBUS', name: 'GLOBAL BUSINESS' },
  { id: 49, code: 'GLOB', name: 'GLOBAL EDUCATION' },
  { id: 50, code: 'GMBA', name: 'GLOBAL MBA' },
  { id: 51, code: 'GS', name: 'GLOBAL STUDIES' },
  { id: 52, code: 'GD', name: 'GRAPHIC DESIGN' },
  { id: 53, code: 'HPE', name: 'HEALTH & PHYSICAL EDUCATION' },
  { id: 54, code: 'HEBR', name: 'HEBREW' },
  { id: 55, code: 'HIND', name: 'HINDI' },
  { id: 56, code: 'HIST', name: 'HISTORY' },
  { id: 57, code: 'IND', name: 'INDUSTRIAL DESIGN' },
  { id: 58, code: 'ID', name: 'INTERDISCIPLINARY' },
  { id: 59, code: 'INTD', name: 'INTERIOR DESIGN' },
  { id: 60, code: 'ITAL', name: 'ITALIAN' },
  { id: 61, code: 'BLA', name: 'LIBERAL ARTS' },
  { id: 62, code: 'MGS', name: 'MANAGEMENT' },
  { id: 63, code: 'MKT', name: 'MARKETING' },
  { id: 64, code: 'MAHG', name: 'MASTER HOLOCAUST AND GENOCIDE' },
  { id: 65, code: 'MATH', name: 'MATHEMATICS' },
  { id: 66, code: 'METR', name: 'METEOROLOGY' },
  { id: 67, code: 'MUS', name: 'MUSIC' },
  { id: 68, code: 'NURS', name: 'NURSING' },
  { id: 69, code: 'OT', name: 'OCCUPATIONAL THERAPY' },
  { id: 70, code: 'OCEN', name: 'OCEANOGRAPHY' },
  { id: 71, code: 'PHIL', name: 'PHILOSOPHY' },
  { id: 72, code: 'PED', name: 'PHYSICAL EDUCATION' },
  { id: 73, code: 'PAS', name: 'PHYSICIAN ASSISTANT STUDIES' },
  { id: 74, code: 'PHYS', name: 'PHYSICS' },
  { id: 75, code: 'PS', name: 'POLITICAL SCIENCE' },
  { id: 76, code: 'PORT', name: 'PORTUGUESE' },
  { id: 77, code: 'PSRT', name: 'PSYCHIATRIC REHABILT' },
  { id: 78, code: 'PSY', name: 'PSYCHOLOGY' },
  { id: 79, code: 'PA', name: 'PUBLIC ADMINISTRATION' },
  { id: 80, code: 'HLTH', name: 'PUBLIC HEALTH' },
  { id: 81, code: 'REC', name: 'RECREATION' },
  { id: 82, code: 'REL', name: 'RELIGION' },
  { id: 83, code: 'STME', name: 'SCIENCE TECHNOLOGY & MATH ED' },
  { id: 84, code: 'SW', name: 'SOCIAL WORK' },
  { id: 85, code: 'SOC', name: 'SOCIOLOGY' },
  { id: 86, code: 'SPAN', name: 'SPANISH' },
  { id: 87, code: 'SPED', name: 'SPECIAL EDUCATION' },
  { id: 88, code: 'SUST', name: 'SUSTAINABILITY SCIENCE' },
  { id: 89, code: 'TESL', name: 'TEACHING ENG 2ND LANGUAGE' },
  { id: 90, code: 'TECH', name: 'TECHNOLOGY' },
  { id: 91, code: 'THE', name: 'THEATRE' },
  { id: 92, code: 'TR', name: 'THERAPEUTIC RECREATION' },
  { id: 93, code: 'URDU', name: 'URDU LANGUAGE' },
  { id: 94, code: 'IDWGS', name: 'WOMEN AND GENDER STUDIES' },
  { id: 95, code: 'YOGA', name: 'YOGA' }
]

// Board Colors: Pastel Theme
// Task Color: Lighter version of the board color
export const ALL_BOARD_COLORS = [
  { id: 0, name: 'Default', color: '#FFFFFF', taskColor: '#f7f7f7', textColor: '#000000' }, // Default
  { id: 1, name: 'Red', color: '#FFB6C1', taskColor: '#f7d5da', textColor: '#000000' }, // Red
  { id: 2, name: 'Green', color: '#98FB98', taskColor: '#d4edda', textColor: '#000000' }, // Green
  { id: 3, name: 'Blue', color: '#B7B1F2', taskColor: '#ccc7ff', textColor: '#000000' }, // Blue
  { id: 4, name: 'Yellow', color: '#FBF3B9', taskColor: '#fcfce5', textColor: '#000000' }, // Yellow
  { id: 5, name: 'Purple', color: '#DDA0DD', taskColor: '#f2bbf2', textColor: '#000000' }, // Purple
  { id: 6, name: 'Orange', color: '#FFDCCC', taskColor: '#ffe5d1', textColor: '#000000' }, // Orange
  { id: 7, name: 'Pink', color: '#FDB7EA', taskColor: '#fcd4f1', textColor: '#000000' }, // Pink
  { id: 8, name: 'Gray', color: '#D3D3D3', taskColor: '#ebebeb', textColor: '#000000' }, // Gray
]

export const ALL_BOARD_PRIORITIES = [
  { id: 1, name: 'High', value: 1, color: "#FF8A8A" },
  { id: 2, name: 'Medium', value: 2 , color: "#FADA7A"},
  { id: 3, name: 'Low', value: 3 , color: "#295F98"},
]

export const ALL_VERSIONS = [
  { id: 1, status: 'Beta', name: '0.1', tag: "Altrock", fixes: ["Initial release", "Revised the UI/UX for all pages", "New Domain Name (KU WATCH): https://kuwatch.org"]},
  { id: 2, status: 'Beta', name: '0.2', tag: "Altrock", fixes: [
    {feature: "Kanban Boards (Free access during Beta)", fixes: ["Added Kanban Boards", "Added Board Colors", "Added Board Priorities", "Added Board Actions"]}, "Modified the Mobile Navigation Dropdown", "Added Version Logs"
  ]},
  { id: 3, status: 'Beta', name: '0.3', tag: "Altrock", fixes: ["FIXED Discord Account Linking Issue", "Minor Bug Fixes", "IMPORTANT NOTE: If a course HAS A WAITLIST, make sure you're already on it — otherwise, you WON\'T be able to register even if a seat becomes available."]}
,]
