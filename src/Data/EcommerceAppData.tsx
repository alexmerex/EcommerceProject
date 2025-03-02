import { OnBoardingPrograms } from "../TypesCheck/OnboardingTypesCheck";

export const OnBoardingData: OnBoardingPrograms[] = [
  {
    _id: "onboarding1",
    text: "Cat",
    imageUrl: require("../../assets/onboarding/cat404.json"),
    textColor: "#000080",
    backgroundColor: "rgba(25,232,127,1)",
  },
  {
    _id: "onboarding2",
    text: "Panda",
    imageUrl: require("../../assets/onboarding/panda.json"),
    textColor: "#000080",
    backgroundColor: "rgb(247,9,216)",
  },
];
