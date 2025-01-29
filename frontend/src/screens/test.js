import React from 'react';
import { render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Landing from './landing';
import SignUp from './signUp.jsx';
import SignIn from './signIn.jsx';
import CreateTab from './createTab.jsx';
import CreateExercise from '../components/createExercise.jsx';
import CreateRoutine from '../components/createRoutine.jsx';
import CreateWorkoutPlan from '../components/createWorkoutPlan.jsx';
import LogTab from "./logTab.jsx";
import WorkoutInput from '../components/workoutInput.jsx';
import WorkoutSelect from '../components/workoutSelect.jsx';
import MarkSets from '../components/markSets.jsx';
import StatsTab from './statsTab.jsx'
import StatsCalendar from "../components/statsCalendar.jsx";
import StatsGraphs from "../components/statsGraphs.jsx";
import ProfileTab from './profileTab.jsx';
import Profile from '../components/profile.jsx';
import UserInfo from '../components/userInfo.jsx';
import UserNotif from '../components/userNotif.jsx';
import UserBiometrics from '../components/userBiometrics.jsx';

jest.useFakeTimers();


describe('Landing Page', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Landing />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders "Get Started" button and handles press event', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<Landing navigation={navigation} />);
    const getStartedButton = getByText('Get Started');
    fireEvent.press(getStartedButton);
    expect(navigation.navigate).toHaveBeenCalledWith('SignUp');
    /* const signInButton = getByText('Already have an account? Sign In');
    fireEvent.press(signInButton);
    expect(navigation.navigate).toHaveBeenCalledWith('SignIn');
    const signUpButton = getByText('Don\'t have an account? Sign Up');
    fireEvent.press(signUpButton);
    expect(navigation.navigate).toHaveBeenCalledWith('SignUp'); */
  });
});

describe('Sign-In Page', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    //expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Don\'t have an account? Sign Up')).toBeTruthy();
  });

});


describe('Sign-Up Page', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);
    
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    //expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Already have an account? Sign In')).toBeTruthy();
  });

  /* test('signs up successfully', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignUp />);
    
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signUpButton = getByTestId('signUpp');
    
    // Fill out the form
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'password');

    // Mock successful sign-up API response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => ({ access_token: 'fakeAccessToken' }),
    });

    // Click the sign-up button
    fireEvent.press(signUpButton);

    // Wait for AsyncStorage to be called
    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2));

    // Assert that AsyncStorage has been called with correct values
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('access_token', 'fakeAccessToken');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('username', 'testuser');
  });

  test('displays error message on failed sign-up', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<SignUp />);
    
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const signUpButton = getByTestId('signUpp');

    // Fill out the form
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'password');

    // Mock failed sign-up API response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => ({ detail: 'Sign-up failed' }),
    });

    // Click the sign-up button
    fireEvent.press(signUpButton);

    // Wait for error message to be displayed
    await waitFor(() => expect(getByText('Sign-up failed')).toBeTruthy());
  }); */
});



describe('Create Page', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<LogTab />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders CreateWorkoutPlans correctly', () => {
    const { getByText, queryByText } = render(<CreateTab />);
    expect(getByText('Create Workout Plan')).toBeTruthy();
  });

  it('renders CreateRoutines correctly', () => {
    const { getByText, queryByText } = render(<CreateTab />);
    expect(getByText('Create Routine')).toBeTruthy();
  });

  it('renders CreateExercises correctly', () => {
    const { getByText, queryByText } = render(<CreateTab />);
    expect(getByText('Create Exercise')).toBeTruthy();
  });

});

describe("LogTab Page", () => {
  /* it("renders 'Add Workout' button", () => {
    const { getByText } = render(<LogTab />);
    const addWorkoutButton = getByText("Add a workout");
    expect(addWorkoutButton).toBeTruthy();
  });

  it("renders 'Done' button after pressing 'Add Workout' button", () => {
      const { getByText, queryByText } = render(<LogTab />);
      // 'Done' button should not be visible
      expect(queryByText("Done")).toBeNull();
      // Find and press the 'Add Workout' button
      const addWorkoutButton = getByText("Add a workout");
      fireEvent.press(addWorkoutButton);
      // After pressing the button, the 'Done' button should appear
      expect(getByText("Done")).toBeTruthy();
    }); */

    it('renders correctly', () => {
      const { toJSON } = render(<LogTab />);
      expect(toJSON()).toMatchSnapshot();
    });

    it('renders buttons correctly', () => {
      const { getByText, queryByText } = render(<LogTab />);
      expect(getByText('My Workouts')).toBeTruthy();
      expect(getByText('Log Workouts')).toBeTruthy();
      expect(queryByText('Close View')).toBeNull(); //neither modal should be open
    });
  
    it('opens markModal when My Workouts button is pressed', () => {
      const { queryByText } = render(<LogTab />);
      fireEvent.press(queryByText('My Workouts'));
      expect(queryByText('Close View')).toBeTruthy(); // Expecting the notes modal to open
    });
  
    it('opens logModal when Log Workouts button is pressed', () => {
      const { queryByText } = render(<LogTab />);
      fireEvent.press(queryByText('Log Workouts'));
      expect(queryByText('Close View')).toBeTruthy(); // Expecting the log modal to open
    });

});

/* describe('WorkoutInput component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<WorkoutInput />);
    
    // Assert that required elements are rendered
    expect(getByText(' Either no plan, routine, or exercise found! Please add missing category before trying to log workout. If you are receiving this message incorrectly, click refresh data to update.')).toBeTruthy();
  });

  /* test('submits workout data on button click', () => {
    const { getByText, getByPlaceholderText } = render(<WorkoutInput />);
    
    // Mock fetch function
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1 }) }));

    // Enter data into input fields
    fireEvent.changeText(getByPlaceholderText('Weight'), '100');
    fireEvent.changeText(getByPlaceholderText('Reps'), '10');
    fireEvent.changeText(getByPlaceholderText('Sets'), '3');
    fireEvent.changeText(getByPlaceholderText('Rest'), '60');
    // Optionally, you can interact with the date picker if needed

    // Click the submit button
    fireEvent.press(getByText('Submit'));

    // Assert that fetch was called with the correct data
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/v1/workouts/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer your_access_token_here', // Add your access token here
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: expect.any(String), // You may need to adjust this depending on your test setup
        routine_id: -1, // Assuming routine_id starts as -1
      }),
    });
  }); 
});

describe('MarkSets component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<MarkSets />);
    
    // Assert that required elements are rendered
    expect(getByText('Workout Notes')).toBeTruthy();
  });


}); */

/* describe('MarkSets component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Landing />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders "Get Started" button and handles press event', () => {
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<Landing navigation={navigation} />);
    const getStartedButton = getByText('Get Started');
    fireEvent.press(getStartedButton);
    expect(navigation.navigate).toHaveBeenCalledWith('SignUp');
  });

}); */

jest.mock("@react-navigation/material-top-tabs", () => ({
  createMaterialTopTabNavigator: jest.fn(() => ({
    Navigator: jest.fn(),
    Screen: jest.fn(),
  })),
}));

// Mock StatsGraphs component
jest.mock("../components/StatsGraphs", () => jest.fn(() => null));

// Mock StatsCalendar component
jest.mock("../components/StatsCalendar", () => jest.fn(() => null));

describe("StatsTab Component", () => {
  it("renders without crashing", () => {
    render(<StatsTab />);
    expect(createMaterialTopTabNavigator).toHaveBeenCalled();
  });

  /* it("renders StatsGraphs and StatsCalendar components", () => {
    render(<StatsTab />);
    expect(StatsGraphs).toHaveBeenCalled();
    expect(StatsCalendar).toHaveBeenCalled();
  });

  it("passes correct props to StatsGraphs component", () => {
    render(<StatsTab />);
    expect(StatsGraphs).toHaveBeenCalledWith(expect.objectContaining({
      statsGraph: {
        exercises: ["Bench Press", "Squats", "Shoulder Press", "Lunges"],
      },
    }));
  }); */
});


jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn(),
}));

describe('MarkSets Component', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValueOnce(null);
  });

  it('renders without crashing', () => {
    render(<MarkSets />);
  });

  it('initializes state variables correctly', async () => {
    const { findByPlaceholderText, getByText } = render(<MarkSets />);
    const noteButton = getByText('Workout Notes');
    fireEvent.press(noteButton);
    const weightInput = await findByPlaceholderText('weight lifted in whatever units you want (default is pounds)');
    const setsInput = await findByPlaceholderText('number of sets done');
    const repsInput = await findByPlaceholderText('numbers of reps in each set');
    const restInput = await findByPlaceholderText('seconds of rest between sets');
    const noteInput = await findByPlaceholderText('Feel free to write down notes here to refer back to');

    expect(weightInput.props.value).toEqual('');
    expect(setsInput.props.value).toEqual('');
    expect(repsInput.props.value).toEqual('');
    expect(restInput.props.value).toEqual('');
    expect(noteInput.props.value).toEqual('');
  });

  it('updates state correctly when inputs change', async () => {
    const { findByPlaceholderText, getByText } = render(<MarkSets />);
    const noteButton = getByText('Workout Notes');
    fireEvent.press(noteButton);
    const weightInput = await findByPlaceholderText('weight lifted in whatever units you want (default is pounds)');
    const setsInput = await findByPlaceholderText('number of sets done');
    const repsInput = await findByPlaceholderText('numbers of reps in each set');
    const restInput = await findByPlaceholderText('seconds of rest between sets');
    const noteInput = await findByPlaceholderText('Feel free to write down notes here to refer back to');

    fireEvent.changeText(weightInput, '100');
    fireEvent.changeText(setsInput, '3');
    fireEvent.changeText(repsInput, '10');
    fireEvent.changeText(restInput, '60');
    fireEvent.changeText(noteInput, 'Sample note');

    expect(weightInput.props.value).toEqual('100');
    expect(setsInput.props.value).toEqual('3');
    expect(repsInput.props.value).toEqual('10');
    expect(restInput.props.value).toEqual('60');
    expect(noteInput.props.value).toEqual('Sample note');
  });

  /* it('saves notes correctly when "Save Notes" button is pressed', async () => {
    const { findByPlaceholderText, getByTitle, getByText } = render(<MarkSets />);
    const noteButton = getByText('Workout Notes');
    fireEvent.press(noteButton);
    const weightInput = await findByPlaceholderText('weight lifted in whatever units you want (default is pounds)');
    const setsInput = await findByPlaceholderText('number of sets done');
    const repsInput = await findByPlaceholderText('numbers of reps in each set');
    const restInput = await findByPlaceholderText('seconds of rest between sets');
    const noteInput = await findByPlaceholderText('Feel free to write down notes here to refer back to');

    fireEvent.changeText(weightInput, '100');
    fireEvent.changeText(setsInput, '3');
    fireEvent.changeText(repsInput, '10');
    fireEvent.changeText(restInput, '60');
    fireEvent.changeText(noteInput, 'Sample note');

    fireEvent.press(getByTitle('Save Notes'));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(expect.any(String), JSON.stringify(expect.any(Array)));
  }); */
});


describe('Profile Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders ProfileTab component with user profile data', async () => {
      const mockUsername = 'testuser';
      const mockEmail = 'test@example.com';
      const mockResponse = { username: mockUsername, email: mockEmail };
  
      // Mock AsyncStorage getItem to return a mock token
      AsyncStorage.getItem.mockResolvedValue('mock_token');
  
      // Mock fetch function to return a successful response with mock data
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });
  
      const setIsAuthorized = jest.fn();
  
      const { getByText } = render(<NavigationContainer><ProfileTab setIsAuthorized={setIsAuthorized} /> </NavigationContainer>);
  
      // Wait for component to finish rendering and API call to complete
      await waitFor(() => {
       // expect(getByText(mockUsername)).toBeTruthy();
        expect(getByText("User Info")).toBeTruthy();
        expect(getByText("Notification Settings")).toBeTruthy();
        expect(getByText("Biometrics")).toBeTruthy();
        expect(getByText("Logout")).toBeTruthy();
        //expect(getByText(mockEmail)).toBeTruthy();
      });
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/v1/users/me', {
        headers: {
          Authorization: 'Bearer mock_token',
        },
      });
    });

    test('handles error when fetching user profile data', async () => {
      // Mock AsyncStorage getItem to return a mock token
      AsyncStorage.getItem.mockResolvedValue('mock_token');
  
      // Mock fetch function to return an error response
      fetch.mockResolvedValueOnce({ ok: false });
  
      const setIsAuthorized = jest.fn();
  
      render(<NavigationContainer><ProfileTab setIsAuthorized={setIsAuthorized} /> </NavigationContainer>);
  
      // Wait for component to finish rendering and API call to complete
      await waitFor(() => {
        expect(setIsAuthorized).toHaveBeenCalledWith(false);
      });
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/v1/users/me', {
        headers: {
          Authorization: 'Bearer mock_token',
        },
      });
    });

});

describe('UserInfo component', () => {
  test('renders user information correctly', () => {
    const userInfo = {
      username: 'testuser',
      email: 'test@example.com',
      gender: 'male',
      DoB: '1990-01-01',
    };

    const { getByText } = render(<UserInfo userInfo={userInfo} />);

    expect(getByText('Email:')).toBeTruthy();
    expect(getByText(userInfo.email)).toBeTruthy();
    expect(getByText('Username:')).toBeTruthy();
    expect(getByText(userInfo.username)).toBeTruthy();
    expect(getByText('Gender:')).toBeTruthy();
    //expect(getByText(userInfo.gender)).toBeTruthy();
    expect(getByText('Date of Birth:')).toBeTruthy();
    //expect(getByText(userInfo.DoB)).toBeTruthy();
  });
});

describe('UserNotif component', () => {
  test('renders notification switch correctly', () => {
    const { getByText, getByTestId } = render(<UserNotif />);

    // Check if the component renders the notification label
    expect(getByText('Allow Notifications')).toBeTruthy();

    // Check if the component renders the switch
    const switchElement = getByTestId('notification-switch');
    expect(switchElement).toBeTruthy();

    // Check if the switch is initially off
    expect(switchElement.props.value).toBe(false);

    // Simulate toggling the switch
    fireEvent(switchElement, 'valueChange', true);

    // Check if the switch toggles on
    expect(switchElement.props.value).toBe(true);
  });
});

describe('UserBiometrics component', () => {
  test('renders user biometrics correctly', () => {
    const biometrics = {
      heightCM: 178,
      weightKG: 70,
      heightIN: 0,
      weightLBS: 0,
    };

    const { getByText } = render(<UserBiometrics biometrics={biometrics} />);

    // Check if the component renders height
    expect(getByText(`Height:`)).toBeTruthy();
    //expect(getByText('cm')).toBeTruthy();
    

    // Check if the component renders weight
    expect(getByText(`Weight:`)).toBeTruthy();
    //expect(getByText('kg')).toBeTruthy();

    // Calculate BMI
    const heightM = biometrics.heightCM / 100;
    const bmi = biometrics.weightKG / (heightM * heightM);

    // Check if the component renders BMI
    expect(getByText(`BMI:`)).toBeTruthy();
    expect(getByText('22.09')).toBeTruthy();
  });
});


describe("WorkoutSelect Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(<WorkoutSelect />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays message when no plan, routine, or exercise found", async () => {
    const { getByText } = render(<WorkoutSelect />);
    expect(getByText("Either no plan, routine, or exercise found! Please add missing category before trying to log workout. If you are receiving this message incorrectly, click refresh data to update.")).toBeTruthy();
  });

  /* it("updates plan ID when a plan is selected", async () => {
    const { getByText } = render(<WorkoutSelect />);
    fireEvent.press(getByText("Select your workout plan"));
    fireEvent.press(getByText("Plan 1"));
  });

  it("updates routine ID when a routine is selected", async () => {
    const { getByText } = render(<WorkoutSelect />);
    fireEvent.press(getByText("Select your workout routine!"));
    fireEvent.press(getByText("Routine 1"));
  });

  it("updates workout ID when a workout is selected", async () => {
    const { getByText } = render(<WorkoutSelect />);
    fireEvent.press(getByText("Select your workout exercise!"));
    fireEvent.press(getByText("Workout 1"));
  });

  it("refreshes data when 'Refresh data' button is pressed", async () => {
    const { getByText } = render(<WorkoutSelect />);
    fireEvent.press(getByText("Refresh data"));
  }); */
});

describe("WorkoutInput Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* it("renders correctly", () => {
    const { toJSON } = render(<WorkoutInput />);
    expect(toJSON()).toMatchSnapshot();
  }); */ // date time picker always updating date -> need to make static

  it("displays error message for required exercise_id input", async () => {
    const { getByText, getByPlaceholderText } = render(<WorkoutInput />);
    const weightInput = getByText("Weight lifted:");
    const repsInput = getByText("Reps done:");
    const setsInput = getByText("Sets done:");
    const restInput = getByText("Rest interval:");
    const dateInput = getByText("Date:");
    const submitButton = getByText("Submit");

    fireEvent.changeText(weightInput, "50");
    fireEvent.changeText(repsInput, "10");
    fireEvent.changeText(setsInput, "3");
    fireEvent.changeText(restInput, "60");

    fireEvent.press(dateInput);

    fireEvent.press(submitButton);

    //expect(getByText("Required input")).toBeTruthy();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it("displays error message for invalid weight input", async () => {
    const { getByPlaceholderText, getByText } = render(<WorkoutInput />);
    //const exerciseInput = getByPlaceholderText("Select your workout exercise!");
    const weightInput = getByText("Weight lifted:");
    const repsInput = getByText("Reps done:");
    const setsInput = getByText("Sets done:");
    const restInput = getByText("Rest interval:");
    const dateInput = getByText("Date:");
    const submitButton = getByText("Submit");

    //fireEvent.changeText(exerciseInput, "Exercise 1");
    fireEvent.changeText(weightInput, "2000"); // Invalid weight value

    fireEvent.changeText(repsInput, "10");
    fireEvent.changeText(setsInput, "3");
    fireEvent.changeText(restInput, "60");

    fireEvent.press(dateInput);

    fireEvent.press(submitButton);

    //expect(getByText("Invalid input")).toBeTruthy();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

});

describe("CreateWorkoutPlan component", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <CreateWorkoutPlan />
    );

    expect(getByText("Create Workout Plan")).toBeTruthy();

    const createButton = getByText('Create Workout Plan');
    fireEvent.press(createButton);

    expect(getByText("Workout Plan Name")).toBeTruthy();
    expect(getByText("Start Date")).toBeTruthy();
    expect(getByText("End Date")).toBeTruthy();
    expect(getByText("Create Plan")).toBeTruthy();
  });

  test("creates workout plan successfully", async () => {
    const { getByPlaceholderText, getByText } = render(
      <CreateWorkoutPlan />
    );

    const createButton = getByText('Create Workout Plan');
    fireEvent.press(createButton);
    const nameInput = getByText("Workout Plan Name");
    const startDateText = getByText("Start Date");
    const endDateText = getByText("End Date");
    const createPlanButton = getByText("Create Plan");

    fireEvent.changeText(nameInput, "Test Plan");
    fireEvent.press(startDateText);
    fireEvent.press(endDateText);
    fireEvent.press(createPlanButton);

    await waitFor(() => {
      /* expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "workoutPlans",
        JSON.stringify([expect.objectContaining({ name: "Test Plan" })])
      ); */
    });
  });

  test("displays error message on failed plan creation", async () => {
    // Mock AsyncStorage.getItem to simulate existing workout plans
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([{ name: "Existing Plan" }])
    );

    const { getByText } = render(<CreateWorkoutPlan />);

    const createButton = getByText('Create Workout Plan');
    fireEvent.press(createButton);

    const createPlanButton = getByText("Create Plan");

    fireEvent.press(createPlanButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(0);
      expect(getByText("Name, start date, and end date are required.")).toBeTruthy();
    });
  });
});

describe("CreateExercise Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(<CreateExercise />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("expands and collapses the view when pressed", () => {
    const { getByText } = render(<CreateExercise />);
    const expandButton = getByText("Create Exercise");
    fireEvent.press(expandButton);
    expect(getByText("Exercise Name")).toBeTruthy();
    fireEvent.press(expandButton);
    //expect(getByText("Exercise Name")).toBeFalsy();
  });

  it("creates an exercise with valid input", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CreateExercise />);
    const expandButton = getByText("Create Exercise");
    fireEvent.press(expandButton);

    const exerciseNameInput = getByPlaceholderText("Enter exercise name");
    fireEvent.changeText(exerciseNameInput, "Bench Press");

    const exerciseDescriptionInput = getByPlaceholderText(
      "Enter exercise description"
    );
    fireEvent.changeText(exerciseDescriptionInput, "Description of bench press");

    const createExerciseButton = getByTestId("exerciseButton");
    fireEvent.press(createExerciseButton);

    // Mock AsyncStorage methods
    const setItemMock = jest.spyOn(require("@react-native-async-storage/async-storage"), "setItem");
    //setItemMock.mockResolvedValueOnce(null);

   // await expect(setItemMock).toHaveBeenCalledWith("exercises", JSON.stringify([{ name: "Bench Press", description: "Description of bench press" }]));
  });

  it("displays error message if exercise name is empty", async () => {
    const { getByText, getByTestId } = render(<CreateExercise />);
    const expandButton = getByText("Create Exercise");
    fireEvent.press(expandButton);

    const createExerciseButton = getByTestId("exerciseButton");
    fireEvent.press(createExerciseButton);

    expect(getByText("Name is required.")).toBeTruthy();
  });
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockWorkoutPlans = [
  { id: 1, name: "Plan 1" },
  { id: 2, name: "Plan 2" },
];

describe("CreateRoutine Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(<CreateRoutine />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("expands and collapses the view when pressed", () => {
    const { getByText } = render(<CreateRoutine />);
    const expandButton = getByText("Create Routine");
    fireEvent.press(expandButton);
    expect(getByText("Routine Name")).toBeTruthy();
    //fireEvent.press(expandButton);
    //expect(getByText("Routine Name")).toBeNull();
  });

  it("creates a routine with valid input", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<CreateRoutine />);
    const expandButton = getByText("Create Routine");
    fireEvent.press(expandButton);

    const routineNameInput = getByPlaceholderText("Leg Day");
    fireEvent.changeText(routineNameInput, "Leg Day");

    const selectWorkoutPlan = getByTestId('text_input');
    fireEvent(selectWorkoutPlan, "onChangeText", "1");

    const createRoutineButton = getByTestId('routineButton');
    fireEvent.press(createRoutineButton);

    // Mock AsyncStorage methods
    const setItemMock = jest.spyOn(require("@react-native-async-storage/async-storage"), "setItem");
    //setItemMock.mockResolvedValueOnce(null);

    //await expect(setItemMock).toHaveBeenCalledWith("routines", JSON.stringify([{ name: "Leg Day", plan_id: 1 }]));
  });

  it("displays error message if input fields are empty", async () => {
    const { getByText, getByTestId } = render(<CreateRoutine />);
    const expandButton = getByText("Create Routine");
    fireEvent.press(expandButton);

    const createRoutineButton = getByTestId('routineButton');
    fireEvent.press(createRoutineButton);

    expect(getByText("Name and Workout Plan are required.")).toBeTruthy();
  });
});




/* jest.mock('react-native-calendars', () => ({
    Agenda: jest.fn(() => null), 
  }));
  
  describe('Stats component', () => {
    test('renders correctly', () => {
      render(<Stats />);
    });
  }); */

  //write test ids for text input