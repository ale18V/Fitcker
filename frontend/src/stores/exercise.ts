import { ExerciseCreate, ExerciseRead } from "$/api";
import { createSelectors, MMKVStorage } from "$/utils/zustand";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
type State = {
  exercises: Record<string, ExerciseCreate>;
};

type Actions = {
  addExercise: (exercise: ExerciseRead) => void;
};

const initialState: State = {
  exercises: {},
};

type ExerciseStore = State & Actions;

const useExercises = create<ExerciseStore>()(
  persist(
    immer((set) => ({
      ...initialState,
      addExercise: (exercise) =>
        set((state) => {
          state.exercises[exercise.id] = exercise;
        }),
    })),
    {
      name: "exercises",
      storage: createJSONStorage(() => MMKVStorage),
    }
  )
);

export default createSelectors(useExercises);
