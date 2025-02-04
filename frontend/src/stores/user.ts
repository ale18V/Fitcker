import { createSelectors, MMKVStorage } from "$/utils/zustand"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer";

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



type Auth = {
  authToken: string | undefined

}

type State = WithUndefinedProperties<Auth & Biometrics & UserInfo>

type Actions = {
  logout: () => void
  login: (authToken: string, username: string) => void
}

type UserStore = State & Actions

const initialState = {
  authToken: undefined,
  heightCM: undefined,
  email: undefined,
  DoB: undefined,
  gender: undefined,
  username: undefined,
  weightKG: undefined,
  isMetric: true,
};
export const useUser = create<UserStore>()(
  immer(
    persist(
      (set) => ({
        ...initialState,
        login(authToken, username) {
          set({ authToken, username });
        },
        logout: () => set({ ...initialState })
      }),
      {
        name: AUTH_STORE_NAME,
        storage: createJSONStorage(() => MMKVStorage),
      },
    ),
  )
)


export default createSelectors(useUser, {
  isLoggedIn: (state) => !!state.authToken,
})