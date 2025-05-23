import { type SubmitHandler } from "react-hook-form";

import { Trip } from "@features/trip/types";
import { useAppDispatch, useAppSelector } from "@store/index";

import {
  nextStep,
  selectWizardTrip,
  setPlaces,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";
import PlacesForm from "../PlacesForm";

interface FormInput {
  places: Trip["places"];
}

export default function Places() {
  const { places, onSubmit } = usePlacesForm();

  return (
    <PlacesForm
      defaultPlaces={places}
      onSubmit={onSubmit}
      SubmitComponent={<Pagination />}
    />
  );
}

function usePlacesForm() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setPlaces(data.places));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    places: trip.places,
  };
}
