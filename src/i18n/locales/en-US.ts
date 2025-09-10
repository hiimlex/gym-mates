import { User } from "react-native-feather";

export default {
  login: {
    title: "Login",
    subtitle: "Welcome! please fill your data to continue.",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    link: "Don't have an account?",
    signUp: "Sign Up",
  },
  signup: {
    title: "Sign Up",
    subtitle: "Create your account to start your journey.",
    fields: {
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
    },
    sign: "Join Now",
    link: "Already have an account?",
    login: "Login",
  },
  setupHealth: {
    title: "Extra",
    subtitle: "Now let's setup your health data.",
    fields: {
      weight: "Weight",
      height: "Height",
      body_fat: "Body Fat",
    },
    save: "save",
    skip: "Skip",
  },
  setupAvatar: {
    title: "Avatar",
    subtitle: "Upload a profile picture.",
    save: "Save",
    skip: "Skip",
  },
  home: {
    title: "Hello {{name}}",
    subtitle: "Let's do some workout?",
    noCrewsSubtitle: "It seems you've not joined any crew yet.",
    noFollowingActivities: "No activities from your mates yet.",
    followingActivities: "Following activities",
    highlight: {
      new: "new",
      coins: "coins",
    },
    noCrews: {
      start: "Start a",
      oneForEarn: "one for earn",
    },
    stats: {
      title: "Stats",
      myStreak: "My Streak",
      lastSession: "Last Session",
      mins: "mins",
      days: "days",
      noSession: "No session yet",
    },
    menu: {
      title: "What you gonna do today ?",
      addWorkout: "Add Workout",
      createCrew: "Create Crew",
      joinCrew: "Join Crew",
    },
  },
  profile: {
    followers: "Followers",
    following: "Following",
    crews: "Crews",
    streak: "Streak",
    selectATitle: "Select a title",
    noTitle: "No Title",
    saving: "Saving...",
    donate: "Feel free to donate",
    personal: {
      character: "Character",
      title: "Personal",
      journey: "Journey",
      inventory: "Inventory",
      mates: "Mates",
    },
    settings: {
      edit: "Edit Profile",
      title: "Settings",
      settings: "Settings",
      logout: "Logout",
      help: "Help & Support",
    },
  },
  crews: {
    title: "Follow your crews activities!",
    filters: {
      mine: "Mine",
      favorites: "Favorites",
    },
    empty: "No crews found.",
  },
  crewView: {
    todayWorkouts: "Paid today",
    noTodayWorkouts: "No one shared their workout today. Be the first!",
    activities: "Activities",
    lastActivities: "Last Activities",
    hasPaid: "{{name}} has paid.",
    noActivities: "No activities yet.",
    todayWorkout: "Today {{-time}}",
    rank: "Rank",
    calendar: "Calendar",
    youPaid: "You paid",
    loadingRank: "Loading rank...",
    noRank: "Not enough members or data to show the rank.",
  },
  crewSettings: {
    members: "Members",
    visibility: "Visibility",
    publicDescription: "Anyone with the code can join.",
    privateDescription: "Select who can join.",
    rules: "Rules",
    streaks: "Streaks",
    admin: "Admin",
    loseStreakAt: "Lose streak at fail for",
    owner: "Owner",
    rulesType: {
      gym_focused: "Gym Focused",
      pay_on_past: "Pay on Past",
      pay_without_picture: "Pay without Picture",
      show_members_rank: "Show Members Rank",
      free_weekends: "Free Weekends",
    },
    streakType: {
      weekends: "Weekends streak",
      weekly: "Weekly streak",
      monthly: "Monthly streak",
    },
    save: "Save",
    quit: "Quit Crew",
    edit: "Edit Crew",
    editCrew: {
      title: "Edit Crew",
    },
    member: {
      joined_at: "Joined at {{-date}}",
      you: "You",
      all: "All Members",
    },
    delete: "Delete Crew",
  },
  addWorkout: {
    fields: {
      title: "Title",
      picture: "Picture",
      date: "Day and time",
      duration: "Duration",
      type: "Workout type",
    },
    paidText: "Ow! Good job you earned \n +{{coins}} coin{{plural}}",
    buttons: {
      next: "Next",
      paid: "Paid",
      close: "Close",
    },
  },
  joinCrew: {
    search: "Insert crew name or code to search.",
    join: "Join",
    request: "Request to join",
    alreadyJoined: "You are already a member of this crew.",
  },
  journey: {
    title: "See your activities",
    events: {
      start: "Joined the app.",
      paid: "Paid",
      buy: `Got "{{-itemName}}"`,
      add: {
        healthy: "Added a healthy info.",
      },
      bodyFat: "BF {{bf}}%",
      join: 'Joined "{{name}}" crew.',
      follow: 'Started following "{{name}}".',
      loseStreak: "Lost the streak of {{days}} day(s).",
      completeMission: 'Completed the mission "{{name}}".',
    },
    filters: {
      recent: "Recent",
      old: "Old",
    },
  },
  userView: {
    buttons: {
      accept: "Accept",
      reject: "Reject",
    },
    tabs: {
      activities: "Activities",
      achievements: "Achievements",
    },
    noWorkouts: "No workouts yet.",
    noAchievements: "No achievements yet.",
  },
  editProfile: {
    account: "Profile Account",
    healthy: "Healthy Info",
    fields: {
      name: "Name",
      email: "Email",
      oldPassword: "Old Password",
      newPassword: "New Password",
      weight: "Weight",
      height: "Height",
      body_fat: "Body Fat",
    },
    save: "Save",
  },
  shop: {
    title: "Shopping",
    filters: {
      all: "All",
      cost: "Cost",
      locked: "Locked",
      list: "List view",
      grid: "Grid view",
    },
    add: "Add to bag",
    remove: "Remove from bag",
    cart: {
      title: "Bag items",
      empty: "Your bag is empty.",
      total: "Total",
      checkout: "Checkout",
      notEnoughCoins: "You don't have enough coins.",
      yourCoins: "Your coins",
      result: "Result",
      yourCoinsAfterPurchase: "Your coins after purchase",
    },
    empty: "No items found.",
    hint: "Hint:"
  },
  inventory: {
    title: "Inventory",
    empty: "No items found.",
    filters: {
      cost: "Cost",
      category: "Category",
      achievements: "Achievements",
      badges: "Badges",
    },
  },
  userFollows: {
    title: "Your GymMates",
    noFollowers: "You don't have any followers yet.",
    noFollowing: "You are not following anyone yet.",
    followers: "Followers",
    following: "Following",
    followBack: "Follow Back",
  },
  createCrew: {
    infoStep: {
      name: "First, let's name your crew",
      namePlaceholder: "Insert your crew name",
      code: "Create a friendly code for your mates to join.",
      codePlaceholder: "Insert your crew code",
      banner: "Select an image for your banner",
    },
    goNext: "Next",
    finish: "Finish",
  },
  crewMembers: {
    title: "Crew Members",
    requests: "Requests.",
    noRequests: "No requests at the moment.",
    accept: "Accept",
    wantsToJoin: "{{name}} wants to join.",
  },
  workoutViewer: {
    title: "Workout Preview",
    tip: "Swipe left or right to see more workouts!",
  },
  itemViewer: {
    title: "Item Preview",
  },
  leaveCrew: {
    title: "Leave Crew",
    body: "By quitting this crew, you are not be able to see any data from this crew anymore.\n\nAre you sure?",
    buttons: {
      yes: "Yes, leave",
      no: "No, cancel",
    },
  },
  help: {
    title: "Hello {{name}}.",
    body: "We are here to help you. If you want to report a problem, have any questions or just want to say hi, contact us.",
    future:
      "We are working on adding more features to help you have the best experience while using GymMates, stay tuned on beta updates!'",
    faq: "Frequently Asked Questions",
    contact: "Contact Support",
    faqList: {
      rulesSystem: "What are the crew rules?",
      streakSystem: "How does the streak system work?",
      coinSystem: "How does the coin system work?",
    },
    devNote: "Dev. Note",
  },
  coinSystem: {
    title: "Coin System",
    about: "Every time the an user do a workout there's a coin for that.",
    missions:
      "Missions are tasks or hidden tasks that the user can complete to earn more coins.",
    earn: "To earn more coins the user will have to reach streaks or complete missions.",
    streaks:
      "Streaks are a series of consecutive days with workouts and at the streak point the user will get a bounty of coins.",
    dailyStreak:
      "\u2022 For every ten days of daily streak the user will earn +1 extra coins.",
    weekendStreak:
      "\u2022 For every weekend day, the user will get a bounty of +1 coins.",
    weekStreak:
      "\u2022 For every week(7 days in a row), the user will get a bounty of +2 coins.",
    monthStreak:
      "\u2022 For every month(30 days in a row), the user will get a bounty of +10 coins.",
    bounties:
      "The bounties are unique, and validated for all crew streaks, the bounty count resets every time the user receive it.",
    attention:
      "The user will have a receipt for each earned coin!\nThe user will only get one bounty per day!",
    haveFun: "Have fun collecting coins and spending them in the shop!",
  },
  crewRulesInfo: {
    about:
      "The crew rules are a set of guidelines that members must follow when sharing workouts in a crew.",
    gymFocused:
      "\u2022 Gym Focused: All workouts shared in the crew must be gym-focused type.",
    freeWeekends:
      "\u2022 Free Weekends: On weekends (Saturday and Sunday), members are not required to pay for missed workouts. This allows for flexibility and rest during the weekend.",

    payOnPast:
      "\u2022 Pay on Past: Members are allowed to pay for workouts that were missed or forgotten in the past. At least 2 days ago.",
    payWithoutPicture:
      "\u2022 Pay without Picture: Members must include a picture with their workout submission. But if they forget, they can still submit their workout without a picture.",
  },
  streakSystem: {
    title: "Streak System",
  },
  crewRules: {
    title: "Crew Rules",
  },
  // Generic
  weekDays: {
    long: {
      sun: "Sunday",
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
    },
    short: {
      sun: "Sun",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
    },
  },
  months: {
    long: {
      jan: "January",
      feb: "February",
      mar: "March",
      apr: "April",
      may: "May",
      jun: "June",
      jul: "July",
      aug: "August",
      sep: "September",
      oct: "October",
      nov: "November",
      dec: "December",
    },
  },
  bottomNav: {
    home: "Home",
    crews: "Crews",
  },
  links: {
    profile: "Profile",
    crews: "Crews",
    crew: "Crew",
    user: "User",
    crewSettings: "Crew Settings",
    addWorkout: "Add Workout",
    joinCrew: "Join Crew",
    createCrew: "Create Crew",
    shareInCrew: "Share in Crews",
    editCrew: "Edit Crew",
    userJourney: "Journey",
    editProfile: "Edit Profile",
    shopCart: "Bag Items",
    userFollows: "Mates",
    help: "Help & Support",
    userCharacter: "Character",
  },
  units: {
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
  },
  mediaSelect: {
    text: "Tap to select media.",
    hasPreview: "Tap to select another media.",
    mediaPreview: "Media Preview",
  },
  crewStreaks: {
    weekends: "Weekends",
    weekly: "Weekly",
    monthly: "Monthly",
    daily: "Daily",
    base: "Base",
  },
  crewVisibility: {
    public: "Public",
    private: "Private",
  },
  items: {
    title: {
      noTitle: "No Title",
    },
  },
  workoutTypes: {
    gym: "Gym",
    aerobics: "Aerobics",
    running: "Running",
    cycling: "Cycling",
    cross_fit: "Cross Fit",
    cardio: "Cardio",
    yoga: "Yoga",
    other: "Other",
    swimming: "Swimming",
  },
  itemCategoryTypes: {
    title: "Title",
    achievement: "Achievement",
    figure: "Figure",
    badge: "Badge",
    skin: "Skin",
    avatar: "Avatar",
  },
  itemSex: {
    male: "Male",
    female: "Female",
  },
  itemPiece: {
    hair: "Hair",
    top: "Top",
    bottom: "Bottom",
    shoes: "Shoes",
    accessory: "Accessory",
  },
  errors: {
    FETCH_CURRENT_USER: "Please log in again.",
    // General
    UNAUTHORIZED: "Please log in again.",
    FORBIDDEN: "You don't have permission for it.",
    // Auth
    INVALID_CREDENTIALS: "Invalid credentials.",
    // Crew
    CREW_NOT_FOUND: "Crew not found.",
    ALREADY_MEMBER: "Already a member of this crew.",
    ALREADY_IN_WHITELIST: "Already in the whitelist of this crew.",
    INVALID_DATE: "Invalid date.",
    FILE_NOT_PROVIDED: "File not provided.",
    CANNOT_LEAVE_CREW_OWNER: "Owner cannot leave crew .",
    // Workout
    INVALID_WORKOUT_DATE: "Invalid workout date.",
    WORKOUT_DATE_IN_FUTURE: "Workout date cannot be in future.",
    WORKOUT_DATE_TOO_OLD: "Workout date is too old.",
    CREW_RULES_VIOLATION: "Workout violates crew rules.",
    WORKOUT_DATE_OLDER_THAN_CREW: "Workout date is older than crew.",
    GYM_FOCUSED_RULE_VIOLATION:
      "Crew {{crews}} workouts type must be gym focused.",
    PAY_ON_PAST_RULE_VIOLATION:
      "Crew {{crews}} workouts doesn't allow pay on past.",
    PAID_WITHOUT_PICTURE_RULE_VIOLATION:
      "Crew {{crews}} workouts must have a picture.",
    // User
    USER_NOT_FOUND: "User not found.",
    USER_NOT_A_MEMBER: "User is not a member.",
    USER_NOT_IN_WHITELIST: "User is not in whitelist.",
    ALREADY_FOLLOWING: "Already following this user.",
    TITLE_NOT_FOUND: "Title not found.",
    USER_DOES_NOT_OWN_ITEM: "User does not own this item.",

    // Journey
    JOURNEY_NOT_FOUND: "Journey not found.",
    // Shop
    CART_IS_EMPTY: "Cart is empty.",
    SOME_ITEMS_ALREADY_OWNED: "Some items are already owned.",
    USER_NOT_MET_ITEMS_REQUIREMENTS:
      "User does not meet items requirements to buy.",
    USER_DO_NOT_HAVE_ENOUGH_COINS: "User does not have enough coins.",
  },
  fieldErrors: {
    required: "Field is required.",
    maxLength: "Field is too long. Max length is {{value}}}.",
    minLength: "Field is too short. Min length is {{value}}.",
    pattern: "Field is invalid.",
    max: "Field must be less than or equal to {{value}}.",
    min: "Field must be greater than or equal to {{value}}.",
    validate: "Field is invalid.",
    passwordMatch: "Passwords do not match.",
  },
  achievementRarity: {
    common: "Common",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
  },
};
