import React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import Landing from './landing';
import StatsCalendar from "../components/statsCalendar.jsx";
import StatsGraphs from "../components/statsGraphs.jsx";
import WorkoutInput from '../components/workoutInput.jsx';
import WorkoutSelect from '../components/workoutSelect.jsx';
import MarkSets from '../components/markSets.jsx';
import LogTab from "./logTab.jsx";



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

describe("LogTab Component", () => {
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


/* jest.mock('react-native-calendars', () => ({
    Agenda: jest.fn(() => null), 
  }));
  
  describe('Stats component', () => {
    test('renders correctly', () => {
      render(<Stats />);
    });
  }); */

  