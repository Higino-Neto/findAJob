import { render, screen } from "@testing-library/react";
import { SwiperJobs } from "../SwiperJobs";
import jobFactory from "./factories/job.factory";
import "@testing-library/jest-dom";

jest.mock("swiper/react", () => {
  return {
    Swiper: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="swiper">{children}</div>
    ),
    SwiperSlide: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="swiper-slide">{children}</div>
    ),
  };
});

jest.mock("swiper/modules", () => ({
  Navigation: {},
}));

jest.mock("swiper/css", () => {});
jest.mock("swiper/css/navigation", () => {});

describe("SwiperJobs", () => {
  it("should render correctly", () => {
    const jobsMock = [
      jobFactory({ title: "Frontend" }),
      jobFactory({ title: "Backend" }),
      jobFactory({ title: "Fullstack" }),
    ];
    const setSelectedJobMock = jest.fn();

    render(<SwiperJobs jobs={jobsMock} setSelectedJob={setSelectedJobMock} />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Fullstack")).toBeInTheDocument();
  });
});
