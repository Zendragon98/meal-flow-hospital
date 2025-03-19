
// Hospital list
export const HOSPITALS = [
  "ALEXANDRA HOSPITAL",
  "CHANGI GENERAL HOSPITAL",
  "INSTITUTE OF MENTAL HEALTH",
  "KHOO TECK PUAT HOSPITAL",
  "KK WOMEN'S AND CHILDREN'S HOSPITAL",
  "NATIONAL UNIVERSITY HOSPITAL",
  "NG TENG FONG GENERAL HOSPITAL & JURONG COMMUNITY HOSPITAL",
  "SENGKANG GENERAL HOSPITAL",
  "SINGAPORE GENERAL HOSPITAL",
  "TAN TOCK SENG HOSPITAL PTE LTD",
  "WOODLANDS HEALTH"
];

// Valid referral code
export const VALID_REFERRAL_CODE = "354ZAN";

// Calculate tomorrow's date in YYYY-MM-DD format
export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

// Default date (tomorrow)
export const DEFAULT_DATE = getTomorrowDate();

// Default hospital
export const DEFAULT_HOSPITAL = "SENGKANG GENERAL HOSPITAL";

// Get formatted date display
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Generate calendar days with random highlighted days
export const generateCalendarDays = (month: number, year: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const today = new Date();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Get days after today
  const futureDays = days.filter(day => {
    const checkDate = new Date(year, month, day);
    return checkDate > today;
  });
  
  // Randomly select 5 future days (or fewer if not enough future days)
  const randomFutureDays = futureDays.sort(() => Math.random() - 0.5).slice(0, 5);
  
  return { 
    daysInMonth,
    firstDayOfMonth,
    highlightedDays: randomFutureDays
  };
};

// Sample scheduled orders
export const SCHEDULED_ORDERS = [
  { date: "2025-04-02", hospital: "SENGKANG GENERAL HOSPITAL", meal: "Energy-Boosting Chicken Rice", time: "12:30 PM" },
  { date: "2025-04-05", hospital: "CHANGI GENERAL HOSPITAL", meal: "Chicken Rice (Black Pepper)", time: "1:15 PM" },
  { date: "2025-04-07", hospital: "NATIONAL UNIVERSITY HOSPITAL", meal: "60s Chicken Rice", time: "11:45 AM" },
  { date: "2025-04-12", hospital: "SINGAPORE GENERAL HOSPITAL", meal: "Energy-Boosting Chicken Rice", time: "2:00 PM" },
  { date: "2025-04-15", hospital: "KHOO TECK PUAT HOSPITAL", meal: "Chicken Rice (Black Pepper)", time: "12:15 PM" }
];
