import React from 'react';
import { render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
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
  });

});
/* 
describe('Sign-In Page', () => {
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

});

describe('Sign-Up Page', () => {
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

});



describe('Create Page', () => {
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

});

describe('CreatePlan Component', () => {
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

});

describe('CreateRoutine Component', () => {
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

});

describe('CreateExercise Component', () => {
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

});
 */


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

describe('WorkoutInput component', () => {
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
  }); */
});

describe('MarkSets component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<MarkSets />);
    
    // Assert that required elements are rendered
    expect(getByText('Workout Notes')).toBeTruthy();
  });


});



/* describe('Stats Page', () => {
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

});

describe('StatsGraph Component', () => {
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

});

describe('StatsCalendar Component', () => {
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
        expect(getByText(mockUsername)).toBeTruthy();
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
    expect(getByText(userInfo.gender)).toBeTruthy();
    expect(getByText('Date of Birth:')).toBeTruthy();
    expect(getByText(userInfo.DoB)).toBeTruthy();
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




/* jest.mock('react-native-calendars', () => ({
    Agenda: jest.fn(() => null), 
  }));
  
  describe('Stats component', () => {
    test('renders correctly', () => {
      render(<Stats />);
    });
  }); */

  