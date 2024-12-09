import MyBooking from '@/components/common/MyBooking';
import MyFavourite from '@/components/common/MyFavourite';
import MyProperty from '@/components/common/MyProperty';
import TrendingFeaturedProperty from '@/redux/TrendingFeaturedProperty';
import Agent from '@/screens/Agent';
import AgentOperationTime from '@/screens/AgentOperationTime';
import AllStories from '@/screens/AllStories';
import BottomTab from '@/screens/BottomTab';
import Builder from '@/screens/Builder';
import BuilderPostProperty from '@/screens/BuilderProperty/BuilderPostProperty';
import BuilderPostPropertyStepFive from '@/screens/BuilderProperty/BuilderPostPropertyStepFive';
import BuilderPostPropertyStepFour from '@/screens/BuilderProperty/BuilderPostPropertyStepFour';
import BuilderPostPropertyStepThree from '@/screens/BuilderProperty/BuilderPostPropertyStepThree';
import BuilderPostPropertyStepTwo from '@/screens/BuilderProperty/BuilderPostPropertyStepTwo';
import BuilderPropertyDetailScreen from '@/screens/BuilderPropertyDetailScreen';
import BuilderPostPropertyEditing from '@/screens/BuilderPropertyEditing/BuilderPropertyEditing';
import BuilderPostPropertyStepFiveEditing from '@/screens/BuilderPropertyEditing/BuilderPropertyStepFiveEditing';
import BuilderPostPropertyStepFourEditing from '@/screens/BuilderPropertyEditing/BuilderPropertyStepFourEditing';
import BuilderPostPropertyStepThreeEditing from '@/screens/BuilderPropertyEditing/BuilderPropertyStepThreeEditing';
import BuilderPostPropertyStepTwoEditing from '@/screens/BuilderPropertyEditing/BuilderPropertyStepTwoEditing';
import BuilderPropertyPreview from '@/screens/BuilderPropertyPreview';
import Business from '@/screens/Business';
import EventSpaceStepOne from '@/screens/Business/EventSpace/EventSpaceStepOne';
import EventSpaceStepThree from '@/screens/Business/EventSpace/EventSpaceStepThree';
import EventSpaceStepTwo from '@/screens/Business/EventSpace/EventSpaceStepTwo';
import ExclusiveServicesStepOne from '@/screens/Business/ExclusiveServices/ExclusiveServicesStepOne';
import ExclusiveServicesStepTwo from '@/screens/Business/ExclusiveServices/ExclusiveServicesStepTwo';
import BusinessEditDescription from '@/screens/BusinessEditDescription';
import BusinessForm from '@/screens/BusinessForm';
import BusinessListingDetails from '@/screens/BusinessListingDetails';
import BusinessProfile from '@/screens/BusinessProfile';
import BusinessProfileDescription from '@/screens/BusinessPropertyDescription';
import BusinessProfileDescriptionOtherUser from '@/screens/BusinessPropertyDescriptionOtherUser';
import BusinessViewProperty from '@/screens/BusinessViewProperty';
import Category from '@/screens/Category';
import Chat from '@/screens/Chat';
import ChatBox from '@/screens/ChatBox/ChatBox';
import CreateAgentAccount from '@/screens/CreateAgentAccount';
import CreateBusinessProfile from '@/screens/CreateBusinessProfile';
import BusinessProfileFinal from '@/screens/CreateBusinessProfile/BusinessProfileFinal';
import UploadBusinessPic from '@/screens/CreateBusinessProfile/UploadBusinessPic';
import CreatePost from '@/screens/CreatePost';
import DailyStory from '@/screens/DailyStory';
import DeleteAccount from '@/screens/DeleteAccount';
import DocumentComponentPreview from '@/screens/DocumentComponentPreview';
import Explore from '@/screens/Explore';
import GalleryComponentPreview from '@/screens/GalleryComponentPreview';
import Global from '@/screens/Global';
import Home from '@/screens/Home';
import ListingResponse from '@/screens/ListingResponse';
import LoginOtp from '@/screens/LoginOtp';
import LoginScreen from '@/screens/LoginScreen';
import More from '@/screens/More';
import AuctionsMore from '@/screens/More/AuctionsMore';
import ColivingMore from '@/screens/More/ColivingMore';
import CreditlukMore from '@/screens/More/CreditLukMore';
import RentPayMore from '@/screens/More/RentPayMore';
import WaitListScreen from '@/screens/More/WaitListScreen';
import MyLeads from '@/screens/MyLeads';
import Nearu from '@/screens/Nearu';
import Notification from '@/screens/Notification';
import OnBoarding from '@/screens/OnBoarding';
import OnBoardingFive from '@/screens/OnBoardingFive';
import OnBoardingFour from '@/screens/OnBoardingFour';
import OnBoardingThree from '@/screens/OnBoardingThree';
import OnBoardingTwo from '@/screens/OnBoardingTwo';
import PdfView from '@/screens/PdfView';
import PostProperty from '@/screens/Property/PostProperty';
import PostPropertyStepFive from '@/screens/Property/PostPropertyStepFive';
import PostPropertyStepFour from '@/screens/Property/PostPropertyStepFour';
import PostPropertyStepThree from '@/screens/Property/PostPropertyStepThree';
import PostPropertyStepTwo from '@/screens/Property/PostPropertyStepTwo';
import PropertyComment from '@/screens/PropertyComment';
import PropertyDetailScreen from '@/screens/PropertyDetailScreen';
import PostPropertyEditing from '@/screens/PropertyEditing/PostPropertyEditing';
import PostPropertyStepFiveEditing from '@/screens/PropertyEditing/PostPropertyStepFiveEditing';
import PostPropertyStepFourEditing from '@/screens/PropertyEditing/PostPropertyStepFourEditing';
import PostPropertyStepThreeEditing from '@/screens/PropertyEditing/PostPropertyStepThreeEditing';
import PostPropertyStepTwoEditing from '@/screens/PropertyEditing/PostPropertyStepTwoEditing';
import PropertyLocationScreen from '@/screens/PropertyLocationScreen';
import PropertyPreview from '@/screens/PropertyPreview';
import SignIn from '@/screens/SignIn';
import SignUp from '@/screens/SignUp';
import SignupOtp from '@/screens/SignupOtp';
import Subscriptions from '@/screens/Subscriptions';
import Payments from '@/screens/Subscriptions/Payments';
import PhonePay from '@/screens/Subscriptions/PhonePay';
import PricingPlans from '@/screens/Subscriptions/PricingPlans';
import TermsAndConditions from '@/screens/TermsAndConditions';
import UserProfile from '@/screens/UserProfile';
import EditUserEmail from '@/screens/UserProfile/EditUserEmail';
import OtherUserProfileDetails from '@/screens/UserProfile/OtherUserProfileDetails';
import UserEditDetails from '@/screens/UserProfile/UserEditDetails';
import UserEditProfile from '@/screens/UserProfile/UserEditProfile';
import UserEmailOTP from '@/screens/UserProfile/UserEmailOTP';
import UserProfileDetails from '@/screens/UserProfile/UserProfileDetails';
import VideoSlider from '@/screens/VideoSlider';



import FlashOnboardingEight from '../screens/FlashOnbording/FlashOnboardingEight';
import FlashOnboardingFive from '../screens/FlashOnbording/FlashOnboardingFive';
import FlashOnboardingFour from '../screens/FlashOnbording/FlashOnboardingFour';
import FlashOnboardingOne from '../screens/FlashOnbording/FlashOnboardingOne';
import FlashOnboardingSeven from '../screens/FlashOnbording/FlashOnboardingSeven';
import FlashOnboardingSix from '../screens/FlashOnbording/FlashOnboardingSix';
import FlashOnboardingThree from '../screens/FlashOnbording/FlashOnboardingThree';
import FlashOnboardingTwo from '../screens/FlashOnbording/FlashOnboardingTwo';
import UserPostComment from '../screens/UserPostComment';
import { RootStackParamList } from './RootNavigator';


export const ROUTES: Record<
  keyof RootStackParamList,
  {
    component: () => JSX.Element;
    title?: string;
  }
> = {
  HOME: {
    component: Home,
  },
  BOTTOM_TAB: {
    component: BottomTab,
  },
  MORE: {
    component: More,
  },
  GLOBAL: {
    component: Global,
  },
  NOTIFICATION: {
    component: Notification,
  },
  DAILY_STORY: {
    component: DailyStory,
  },
  PROPERTY_COMMENTS: {
    component: PropertyComment,
  },
  PROPERTY_DETAILS: {
    component: PropertyDetailScreen,
  },
  USER_PROFILE: {
    component: UserProfile,
  },
  BUSINESS: {
    component: Business,
  },
  USER_PROFILE_DETAILS: {
    component: UserProfileDetails,
  },
  USER_EDIT_PROFILE: {
    component: UserEditProfile,
  },
  USER_EDIT_DETAILS: {
    component: UserEditDetails,
  },
  MY_PROPERTY: {
    component: MyProperty,
  },
  MY_FAVOURITE: {
    component: MyFavourite,
  },
  LISTING_RESPONSE: {
    component: ListingResponse,
  },
  MYLEADS: {
    component: MyLeads,
  },
  EDIT_USER_EMAIL: {
    component: EditUserEmail,
  },
  USER_EMAIL_OTP: {
    component: UserEmailOTP,
  },
  MY_BOOKING: {
    component: MyBooking,
  },
  CHAT: {
    component: Chat,
  },
  CREATE_POST: {
    component: CreatePost,
  },
  OTHER_USER_PROFILE_DETAILS: {
    component: OtherUserProfileDetails,
  },
  CREATE_BUSINESS_PROFILE: {
    component: CreateBusinessProfile,
  },
  UPLOAD_BUSINESS_PIC: {
    component: UploadBusinessPic,
  },
  BUSINESS_PROFILE_FINAL: {
    component: BusinessProfileFinal,
  },
  CREATE_AGENT_ACCOUNT: {
    component: CreateAgentAccount,
  },

  POST_PROPERTY: {
    component: PostProperty,
  },
  POST_PROPERTY_TWO: {
    component: PostPropertyStepTwo,
  },
  POST_PROPERTY_THREE: {
    component: PostPropertyStepThree,
  },
  POST_PROPERTY_FOUR: {
    component: PostPropertyStepFour,
  },
  POST_PROPERTY_FIVE: {
    component: PostPropertyStepFive,
  },

  POST_PROPERTY_EDITING: {
    component: PostPropertyEditing,
  },
  POST_PROPERTY_TWO_EDITING: {
    component: PostPropertyStepTwoEditing,
  },
  POST_PROPERTY_THREE_EDITING: {
    component: PostPropertyStepThreeEditing,
  },
  POST_PROPERTY_FOUR_EDITING: {
    component: PostPropertyStepFourEditing,
  },
  POST_PROPERTY_FIVE_EDITING: {
    component: PostPropertyStepFiveEditing,
  },

  POST_PROPERT_PREVIEW: {
    component: PropertyPreview,
  },

  AGENT_OPERATION_TIME: {
    component: AgentOperationTime,
  },
  USER_POST_COMMENTS: {
    component: UserPostComment,
  },
  GALLERY_PREVIEW: {
    component: GalleryComponentPreview,
  },
  DOCUMENT_PREVIEW: {
    component: DocumentComponentPreview,
  },
  SUBSCRIPTIONS: {
    component: Subscriptions,
  },
  PRICING_PLANS: {
    component: PricingPlans,
  },
  PAYMENTS_HISTORY: {
    component: Payments,
  },
  VIDEO_SLIDER: {
    component: VideoSlider,
  },
  ALL_STORIES: {
    component: AllStories,
  },
  NEARU: {
    component: Nearu,
  },
  CHATBOX: {
    component: ChatBox,
  },
  EXPLORE: {
    component: Explore,
  },
  DELETE_ACCOUNT: {
    component: DeleteAccount,
  },
  TRENDING_FEATURED_PROPERTY: {
    component: TrendingFeaturedProperty,
  },

  BUILDER_POST_PROPERTY: {
    component: BuilderPostProperty,
  },
  BUILDER_POST_PROPERTY_TWO: {
    component: BuilderPostPropertyStepTwo,
  },
  BUILDER_POST_PROPERTY_THREE: {
    component: BuilderPostPropertyStepThree,
  },
  BUILDER_POST_PROPERTY_FOUR: {
    component: BuilderPostPropertyStepFour,
  },
  BUILDER_POST_PROPERTY_FIVE: {
    component: BuilderPostPropertyStepFive,
  },

  BUILDER_POST_PROPERTY_EDITING: {
    component: BuilderPostPropertyEditing,
  },
  BUILDER_POST_PROPERTY_TWO_EDITING: {
    component: BuilderPostPropertyStepTwoEditing,
  },
  BUILDER_POST_PROPERTY_THREE_EDITING: {
    component: BuilderPostPropertyStepThreeEditing,
  },
  BUILDER_POST_PROPERTY_FOUR_EDITING: {
    component: BuilderPostPropertyStepFourEditing,
  },
  BUILDER_POST_PROPERTY_FIVE_EDITING: {
    component: BuilderPostPropertyStepFiveEditing,
  },

  BUILDER_POST_PROPERTY_PREVIEW: {
    component: BuilderPropertyPreview,
  },

  BUSINESS_PROFILE: {
    component: BusinessProfile,
  },

  BUILDER_PROPERTY_DETAILS: {
    component: BuilderPropertyDetailScreen,
  },

  PROPERTY_LOCATION_SCREEN: {
    component: PropertyLocationScreen,
  },

  BUSINESS_FORM: {
    component: BusinessForm,
  },
  BUSINESS_PROPERTY_DESCRIPTION: {
    component: BusinessProfileDescription,
  },
  BUSINESS_EDIT_DESCRIPTION: {
    component: BusinessEditDescription,
  },

  BUSINESS_PROFILE_DESCRIPTION_OTHER_USER: {
    component: BusinessProfileDescriptionOtherUser,
  },

  BUSINESS_VIEW_PROPERTY: {
    component: BusinessViewProperty,
  },
  PHONE_PAY: {
    component: PhonePay,
  },
  PDF_VIEW: {
    component: PdfView,
  },

  EVENT_SPACE_STEPONE: {
    component: EventSpaceStepOne,
  },
  EVENT_SPACE_STEPTWO: {
    component: EventSpaceStepTwo,
  },
  EVENT_SPACE_STEPTHREE: {
    component: EventSpaceStepThree,
  },
  EXCLUSIVE_SERVICES_STEP_ONE: {
    component: ExclusiveServicesStepOne,
  },
  EXCLUSIVE_SERVICES_STEP_TWO: {
    component: ExclusiveServicesStepTwo,
  },

  //coliving more

  COLIVING_MORE: {
    component: ColivingMore,
  },

  WAITLIST_SCREEN: {
    component: WaitListScreen,
  },

  CREDITLUK_SCREEN: {
    component: CreditlukMore,
  },

  RENTPAY_MORE: {
    component: RentPayMore,
  },

  AUCTIONS_MORE: {
    component: AuctionsMore,
  },
  BUSINESS_LISTING_DETAILS: {
    component: BusinessListingDetails,
  },
};

export const AUTH_ROUTES: Record<
  keyof RootStackParamList,
  {
    component: () => JSX.Element;
    title?: string;
  }
> = {
  ONBOARDING: {
    component: OnBoarding,
  },
  ONBOARDING_TWO: {
    component: OnBoardingTwo,
  },
  ONBOARDING_THREE: {
    component: OnBoardingThree,
  },
  ONBOARDING_FOUR: {
    component: OnBoardingFour,
  },
  ONBOARDING_FIVE: {
    component: OnBoardingFive,
  },
  AGENT: {
    component: Agent,
  },
  BUILDER: {
    component: Builder,
  },

  Login: {
    component: LoginScreen,
  },
  LOGIN_OTP: {
    component: LoginOtp,
  },
  SIGNUP_OTP: {
    component: SignupOtp,
  },
  SIGN_UP: {
    component: SignUp,
  },
  SIGN_IN: {
    component: SignIn,
  },
  CATEGORY: {
    component: Category,
  },
  TERMS_AND_CONDITIONS: {
    component: TermsAndConditions,
  },

  // flash onboarding

  FLASH_ONBOARDING_ONE: {
    component: FlashOnboardingOne,
  },
  FLASH_ONBOARDING_TWO: {
    component: FlashOnboardingTwo,
  },

  FLASH_ONBOARDING_THREE: {
    component: FlashOnboardingThree,
  },
  FLASH_ONBOARDING_FOUR: {
    component: FlashOnboardingFour,
  },
  FLASH_ONBOARDING_FIVE: {
    component: FlashOnboardingFive,
  },

  FLASH_ONBOARDING_SIX: {
    component: FlashOnboardingSix,
  },

  FLASH_ONBOARDING_SEVEN: {
    component: FlashOnboardingSeven,
  },

  FLASH_ONBOARDING_EIGHT: {
    component: FlashOnboardingEight,
  },
};