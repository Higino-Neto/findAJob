import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import { useEffect, useState } from "react";
import { useChangeStatusApplicationMutate } from "@/hooks/useChangeStatusApplicationMutate";
import { ApplicationData } from "@/types/application-data.dto";
import { Button } from "../shadcn-ui/button";

type JobStatus = "pending" | "accepted" | "rejected";
type DraftStatus = "rejected" | "accepted" | null;

type SelectJobStatusProps = {
  selectedApplication: ApplicationData | null;
};

const statusColor: Record<JobStatus, string> = {
  pending: "text-muted-foreground",
  accepted: "text-green-500",
  rejected: "text-red-500",
};

export default function SelectJobStatus({
  selectedApplication,
}: SelectJobStatusProps) {
  const [jobStatus, setJobStatus] = useState<JobStatus>("pending");
  const [draftStatus, setDraftStatus] = useState<DraftStatus>(null);
  const { mutate } = useChangeStatusApplicationMutate();

  function normalizeJobStatus(value: string): JobStatus {
    const v = value.toLowerCase();
    if (v === "pending" || v === "accepted" || v === "rejected") {
      return v;
    }

    return "pending";
  }

  useEffect(() => {
    setDraftStatus(null);
    setJobStatus(normalizeJobStatus(selectedApplication?.status ?? "pending"));
  }, [selectedApplication]);
  
  const handleStatusChange = (value: string) => {
    setJobStatus(normalizeJobStatus(value));
    if (value !== "pending") {
      setDraftStatus(value as DraftStatus);
    }
  };

  const handleRejectApplication = async (
    applicationId: string,
    applicationStatus: string,
  ) => {
    await fetch(
      `/api/applications/delete-curriculum/${selectedApplication!.curriculumPath}`,
      {
        method: "DELETE",
      },
    );

    mutate({
      applicationId: applicationId,
      applicationStatus: applicationStatus,
    });
  };
  return (
    <>
      <div className="mt-4">
        <Select value={jobStatus} onValueChange={handleStatusChange}>
          <SelectTrigger
            className={cn(
              "w-45",
              statusColor[jobStatus] ?? "text-muted-foreground",
            )}
          >
            <SelectValue placeholder="(default) PENDING" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">PENDING</SelectItem>
            <SelectItem value="accepted" className="text-green-500">
              ACCEPTED
            </SelectItem>
            <SelectItem value="rejected" className="text-red-500">
              REJECTED
            </SelectItem>
          </SelectContent>
        </Select>

        <div>
          <Dialog
            open={draftStatus === "accepted"}
            onOpenChange={(open) => {
              if (!open) {
                setDraftStatus(null);
                setJobStatus(normalizeJobStatus(selectedApplication!.status));
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to accept/approve this candidate?
                </DialogTitle>
                <DialogDescription>
                  Future description for accept a user here.
                </DialogDescription>
              </DialogHeader>
              <Button onClick={() => {}}>Accept</Button>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={draftStatus === "rejected"}
            onOpenChange={(open) => {
              if (!open) {
                setDraftStatus(null);
                setJobStatus(normalizeJobStatus(selectedApplication!.status));
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to reject/reprove this candidate? (This
                  application will disapear)
                </DialogTitle>
                <DialogDescription>
                  Future description to reject a user here.
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={() => {
                  handleRejectApplication(selectedApplication!.id, "REJECTED");
                }}
              >
                Reject
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
