import { useState } from "react";

import { ButtonBase, Grid } from "@mui/material";

import UploadFileButton from "@features/trip/components/Files/UploadFileButton";
import AppDialog from "@features/ui/AppDialog";

import { TRIP_PREVIEW_IMAGES } from "../data";
import type { Trip } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (previewImage: Trip["previewImage"]) => void;
}

export default function PreviewImageDialog({ isOpen, onClose, onSave }: Props) {
  const [selectedPreviewImage, setSelectedPreviewImage] =
    useState<Trip["previewImage"]>(null);

  const onSaveClick = () => onSave(selectedPreviewImage);

  return (
    <AppDialog
      title="Select your preview image"
      primaryButtonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onPrimaryButtonClick={onSaveClick}
    >
      {/* Main Grid container (2 columns on xs, 3 on md) */}
      <Grid container spacing={{ xs: 0.5, md: 1.5 }} columns={{ xs: 2, md: 3 }}>
        {TRIP_PREVIEW_IMAGES.map((image) => (
          <Grid item xs={1} md={1} key={image.id}>
            <ButtonBase
              sx={{
                borderRadius: 4,
                border: 4,
                borderColor:
                  selectedPreviewImage?.templateImageId === image.id
                    ? "primary.main"
                    : "white",
                overflow: "hidden",
              }}
              onClick={() =>
                setSelectedPreviewImage({ templateImageId: image.id })
              }
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                style={{ width: "100%" }}
              />
            </ButtonBase>
          </Grid>
        ))}

        {/* Upload button */}
        <Grid item xs={1} md={1}>
          <UploadFileButton
            mainText="Upload preview photo"
            subText="PNG or PDF (max. 3MB)"
            sx={{ border: 4, borderColor: "white" }}
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
