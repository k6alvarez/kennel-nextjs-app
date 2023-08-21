import React, { useReducer, useState } from "react";
import { questionnaireFormReducer } from "./questionnaireFormReducer";
import { useSession } from "next-auth/react";
import Layout from "../Layout";
import { Error, Fields, Fieldset } from "./styles";
import { renderFormFields } from "./renderFormFields";
import { statesArray } from "../Reservations/formInitialState";
import { INITIAL_QUESTIONNAIRE_FORM_STATE } from "./constants";

export const QuestionnaireForm = ({ user }) => {
  const { data: session, status } = useSession();

  const INITIAL_QUESTIONNAIRE_FORM_STATE = {
    email: {
      value: user?.email || "",
      error: null,
      type: "text",
      inputMode: "email",
      label: "Email",
      disabled: true,
    },
    name: {
      value: user?.name || "",
      error: null,
      type: "text",
      label: "First Name",
      required: true,
    },
    lastName: {
      value: user?.lastName || "",
      error: null,
      type: "text",
      label: "Last Name",
      required: true,
    },
    address: {
      value: user?.address || "",
      error: null,
      type: "text",
      label: "Address",
      required: true,
    },
    unit: {
      value: user?.unit || "",
      error: null,
      type: "text",
      label: "Unit",
    },
    city: {
      value: user?.city || "",
      error: null,
      type: "text",
      label: "City",
      required: true,
    },
    state: {
      value: user?.state || "",
      error: null,
      type: "select",
      label: "State",
      required: true,
      options: statesArray,
    },
    zip: {
      value: user?.zip || "",
      error: null,
      type: "text",
      label: "Zip",
      required: true,
    },
    phone: {
      value: user?.phone || "",
      error: null,
      type: "text",
      inputMode: "numeric",
      minLength: 10,
      maxLength: 16,
      label: "Phone",
      required: true,
      hint: `Format: 123-456-7890`,
    },
    adultsInHome: {
      value: "",
      error: null,
      type: "text",
      inputMode: "numeric",
      label: "How many adults live in your home?",
      required: true,
    },
    childrenInHome: {
      value: "",
      error: null,
      type: "radio",
      label: "Do you have children in your home?",
      required: true,
      options: ["Yes", "No", "Occasionally"],
    },
    childrenAges: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "If so, what are their ages?",
      required: true,
    },
    referredBy: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "How were you referred to our services?",
      required: true,
    },
    petAgeWhenAcquired: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "How old was your pet when you acquired him/her?",
      required: true,
    },
    petAgeNow: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "How old is your pet now?",
      required: true,
    },
    whereDidYouGetYourDog: {
      value: "",
      error: null,
      type: "radio",
      label: "Where did you get your dog?",
      required: true,
      options: [
        "Professional breeder",
        "Back-yard breeder",
        "Pet store",
        "Rescue organization",
        "Friend or family member",
        "Ad in the paper",
        "Other (please explain on next line)",
      ],
    },
    whereDidYouGetYourDogOther: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "If other, please explain",
    },
    metAndInteractedWithParents: {
      value: "",
      error: null,
      type: "radio",
      label: "Did you meet and interact with your dog's mother and father?",
      required: true,
      options: ["Yes", "No"],
    },
    reasonForNotMeetingParents: {
      value: "",
      error: null,
      type: "text",
      label: "If no, why?",
    },
    wereParentsFriendly: {
      value: "",
      error: null,
      type: "text",
      label: "If yes, were they both friendly?",
    },
    hipsCertified: {
      value: "",
      error: null,
      type: "radio",
      label: "Were the hips of the dam and sire OFA certified?",
      required: true,
      options: ["Yes", "No", "I don't know"],
    },
    dogHousebroken: {
      value: "",
      error: null,
      type: "radio",
      label: "Is your dog housebroken?",
      required: true,
      options: ["Yes", "No"],
    },
    dogPaperTrained: {
      value: "",
      error: null,
      type: "radio",
      label: "Is or was your dog paper-trained?",
      required: true,
      options: ["Yes", "No"],
    },
    dogExcitementPiddle: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog excitement piddle or submissive urinate?",
      required: true,
      options: ["Yes", "No"],
    },
    dogFoodAndStools: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      required: true,
      label:
        "What type of food do you feed your dog? Are his/her stools consistently firm and solid?",
    },
    dogCrateTrained: {
      value: "",
      error: null,
      type: "radio",
      label: "Is your dog crate trained?",
      required: true,
      options: ["Yes", "No"],
    },
    dogCrateType: {
      value: "",
      error: null,
      type: "radio",
      label: "What type of crate do you use?",
      options: ["Wire", "Plastic"],
    },
    crateLocation: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "Where is the crate located?",
      required: true,
    },
    cratePreference: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Does your dog like his/her crate, or does he/she stress and try to escape?",
      required: true,
      options: ["Likes Crate", "Stressed / tries to escape"],
    },
    crateUsage: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "When do you use the crate?",
      required: true,
    },
    eliminationInCrate: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog eliminate in the crate?",
      required: true,
      options: ["Yes", "No"],
    },
    eliminationRoutine: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "How do you take your dog out to eliminate?",
      required: true,
    },
    dogExercise: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Is your dog leashed walked, supervised loose, or do you have a fenced yard?",
      required: true,
      options: ["Leashed Walked", "Supervised Loose", "Fenced Yard"],
    },
    healthProblems: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog have a history of health problems?",
      required: true,
      options: ["Yes", "No"],
    },
    healthProblemsExplanation: {
      value: "",
      error: null,
      type: "textarea",
      label: "If yes, explain.",
      required: false,
    },
    watchdogBehavior: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog engage in a watchdog barking behavior?",
      required: true,
      options: ["Yes", "No"],
    },
    objectDestruction: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog destroy objects?",
      required: true,
      options: ["Yes", "No"],
    },
    jumpingBehavior: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog jump on people?",
      required: true,
      options: ["Yes", "No"],
    },
    jumpingCommand: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label:
        "What do you say to your dog when he/she jumps on you or other people?",
      required: true,
    },
    jumpingResponse: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "What do you do when your dog jumps on people?",
      required: true,
    },
    jumpingDesire: {
      value: "",
      error: null,
      type: "radio",
      label: "Do you want your dog to jump on you or other people?",
      required: true,
      options: ["Yes", "No"],
    },

    mouthBehavior: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Does your dog mouth (put his/her mouth on your hands or grab your clothing)?",
      required: true,
      options: ["Yes", "No"],
    },
    aggressiveBehavior: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Has your dog ever nipped, growled at, or bitten you or anyone else?",
      required: true,
      options: ["Yes", "No"],
    },
    aggressiveExplanation: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "If yes, please explain.",
      required: false,
    },
    furnitureRules: {
      value: "",
      error: null,
      type: "radio",
      label: "Is your dog allowed on the furniture?",
      required: true,
      options: ["Yes", "No"],
    },
    furnitureUsage: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog get on the furniture?",
      required: true,
      options: ["Yes", "No"],
    },
    diggingHabits: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog dig holes in the yard?",
      required: true,
      options: ["Yes", "No"],
    },
    doorDashBehavior: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Does your dog door dash (escape or try to escape out of the door)?",
      required: true,
      options: ["Yes", "No"],
    },
    objectStealing: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Does your dog steal objects for attention (pick up objects that don't belong to her and run away when you try to get them)?",
      required: true,
      options: ["Yes", "No"],
    },
    stolenObjectTypes: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "If yes, what kind of objects?",
      required: false,
    },
    hasCat: {
      value: "",
      error: null,
      type: "radio",
      label: "Do you have a cat?",
      required: true,
      options: ["Yes", "No"],
    },

    catLitterBoxAccess: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog get into the cat's litter box?",
      required: true,
      options: ["Yes", "No"],
    },
    catAggression: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog aggress toward the cat?",
      required: true,
      options: ["Yes", "No"],
    },
    otherDogPresence: {
      value: "",
      error: null,
      type: "radio",
      label: "Do you have another dog in your environment?",
      required: true,
      options: ["Yes", "No"],
    },
    dogRelationships: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "How do your dogs get along?",
      required: false,
    },
    objectRemoval: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Can you take objects away from your dog without signs of aggression (e.g., food, toys, etc.)?",
      required: true,
      options: ["Yes", "No"],
    },
    tugOfWar: {
      value: "",
      error: null,
      type: "radio",
      label: "Do you or anyone else play tug-of-war with your dog?",
      required: true,
      options: ["Yes", "No"],
    },
    tugWith: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "If yes, what do you tug with?",
      required: false,
    },
    wrestling: {
      value: "",
      error: null,
      type: "radio",
      label: "Do you or anyone wrestle or rough house with your dog?",
      required: true,
      options: ["Yes", "No"],
    },
    chaseGames: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Do you play chase games with your dog (do you chase your dog around the house or yard)?",
      required: true,
      options: ["Yes", "No"],
    },
    playStyle: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "How do you play with your dog?",
      required: false,
    },
    sleepLocation: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "Where does your dog sleep at night?",
      required: true,
    },

    restingPlaceGrowling: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Has your dog ever growled at you when disturbed in his/her favorite resting place?",
      required: true,
      options: ["Yes", "No"],
    },
    blockingBehavior: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Does your dog attempt to block you from leaving your environment?",
      required: true,
      options: ["Yes", "No"],
    },
    fearOfNoises: {
      value: "",
      error: null,
      type: "radio",
      label: "Is your dog afraid of thunderstorms or loud noises?",
      required: true,
      options: ["Yes", "No"],
    },
    reactToStrangersEnter: {
      value: "",
      error: null,
      type: "radio",
      label:
        "How does your dog normally react to strangers that enter your environment?",
      required: true,
      options: ["Friendly", "Aggressive", "Shy"],
    },
    reactToStrangersOutOfHome: {
      value: "",
      error: null,
      type: "radio",
      label:
        "How does your dog normally react to strangers when you are out of your environment?",
      required: true,
      options: ["Friendly", "Aggressive", "Shy"],
    },
    reactToChildren: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog react differently to children?",
      required: true,
      options: ["Yes", "No", "Never around children"],
    },
    parksAndWoodedAreas: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Do you take your dog to parks or wooded areas and let him/her run free?",
      required: true,
      options: ["Yes", "No"],
    },
    ownedDogBefore: {
      value: "",
      error: null,
      type: "radio",
      label: "Have you ever owned a dog before?",
      required: true,
      options: ["Yes", "No"],
    },
    trainedDogBefore: {
      value: "",
      error: null,
      type: "radio",
      label: "Have you ever trained a dog before?",
      required: true,
      options: ["Yes", "No"],
    },
    interestInTraining: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Are you interested in training your dog and willing to make a commitment to train your dog?",
      required: true,
      options: ["Yes", "No"],
    },
    trainingGoals: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "What do you want to get most out of training?",
      required: true,
    },
    previousTraining: {
      value: "",
      error: null,
      type: "radio",
      label: "Has your present dog had any previous training?",
      required: true,
      options: ["Yes", "No"],
    },
    previousTrainingLocation: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "If yes, where did you train him/her?",
      required: false,
    },
    leashResponse: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "How does your dog respond on a leash?",
      required: true,
    },
    leashBehaviors: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label:
        "Does he/she tug and pull? Does he/she chew on the leash? Does he/she trap the leash with his/her paws and attempt to take control?",
      required: true,
    },
    recallCommand: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog come when called?",
      required: true,
      options: ["Yes", "No"],
    },
    recallPercentage: {
      value: "",
      error: null,
      type: "text",
      inputMode: "numeric",
      label: "If yes, what % of the time?",
      required: false,
    },
    comeInsideOutside: {
      value: "",
      error: null,
      type: "radio",
      label: "Does your dog come both inside the house and outside?",
      required: true,
      options: ["Yes", "No"],
    },
    correctedBehavior: {
      value: "",
      error: null,
      type: "radio",
      label: "Have you ever corrected your dog's behavior?",
      required: true,
      options: ["Yes", "No"],
    },
    correctedBehaviorDetails: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "If yes, what behavior and how have you corrected?",
      required: false,
    },
    physicalPunishment: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Have you ever hit your dog with your hand or an object to correct his/her behavior?",
      required: true,
      options: ["Yes", "No"],
    },
    carRideBehavior: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label:
        "How does your dog respond when going for a car ride? Does he/she get nervous, bark, jump, or get ill?",
      required: true,
    },
    obedienceWords: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label:
        "Have you taught your dog any obedience words, such as sit, stay, heel, come, down, or stand? What words have you taught your dog?",
      required: true,
    },
    tricksTaught: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label:
        "Have you taught your dog any tricks, such as shake, rollover, and play dead, etc?",
      required: true,
    },
    demandingAttention: {
      value: "",
      error: null,
      type: "radio",
      label:
        "Is your dog playful and generally demanding of attention? That is, does he/she nudge you for pets or shove toys at you for play?",
      required: true,
      options: ["Yes", "No"],
    },
    reasonForOwning: {
      value: "",
      error: null,
      type: "text",
      inputMode: "text",
      label: "What is your reason for owning a dog?",
      required: true,
    },
    additionalInfo: {
      value: "",
      error: null,
      type: "text",
      label:
        "Please provide any additional important information that was not addressed in the above questionnaire.",
      required: false,
    },
  };

  const [questionnaireFormState, questionnaireFormDispatch] = useReducer(
    questionnaireFormReducer,
    INITIAL_QUESTIONNAIRE_FORM_STATE
  );

  const [formError, setFormError] = useState(undefined);

  if (status === "loading") {
    return <Layout>Loading ...</Layout>;
  }

  return (
    <form
      onSubmit={() => {
        console.log("submit");
      }}
    >
      {formError && <Error>{formError}</Error>}
      <Fieldset disabled={false}>
        <Fields>
          {renderFormFields({
            initialState: INITIAL_QUESTIONNAIRE_FORM_STATE,
            state: questionnaireFormState,
            handleChange: (name: string, newValue: any) => {
              const error = null;
              questionnaireFormDispatch({
                key: name,
                payload: { newValue, error },
              });
            },
          })}
        </Fields>
      </Fieldset>
    </form>
  );
};
