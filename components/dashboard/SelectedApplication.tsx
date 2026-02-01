import { ApplicationData } from "@/types/application-data.dto";
import Curriculum from "./Curriculum";
import SelectJobStatus from "./SelectJobStatus";

type SelectedApplicationProps = {
  selectedApplication: ApplicationData | null;
};

export default function SelectedApplication({
  selectedApplication,
}: SelectedApplicationProps) {
  return (
    <>
      {selectedApplication && (
        <div className="flex-col border border-gray-300 rounded-lg shadow-lg">
          <div className="flex flex-col text-start bg-white p-5 rounded-lg">
            <a className="text-2xl">{selectedApplication.username}</a>
            <a className="">{selectedApplication.email}</a>

            <div className="">
              <h1 className="text-2xl mt-5">Curriculum</h1>
              <Curriculum selectedApplication={selectedApplication} />
            </div>

            <a className="">
              <h1 className="text-2xl my-3 mt-10">Questions</h1>
              {selectedApplication.questionsWithAnswers.map(
                (questionWithAnswer) => {
                  if (questionWithAnswer.type === "open") {
                    return (
                      <div key={questionWithAnswer.id} className="m-1">
                        <p className="text-xl">
                          {questionWithAnswer.commandText}
                        </p>
                        <p>{questionWithAnswer.answer}</p>
                      </div>
                    );
                  } else if (questionWithAnswer.type === "multiple") {
                    return (
                      <div key={questionWithAnswer.id} className="m-1">
                        <p className="text-xl">
                          {questionWithAnswer.commandText}
                        </p>
                        <div>
                          {questionWithAnswer.options?.map((option) => (
                            <p
                              key={option.id}
                              className={
                                questionWithAnswer.selectedOption === option.id
                                  ? `text-blue-500`
                                  : ""
                              }
                            >
                              {option.text}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  }
                },
              )}
            </a>

            <SelectJobStatus selectedApplication={selectedApplication} />
            <a className="my-6">{selectedApplication.appliedAt}</a>
          </div>
        </div>
      )}
    </>
  );
}
