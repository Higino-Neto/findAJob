import { render, screen } from "@testing-library/react";
import ApplicationsList from "../ApplicationsList";
import applicationFactory from "./factories/application.factory";
import "@testing-library/jest-dom";

describe("ApplicationsList", () => {
  it("should render correctly", () => {
    const applicationsMock = [
      applicationFactory({
        status: "PENDING",
        user: { name: "João Silva", email: "joao.silva@gmail.com" },
      }),
      applicationFactory({
        status: "APPROVED",
        user: { name: "Fernando Costa", email: "fernando.costa@gmail.com" },
      }),
      applicationFactory({
        status: "PENDING",
        user: { name: "Renâ Nascimento", email: "rena.nascimento@gmail.com" },
      }),
    ];
    const setSelectedApplicationMock = jest.fn();

    render(
      <ApplicationsList
        applications={applicationsMock}
        setSelectedApplication={setSelectedApplicationMock}
      />,
    );

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("joao.silva@gmail.com")).toBeInTheDocument();
    expect(screen.getAllByText("PENDING")).toHaveLength(2);

    expect(screen.getByText("Fernando Costa")).toBeInTheDocument();
    expect(screen.getByText("fernando.costa@gmail.com")).toBeInTheDocument();

    expect(screen.getByText("Renâ Nascimento")).toBeInTheDocument();
    expect(screen.getByText("rena.nascimento@gmail.com")).toBeInTheDocument();
  });
});
