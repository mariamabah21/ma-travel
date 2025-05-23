import { PURGE } from "redux-persist";
import { v4 as uuidv4 } from "uuid";

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { Trip } from "@features/trip/types";
import { type RootState } from "@store/index";

// Define the initial state using that type
interface TripWizardState {
  trip: Trip;
  currentStep: number;
}

const getInitialState = () => ({
  currentStep: 0,
  trip: {
    id: uuidv4(),
    name: "",
    previewImage: null,
    description: "",
    startDate: null,
    endDate: null,
    locationForm: "",
    destinations: [{ id: uuidv4(), name: "" }],
    places: [{ id: uuidv4(), name: "", isChecked: false }],
    expenses: [],
    documents: [],
    packingLists: [],
    photos: [],
    locationFrom: "",
  },
});

const initialState: TripWizardState = getInitialState();

export const tripWizardSlice = createSlice({
  name: "tripWizard",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      if (state.currentStep === 0) {
        throw new Error("You are already on the first step. You can't go back");
      }
      state.currentStep -= 1;
    },
    setTravelInformation: (
      state,
      action: PayloadAction<
        Pick<
          Trip,
          "startDate" | "endDate" | "name" | "previewImage" | "description"
        >
      >,
    ) => {
      state.trip.name = action.payload.name;
      state.trip.description = action.payload.description;
      state.trip.endDate = action.payload.endDate;
      state.trip.startDate = action.payload.startDate;
      state.trip.previewImage = action.payload.previewImage;
    },

    setLocationFrom: (state, action: PayloadAction<Trip["locationFrom"]>) => {
      state.trip.locationFrom = action.payload;
    },
    setDestinations: (state, action: PayloadAction<Trip["destinations"]>) => {
      state.trip.destinations = action.payload;
    },
    setPlaces: (state, action: PayloadAction<Trip["places"]>) => {
      state.trip.places = action.payload;
    },
    setExpenses: (state, action: PayloadAction<Trip["expenses"]>) => {
      state.trip.expenses = action.payload;
    },
    setDocuments: (state, action: PayloadAction<Trip["documents"]>) => {
      state.trip.documents = action.payload;
    },
    setPhotos: (state, action: PayloadAction<Trip["photos"]>) => {
      state.trip.photos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return getInitialState();
    });
  },
});

export const {
  nextStep,
  previousStep,
  setTravelInformation,
  setLocationFrom,
  setDestinations,
  setPlaces,
  setExpenses,
  setDocuments,
  setPhotos,
} = tripWizardSlice.actions;

export const selectCurrentStep = (state: RootState) =>
  state.tripWizard.currentStep;

export const selectWizardTrip = (state: RootState) => state.tripWizard.trip;
// export const selectUser = (state: RootState) => state.auth.user;

export default tripWizardSlice.reducer;

// |
