import { createSelectors, MMKVStorage } from "$/utils/zustand"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const AUTH_STORE_NAME = "auth"

export type Biometrics = {
  heightCM: number;
  weightKG: number;
  isMetric: boolean;
};

export type UserInfo = {
  username: string;
  email: string;
  gender: string;
  DoB: string;
};



type AuthStoreValues = {
  authToken: string | undefined

}


type UserStore = AuthStoreValues & Biometrics & UserInfo

export const useUser = create<Partial<UserStore>>()(
  persist(
    (_) => ({
        authToken: undefined,
        heightCM: undefined,
        email: undefined,
        DoB: undefined,
        gender: undefined,
        username: undefined,
        weightKG: undefined,
        isMetric: true,
      }),
      {
      name: AUTH_STORE_NAME,
      storage: createJSONStorage(() => MMKVStorage),
    },
  ),
)


export default createSelectors(useUser, {
  isLoggedIn: (state) => !!state.authToken,
})