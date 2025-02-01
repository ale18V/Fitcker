import { PlanCreate, PlanRead } from "$/api";
import { createSelectors, MMKVStorage } from "$/utils/zustand";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  plans: Record<string, PlanCreate>;
};

type Actions = {
  addPlan: (exercise: PlanRead) => void;
};

const initialState: State = {
  plans: {},
};

type PlansStore = State & Actions;

const useExercises = create<PlansStore>()(
  persist(
    immer((set) => ({
      ...initialState,
      addPlan: (plan) =>
        set((state) => {
          state.plans[plan.id] = plan;
        }),
    })),
    {
      name: "exercises",
      storage: createJSONStorage(() => MMKVStorage),
    }
  )
);

export default createSelectors(useExercises);
