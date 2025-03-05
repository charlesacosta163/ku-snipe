export const TIER_LIMITS = {
  scout: 1, // 1 course
  sharpshooter: 3, // 3 courses
  elite: 10, // 10 courses
} as const;

export const TIER_FEATURES = [
  {
    tierName: "scout",
    maxSnipedCourses: 1,
    messagingMethod: "Email notifications",
  },
  {
    tierName: "sharpshooter",
    maxSnipedCourses: 3,
    messagingMethod: "Email notifications",
  },
  {
    tierName: "elite",
    maxSnipedCourses: 10,
    messagingMethod: "Email notifications",
  },
];
