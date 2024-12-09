import { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loader from '@/components/common/Loader';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getLoginStatus } from '@/redux/login/loginReducer';
import { useGetUserDataQuery, useLazyGetRefreshTokenQuery } from '@/redux/login/loginService';

import { getMMKVItem, MMKV_KEYS, setMMKVItem } from '../utils/mmkv';
import { AUTH_ROUTES, ROUTES } from './routes';

export type RootStackParamList = {
  POST_PROPERT_PREVIEW: { preview_data: any };

  POST_PROPERTY_FIVE: { post4: any };
  POST_PROPERTY_FIVE_EDITING: { post4: any };
  POST_PROPERTY_FOUR: { post3: any };
  POST_PROPERTY_FOUR_EDITING: { post3: any };
  POST_PROPERTY_THREE: { post2: any };
  POST_PROPERTY_THREE_EDITING: { post2: any };
  POST_PROPERTY_TWO: { post1: any };
  POST_PROPERTY_TWO_EDITING: { post1: any };
  POST_PROPERTY_EDITING: { BasicData: any };
  POST_PROPERTY: undefined;

  BUILDER_POST_PROPERTY_PREVIEW: { preview_data: any };
  BUILDER_POST_PROPERTY_FIVE: { post4: any };
  BUILDER_POST_PROPERTY_FOUR: { post3: any };
  BUILDER_POST_PROPERTY_THREE: { post2: any };
  BUILDER_POST_PROPERTY_TWO: { post1: any };
  BUILDER_POST_PROPERTY: { businessdata: any };

  EVENT_SPACE_STEPONE: { businessdata: any };
  EVENT_SPACE_STEPTWO: undefined;
  EVENT_SPACE_STEPTHREE: undefined;

  EXCLUSIVE_SERVICES_STEP_ONE: { businessdata: any };
  EXCLUSIVE_SERVICES_STEP_TWO: undefined;

  BUILDER_POST_PROPERTY_FIVE_EDITING: { post4: any };
  BUILDER_POST_PROPERTY_FOUR_EDITING: { post3: any };
  BUILDER_POST_PROPERTY_THREE_EDITING: { post2: any };
  BUILDER_POST_PROPERTY_TWO_EDITING: { post1: any };
  BUILDER_POST_PROPERTY_EDITING: { BasicData: any };

  BUSINESS_PROFILE: { id: string };

  BUILDER_PROPERTY_DETAILS: { id?: string; businessId?: string };

  PROPERTY_LOCATION_SCREEN: { locationdata: any };

  FLASH_ONBOARDING_ONE: undefined;
  FLASH_ONBOARDING_TWO: undefined;
  FLASH_ONBOARDING_THREE: undefined;
  FLASH_ONBOARDING_FOUR: undefined;
  FLASH_ONBOARDING_FIVE: undefined;
  FLASH_ONBOARDING_SIX: undefined;
  FLASH_ONBOARDING_SEVEN: undefined;
  FLASH_ONBOARDING_EIGHT: undefined;

  //more

  COLIVING_MORE: { label: string; type: string };
  WAITLIST_SCREEN: undefined;
  CREDITLUK_SCREEN: { label: string };
  RENTPAY_MORE: { label: string };
  AUCTIONS_MORE: { label: string };

  ONBOARDING: undefined;
  ONBOARDING_TWO: { subRole?: string };
  ONBOARDING_THREE: undefined;
  ONBOARDING_FOUR: undefined;
  ONBOARDING_FIVE: undefined;
  AGENT: undefined;
  BUILDER: undefined;
  Login: undefined;
  SIGN_IN: undefined;
  CATEGORY: undefined;
  LOGIN_OTP: { phone?: string; id?: string };
  SIGNUP_OTP: { phone?: string; id?: string; role?: string };
  SIGN_UP: { role?: string };
  BOTTOM_TAB: undefined;
  MORE: { propertyType?: any; label?: string; type?: string; propertyFor?: string };
  USER_PROFILE: undefined;
  BUSINESS: undefined;
  USER_PROFILE_DETAILS: undefined;
  USER_EDIT_PROFILE: undefined;
  USER_EDIT_DETAILS: undefined;
  MY_PROPERTY: { headerShow?: boolean; userId?: string };
  MY_FAVOURITE: { headerShow?: boolean };
  LISTING_RESPONSE: { propertyId: string; data: any };
  MYLEADS: undefined;
  EDIT_USER_EMAIL: undefined;
  USER_EMAIL_OTP: { email?: string; id?: string };
  MY_BOOKING: undefined;
  CHAT: undefined;
  CREATE_POST: {
    upload?: boolean;
    userProfile?: boolean;
    edit?: boolean;
    data?: any;
    builderData?: any;
  };
  OTHER_USER_PROFILE_DETAILS: { id?: string };
  CREATE_BUSINESS_PROFILE: undefined;
  UPLOAD_BUSINESS_PIC: { step1: any };
  BUSINESS_PROFILE_FINAL: { step2: any };
  HOME: undefined;
  GLOBAL: undefined;
  NOTIFICATION: undefined;
  USER_POST_COMMENTS: undefined;
  DAILY_STORY: { user: string };
  PROPERTY_COMMENTS: undefined;
  PROPERTY_DETAILS: { id?: string; owner?: string };
  CREATE_AGENT_ACCOUNT: undefined;
  AGENT_OPERATION_TIME: { agentData: any };
  GALLERY_PREVIEW: {
    images?: string[];
    index?: number;
    hasHeader?: boolean;
    headerName?: string;
  };

  DOCUMENT_PREVIEW: {
    images?: string[];
    index?: number;
    hasHeader?: boolean;
    headerName?: string;
  };

  SUBSCRIPTIONS: undefined;
  PRICING_PLANS: undefined;
  PAYMENTS_HISTORY: undefined;
  VIDEO_SLIDER: {
    VideosData?: any;
    hasHeader?: boolean;
    data?: any;
    key?: number;
    totalData?: AnimatedText;
  };
  ALL_STORIES: {
    totalData?:any;
    locationDetails?:any;
    useData?:any

  };
  NEARU: undefined;
  CHATBOX: { item?: any; iam?: string; businessProfile?: boolean };
  EXPLORE: { propertyType?: any; label?: string; type?: string; propertyFor?: string };
  DELETE_ACCOUNT: { phone: string };
  TRENDING_FEATURED_PROPERTY: { name: string; trending: boolean };
  BUSINESS_FORM: undefined;
  BUSINESS_PROPERTY_DESCRIPTION: { profiledata: any };
  BUSINESS_EDIT_DESCRIPTION: { descriptionData: any };
  BUSINESS_PROFILE_DESCRIPTION_OTHER_USER: { profiledata: any; userId: string };
  BUSINESS_VIEW_PROPERTY: undefined;
  PHONE_PAY: { url: any };
  TERMS_AND_CONDITIONS: undefined;
  PDF_VIEW: { uri?: string };
  BUSINESS_LISTING_DETAILS: { id?: string };
};

const NonAuthStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<RootStackParamList>();

const NonAuthStackNavigator = () => {
  return (
    <NonAuthStack.Navigator initialRouteName="FLASH_ONBOARDING_ONE">
      {Object.entries(AUTH_ROUTES).map(([name, route]) => (
        <NonAuthStack.Screen
          key={name}
          name={name as keyof RootStackParamList}
          options={{
            headerShown: false,
          }}
          getComponent={() => route.component}
        />
      ))}
    </NonAuthStack.Navigator>
  );
};
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="BOTTOM_TAB">
      {Object.entries(ROUTES).map(([name, route]) => (
        <AuthStack.Screen
          key={name}
          name={name as keyof RootStackParamList}
          options={{
            headerShown: false,
          }}
          getComponent={() => route.component}
        />
      ))}
    </AuthStack.Navigator>
  );
};

export function RootNavigator(): JSX.Element {
  const toast = useToast();
  // const bvbg = useLocation();
  // console.log('bvbg ====>', bvbg);

  const loginStatus = useAppSelector(getLoginStatus);
  const token = getMMKVItem(MMKV_KEYS.ACCESS_TOKEN);
  const refreshToken = getMMKVItem(MMKV_KEYS.REFRESH_TOKEN);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginAccess, setLoginAccess] = useState<boolean>(false);
  const isShowOnBoarding = !!token;
  // console.log('isShowOnBoarding+++++++++++', isShowOnBoarding, loginAccess);
  const { isLoading: userLoading } = useGetUserDataQuery({}, { skip: !(isShowOnBoarding && loginAccess) });
  // const { data: reviewData } = useGetReviewDetailQuery({});
  const [refreshTokenData, { isLoading: refreshLoading }] = useLazyGetRefreshTokenQuery();
  // console.log('loginStatus+++++++++++++', reviewData);

  const linking = {
    prefixes: ['nearlukapp://'], // your app URL scheme
    config: {
      screens: {
        HOME: 'home',
        LOGIN_OTP: 'loginotp/:phone/:id',
        SIGNUP_OTP: 'signupotp/:phone/:id/:role',
        PROPERTY_DETAILS: 'propertydetails/:id/:owner',
        BUILDER_PROPERTY_DETAILS: 'builderpropertydetails/:id/:owner',
        // add more screens as needed
      },
    },
  };

  const getRefreshTokenFn = (access, refresh) => {
    refreshTokenData({}).then(apiRes => {
      // console.log('getRefreshTokenFn+++++++++++++++++', apiRes);
      if (apiRes?.data?.status) {
        setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, apiRes.data.access_token);
        setMMKVItem(MMKV_KEYS.REFRESH_TOKEN, apiRes.data.refresh_token);
        setIsLoading(false);
        setLoginAccess(true);
      } else {
        if (apiRes?.error?.status === false) {
          // console.log('userData+++++++++++++++', access);
          setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, access);
          setMMKVItem(MMKV_KEYS.REFRESH_TOKEN, refresh);
          setIsLoading(false);
          setLoginAccess(true);
          // toast.show(apiRes?.error?.message, {
          //   type: 'custom_toast',
          //   animationDuration: 100,
          //   data: {
          //     title: 'Message',
          //   },
          //   duration: 3000,
          // });
        }
      }
    });
  };

  const isTokenExpired = tokenAcc => {
    setIsLoading(true);
    // console.log('refreeeeee', refreshToken);
    setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, refreshToken);
    setTimeout(() => getRefreshTokenFn(tokenAcc, refreshToken), 1000);
  };
  useEffect(() => {
    // console.log('useEffect++++', isLoading, token);
    if (token) {
      // isTokenExpired(token);
      setLoginAccess(true);
    } else {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    setLoginAccess(loginStatus);
  }, [loginStatus]);

  if (isLoading || userLoading || refreshLoading) {
    return <Loader size={'large'} />;
  }

  return (
    <NavigationContainer linking={linking}>
      {isShowOnBoarding && loginAccess ? <AuthStackNavigator /> : <NonAuthStackNavigator />}
    </NavigationContainer>
  );
}
