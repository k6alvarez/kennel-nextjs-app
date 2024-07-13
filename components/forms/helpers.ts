export const statesArray = [
  {
    value: "",
    label: "Select State",
  },
  {
    value: "AL",
    label: "Alabama",
  },
  {
    value: "AK",
    label: "Alaska",
  },
  {
    value: "AZ",
    label: "Arizona",
  },
  {
    value: "AR",
    label: "Arkansas",
  },
  {
    value: "CA",
    label: "California",
  },
  {
    value: "CO",
    label: "Colorado",
  },
  {
    value: "CT",
    label: "Connecticut",
  },
  {
    value: "DE",
    label: "Delaware",
  },
  {
    value: "DC",
    label: "District Of Columbia",
  },
  {
    value: "FL",
    label: "Florida",
  },
  {
    value: "GA",
    label: "Georgia",
  },
  {
    value: "HI",
    label: "Hawaii",
  },
  {
    value: "ID",
    label: "Idaho",
  },
  {
    value: "IL",
    label: "Illinois",
  },
  {
    value: "IN",
    label: "Indiana",
  },
  {
    value: "IA",
    label: "Iowa",
  },
  {
    value: "KS",
    label: "Kansas",
  },
  {
    value: "KY",
    label: "Kentucky",
  },
  {
    value: "LA",
    label: "Louisiana",
  },
  {
    value: "ME",
    label: "Maine",
  },
  {
    value: "MD",
    label: "Maryland",
  },
  {
    value: "MA",
    label: "Massachusetts",
  },
  {
    value: "MI",
    label: "Michigan",
  },
  {
    value: "MN",
    label: "Minnesota",
  },
  {
    value: "MS",
    label: "Mississippi",
  },
  {
    value: "MO",
    label: "Missouri",
  },
  {
    value: "MT",
    label: "Montana",
  },
  {
    value: "NE",
    label: "Nebraska",
  },
  {
    value: "NV",
    label: "Nevada",
  },
  {
    value: "NH",
    label: "New Hampshire",
  },
  {
    value: "NJ",
    label: "New Jersey",
  },
  {
    value: "NM",
    label: "New Mexico",
  },
  {
    value: "NY",
    label: "New York",
  },
  {
    value: "NC",
    label: "North Carolina",
  },
  {
    value: "ND",
    label: "North Dakota",
  },
  {
    value: "OH",
    label: "Ohio",
  },
  {
    value: "OK",
    label: "Oklahoma",
  },
  {
    value: "OR",
    label: "Oregon",
  },
  {
    value: "PA",
    label: "Pennsylvania",
  },
  {
    value: "RI",
    label: "Rhode Island",
  },
  {
    value: "SC",
    label: "South Carolina",
  },
  {
    value: "SD",
    label: "South Dakota",
  },
  {
    value: "TN",
    label: "Tennessee",
  },
  {
    value: "TX",
    label: "Texas",
  },
  {
    value: "UT",
    label: "Utah",
  },
  {
    value: "VT",
    label: "Vermont",
  },
  {
    value: "VA",
    label: "Virginia",
  },
  {
    value: "WA",
    label: "Washington",
  },
  {
    value: "WV",
    label: "West Virginia",
  },
  {
    value: "WI",
    label: "Wisconsin",
  },
  {
    value: "WY",
    label: "Wyoming",
  },
];

export const INITIAL_QUESTIONNAIRE_USER_DETAILS = [
  {
    name: "email",
    value: "",
    error: null,
    type: "text",
    inputMode: "email",
    label: "Email",
    disabled: false,
    required: false,
    readonly: false,
  },
  {
    name: "name",
    value: "",
    error: null,
    type: "text",
    label: "First Name",
    required: false,
  },
  {
    name: "lastName",
    value: "",
    error: null,
    type: "text",
    label: "Last Name",
    required: false,
  },
  {
    name: "address",
    value: "",
    error: null,
    type: "text",
    label: "Address",
    required: false,
  },
  {
    name: "unit",
    value: "",
    error: null,
    type: "text",
    label: "Unit",
  },
  {
    name: "city",
    value: "",
    error: null,
    type: "text",
    label: "City",
    required: false,
  },
  {
    name: "state",
    value: "",
    error: null,
    type: "select",
    label: "State",
    required: false,
    options: statesArray,
  },
  {
    name: "zip",
    value: "",
    error: null,
    type: "text",
    label: "Zip",
    required: false,
  },
  {
    name: "phone",
    value: "",
    error: null,
    type: "text",
    inputMode: "numeric",
    minLength: 10,
    maxLength: 16,
    label: "Phone",
    required: false,
    hint: `Format: 123-456-7890`,
  },
];

export const INITIAL_QUESTIONNAIRE_PREVIOUS_TRAINING = [
  {
    name: "ownedDogBefore",
    value: "",
    error: null,
    type: "radio",
    label: "Have you ever owned a dog before?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "trainedDogBefore",
    value: "",
    error: null,
    type: "radio",
    label: "Have you ever trained a dog before?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "interestInTraining",
    value: "",
    error: null,
    type: "radio",
    label:
      "Are you interested in training your dog and willing to make a commitment to train your dog?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "trainingGoals",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "What do you want to get most out of training?",
    required: false,
  },
  {
    name: "previousTraining",
    value: "",
    error: null,
    type: "radio",
    label: "Has your present dog had any previous training?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "previousTrainingLocation",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "If yes, where did you train him/her?",
    required: false,
  },
  {
    name: "leashResponse",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "How does your dog respond on a leash?",
    required: false,
  },
  {
    name: "leashBehaviors",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label:
      "Does he/she tug and pull? Does he/she chew on the leash? Does he/she trap the leash with his/her paws and attempt to take control?",
    required: false,
  },
  {
    name: "recallCommand",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog come when called?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "recallPercentage",
    value: "",
    error: null,
    type: "text",
    inputMode: "numeric",
    label: "If yes, what % of the time?",
    required: false,
  },
  {
    name: "comeInsideOutside",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog come both inside the house and outside?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "correctedBehavior",
    value: "",
    error: null,
    type: "radio",
    label: "Have you ever corrected your dog's behavior?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "correctedBehaviorDetails",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "If yes, what behavior and how have you corrected?",
    required: false,
  },
  {
    name: "physicalPunishment",
    value: "",
    error: null,
    type: "radio",
    label:
      "Have you ever hit your dog with your hand or an object to correct his/her behavior?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "carRideBehavior",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label:
      "How does your dog respond when going for a car ride? Does he/she get nervous, bark, jump, or get ill?",
    required: false,
  },
  {
    name: "obedienceWords",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label:
      "Have you taught your dog any obedience words, such as sit, stay, heel, come, down, or stand? What words have you taught your dog?",
    required: false,
  },
  {
    name: "tricksTaught",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label:
      "Have you taught your dog any tricks, such as shake, rollover, and play dead, etc?",
    required: false,
  },
  {
    name: "demandingAttention",
    value: "",
    error: null,
    type: "radio",
    label:
      "Is your dog playful and generally demanding of attention? That is, does he/she nudge you for pets or shove toys at you for play?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "reasonForOwning",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "What is your reason for owning a dog?",
    required: false,
  },
  {
    name: "additionalInfo",
    value: "",
    error: null,
    type: "textarea",
    label:
      "Please provide any additional important information that was not addressed in the above questionnaire.",
    required: false,
  },
];

export const INITIAL_QUESTIONNAIRE_PET_FAMILY_HISTORY = [
  {
    name: "adultsInHome",
    value: "",
    error: null,
    type: "text",
    inputMode: "numeric",
    label: "How many adults live in your home?",
    required: false,
  },
  {
    name: "childrenInHome",
    value: "",
    error: null,
    type: "select",
    label: "Do you have children in your home?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
      {
        label: "Occasionally",
        value: "Occasionally",
      },
    ],
  },
  {
    name: "childrenAges",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "If so, what are their ages?",
    required: false,
  },
  {
    name: "referredBy",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "How were you referred to our services?",
    required: false,
  },
  {
    name: "petName",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "What is your pet's name?",
    required: false,
  },
  {
    name: "petBreed",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "What breed is your pet?",
    required: false,
  },
  {
    name: "petAgeWhenAcquired",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "How old was your pet when you acquired him/her?",
    required: false,
  },
  {
    name: "petAgeNow",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "How old is your pet now?",
    required: false,
  },
  {
    name: "whereDidYouGetYourDog",
    value: "",
    error: null,
    type: "radio",
    label: "Where did you get your dog?",
    required: false,
    options: [
      {
        label: "Professional breeder",
        value: "Professional breeder",
      },
      {
        label: "Back-yard breeder",
        value: "Back-yard breeder",
      },
      {
        label: "Pet store",
        value: "Pet store",
      },
      {
        label: "Rescue organization",
        value: "Rescue organization",
      },
      {
        label: "Friend or family member",
        value: "Friend or family member",
      },
      {
        label: "Ad in the paper",
        value: "Ad in the paper",
      },
      {
        label: "Other (please explain on next line)",
        value: "Other (please explain on next line)",
      },
    ],
  },
  {
    name: "whereDidYouGetYourDogOther",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "Please tell us where you got your dog.",
  },
  {
    name: "metAndInteractedWithParents",
    value: "",
    error: null,
    type: "radio",
    label: "Did you meet and interact with your dog's mother and father?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "reasonForNotMeetingParents",
    value: "",
    error: null,
    type: "text",
    label: "If no, why?",
  },
  {
    name: "wereParentsFriendly",
    value: "",
    error: null,
    type: "text",
    label: "If yes, were they both friendly?",
  },
];

export const INITIAL_QUESTIONNAIRE_PET_HEALTH = [
  {
    name: "hipsCertified",
    value: "",
    error: null,
    type: "radio",
    label: "Were the hips of the dam and sire OFA certified?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
      {
        label: "I don't know",
        value: "I don't know",
      },
    ],
  },
  {
    name: "dogHousebroken",
    value: "",
    error: null,
    type: "radio",
    label: "Is your dog housebroken?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "dogPaperTrained",
    value: "",
    error: null,
    type: "radio",
    label: "Is or was your dog paper-trained?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "dogExcitementPiddle",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog excitement piddle or submissive urinate?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "dogFoodAndStools",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    required: false,
    label:
      "What type of food do you feed your dog? Are his/her stools consistently firm and solid?",
  },
  {
    name: "dogCrateTrained",
    value: "",
    error: null,
    type: "radio",
    label: "Is your dog crate trained?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "dogCrateType",
    value: "",
    error: null,
    type: "radio",
    label: "What type of crate do you use?",
    options: [
      {
        label: "Wire",
        value: "Wire",
      },
      {
        label: "Plastic",
        value: "Plastic",
      },
    ],
  },
  {
    name: "crateLocation",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "Where is the crate located?",
    required: false,
  },
  {
    name: "cratePreference",
    value: "",
    error: null,
    type: "radio",
    label:
      "Does your dog like his/her crate, or does he/she stress and try to escape?",
    required: false,
    options: [
      { label: "Likes Crate", value: "Likes Crate" },
      {
        label: "Stressed / tries to escape",
        value: "Stressed / tries to escape",
      },
    ],
  },
  {
    name: "crateUsage",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "When do you use the crate?",
    required: false,
  },
  {
    name: "eliminationInCrate",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog eliminate in the crate?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "eliminationRoutine",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "How do you take your dog out to eliminate?",
    required: false,
  },
  {
    name: "dogExercise",
    value: "",
    error: null,
    type: "radio",
    label:
      "Is your dog leashed walked, supervised loose, or do you have a fenced yard?",
    required: false,
    options: [
      {
        label: "Leashed Walked",
        value: "Leashed Walked",
      },
      {
        label: "Supervised Loose",
        value: "Supervised Loose",
      },
      {
        label: "Fenced Yard",
        value: "Fenced Yard",
      },
    ],
  },
  {
    name: "healthProblems",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog have a history of health problems?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "healthProblemsExplanation",
    value: "",
    error: null,
    type: "textarea",
    label: "If yes, explain.",
    required: false,
  },
];

export const INITIAL_QUESTIONNAIRE_PET_BEHAVIOR = [
  {
    name: "watchdogBehavior",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog engage in a watchdog barking behavior?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "objectDestruction",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog destroy objects?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "jumpingBehavior",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog jump on people?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "jumpingCommand",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label:
      "What do you say to your dog when he/she jumps on you or other people?",
    required: false,
  },
  {
    name: "jumpingResponse",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "What do you do when your dog jumps on people?",
    required: false,
  },
  {
    name: "jumpingDesire",
    value: "",
    error: null,
    type: "radio",
    label: "Do you want your dog to jump on you or other people?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "mouthBehavior",
    value: "",
    error: null,
    type: "radio",
    label:
      "Does your dog mouth (put his/her mouth on your hands or grab your clothing)?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "aggressiveBehavior",
    value: "",
    error: null,
    type: "radio",
    label:
      "Has your dog ever nipped, growled at, or bitten you or anyone else?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "aggressiveExplanation",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "If yes, please explain.",
    required: false,
  },
  {
    name: "furnitureRules",
    value: "",
    error: null,
    type: "radio",
    label: "Is your dog allowed on the furniture?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "furnitureUsage",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog get on the furniture?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "diggingHabits",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog dig holes in the yard?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "doorDashBehavior",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog door dash (escape or try to escape out of the door)?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "objectStealing",
    value: "",
    error: null,
    type: "radio",
    label:
      "Does your dog steal objects for attention (pick up objects that don't belong to her and run away when you try to get them)?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "stolenObjectTypes",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "If yes, what kind of objects?",
    required: false,
  },
];

export const INITIAL_QUESTIONNAIRE_PET_BEHAVIOR_TO_OTHER_ANIMALS = [
  {
    name: "hasCat",
    value: "",
    error: null,
    type: "radio",
    label: "Do you have a cat?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "catLitterBoxAccess",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog get into the cat's litter box?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "catAggression",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog aggress toward the cat?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "otherDogPresence",
    value: "",
    error: null,
    type: "radio",
    label: "Do you have another dog in your environment?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "dogRelationships",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "How do your dogs get along?",
    required: false,
  },
  {
    name: "objectRemoval",
    value: "",
    error: null,
    type: "radio",
    label:
      "Can you take objects away from your dog without signs of aggression (e.g., food, toys, etc.)?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "tugOfWar",
    value: "",
    error: null,
    type: "radio",
    label: "Do you or anyone else play tug-of-war with your dog?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "tugWith",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "If yes, what do you tug with?",
    required: false,
  },
  {
    name: "wrestling",
    value: "",
    error: null,
    type: "radio",
    label: "Do you or anyone wrestle or rough house with your dog?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "chaseGames",
    value: "",
    error: null,
    type: "radio",
    label:
      "Do you play chase games with your dog (do you chase your dog around the house or yard)?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "playStyle",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "How do you play with your dog?",
    required: false,
  },
  {
    name: "sleepLocation",
    value: "",
    error: null,
    type: "text",
    inputMode: "text",
    label: "Where does your dog sleep at night?",
    required: false,
  },
  {
    name: "restingPlaceGrowling",
    value: "",
    error: null,
    type: "radio",
    label:
      "Has your dog ever growled at you when disturbed in his/her favorite resting place?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "blockingBehavior",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog attempt to block you from leaving your environment?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "fearOfNoises",
    value: "",
    error: null,
    type: "radio",
    label: "Is your dog afraid of thunderstorms or loud noises?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "reactToStrangersEnter",
    value: "",
    error: null,
    type: "radio",
    label:
      "How does your dog normally react to strangers that enter your environment?",
    required: false,
    options: [
      {
        label: "Friendly",
        value: "Friendly",
      },
      {
        label: "Aggressive",
        value: "Aggressive",
      },
      {
        label: "Shy",
        value: "Shy",
      },
    ],
  },
  {
    name: "reactToStrangersOutOfHome",
    value: "",
    error: null,
    type: "radio",
    label:
      "How does your dog normally react to strangers when you are out of your environment?",
    required: false,
    options: [
      {
        label: "Friendly",
        value: "Friendly",
      },
      {
        label: "Aggressive",
        value: "Aggressive",
      },
      {
        label: "Shy",
        value: "Shy",
      },
    ],
  },
  {
    name: "reactToChildren",
    value: "",
    error: null,
    type: "radio",
    label: "Does your dog react differently to children?",
    required: false,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
      {
        label: "Never around children",
        value: "Never around children",
      },
    ],
  },
  {
    name: "parksAndWoodedAreas",
    value: "",
    error: null,
    type: "radio",
    label:
      "Do you take your dog to parks or wooded areas and let him/her run free?",
    required: true,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
];

export const INITIAL_QUESTIONNAIRE_FORM_STATE = [
  ...INITIAL_QUESTIONNAIRE_USER_DETAILS,
  ...INITIAL_QUESTIONNAIRE_PET_FAMILY_HISTORY,
  ...INITIAL_QUESTIONNAIRE_PET_HEALTH,
  ...INITIAL_QUESTIONNAIRE_PET_BEHAVIOR,
  ...INITIAL_QUESTIONNAIRE_PET_BEHAVIOR_TO_OTHER_ANIMALS,
  ...INITIAL_QUESTIONNAIRE_PREVIOUS_TRAINING,
];
