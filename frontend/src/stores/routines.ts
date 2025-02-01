import { RoutineCreate, RoutineRead } from "$/api";
import { createSelectors, MMKVStorage } from "$/utils/zustand";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  routines: Record<string, RoutineCreate>;
};

type Actions = {
  addRoutine: (exercise: RoutineRead) => void;
};

const initialState: State = {
  routines: {},
};

type RoutinesStore = State & Actions;

const useRoutines = create<RoutinesStore>()(
  persist(
    immer((set) => ({
      ...initialState,
      addRoutine: (routine) =>
        set((state) => {
          state.routines[routine.id] = routine;
        }),
    })),
    {
      name: "exercises",
      storage: createJSONStorage(() => MMKVStorage),
    }
  )
);

export default createSelectors(useRoutines);
