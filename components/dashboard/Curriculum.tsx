"use client";

import { useEffect, useState } from "react";
import { Button } from "../shadcn-ui/button";
import PdfPreview from "./pdfPreview";
import { ApplicationData } from "@/types/application-data.dto";

type CurriculumProps = {
  selectedApplication: ApplicationData | null;
};

export default function Curriculum({ selectedApplication }: CurriculumProps) {
  const [curriculumUrl, setCurriculumUrl] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    return () => {
      if (curriculumUrl) {
        URL.revokeObjectURL(curriculumUrl);
      }
    };
  }, [curriculumUrl]);

  useEffect(() => {
    if (!selectedApplication?.curriculumPath) {
      setCurriculumUrl("");
      return;
    }
    setIsClient(true);
    handleShowCurriculum(selectedApplication.curriculumPath);
  }, [selectedApplication]);

  const handleShowCurriculum = async (curriculumPath: string) => {
    try {
      const fileRes = await fetch(
        `/api/applications/download-curriculum/${curriculumPath}`,
      );
      if (!fileRes.ok) {
        console.error("Error downloading curriculum: ", fileRes.status);
        return;
      }

      const contentType = fileRes.headers.get("content-type");

      if (!contentType?.includes("application/pdf")) {
        console.error(
          "Requested curriculum isn't in the right format. Expected (application/pdf). Got ",
          contentType,
        );
        return;
      }

      const file = await fileRes.blob();

      if (curriculumUrl) {
        URL.revokeObjectURL(curriculumUrl);
      }

      const url = URL.createObjectURL(file);
      setCurriculumUrl(url);
    } catch (error) {
      console.error("Error creating curriculum URL: ", error);
      return;
    }
  };

  const downloadCV = async (username: string, url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `CV-${username.replaceAll(" ", "-")}.pdf`;
    a.click();
  };
  return (
    <>
      <div className="w-60 h-78 mt-3">
        {curriculumUrl && isClient && (
          <PdfPreview key={curriculumUrl} objectUrl={curriculumUrl} />
        )}
      </div>
      <Button
        onClick={() =>
          downloadCV(selectedApplication!.username!, curriculumUrl)
        }
        className="hover:cursor-pointer mb-3"
      >
        Download CV
      </Button>
    </>
  );
}
