import { useMutation, useQueryClient } from "@tanstack/react-query";

const changeStatusApplication = async ({
  applicationId,
  applicationStatus,
}: {
  applicationId: string;
  applicationStatus: string;
}) => {
  const rejectedApplication = await fetch(
    `/api/applications/${applicationId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status: applicationStatus }),
    },
  );

  return await rejectedApplication.json();
};

export function useChangeStatusApplicationMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: changeStatusApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });

  return mutate;
}
