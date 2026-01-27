import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteApplication = async (id: string) => {
  const deletedApplication = await fetch(`/api/applications/${id}`, {
    method: "DELETE",
  });

  return deletedApplication;
};

export function useDeleteApplicationMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });

  return mutate;
}
