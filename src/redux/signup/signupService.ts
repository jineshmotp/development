import { signUpApi } from '../../services/endpoints';
import { apiSlice, verifySignupOtp } from '../apiSlice';

export const signupService = apiSlice.injectEndpoints({
  endpoints: build => ({
    validateSignup: build.mutation({
      query: ({ fname, lname, mobile_no, role }) => ({
        ...signUpApi,
        data: {
          fname: fname,
          lname: lname,
          mobile_no: mobile_no,
          role: role,
        },
      }),
    }),
  }),
});

export const { useValidateSignupMutation } = signupService;
