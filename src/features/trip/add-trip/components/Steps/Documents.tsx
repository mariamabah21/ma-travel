import FilesForm from "@features/trip/components/Files/FilesForm";
import { useAppDispatch, useAppSelector } from "@store/index";

import type { TripFile } from "../../../types";
import {
  nextStep,
  selectWizardTrip,
  setDocuments,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

export default function Documents() {
  const { documents, onSubmit, onChange } = useDocumentsForm();

  return (
    <FilesForm
      defaultFiles={documents}
      onSubmit={onSubmit}
      SubmitComponent={<Pagination />}
      onChange={onChange}
      type="document"
    />
  );
}

function useDocumentsForm() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = (data: TripFile[]) => {
    dispatch(setDocuments(data));
    dispatch(nextStep());
  };

  const onChange = (data: TripFile[]) => {
    dispatch(setDocuments(data));
  };

  return {
    onSubmit,
    documents: trip.documents,
    onChange,
  };
}
