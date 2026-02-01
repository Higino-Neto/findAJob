import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Job } from "@/types/job";

type JobProps = {
  jobs: Job[];
  setSelectedJob: (job: Job) => void;
};

export function SwiperJobs({ jobs, setSelectedJob }: JobProps) {
  return (
    <>
      <Swiper
        spaceBetween={15}
        slidesPerView={5.5}
        modules={[Navigation]}
        navigation
      >
        {jobs.map((job) => {
          return (
            <SwiperSlide key={job.id}>
              <button
                onClick={() => setSelectedJob(job)}
                className="w-full text-start hover:cursor-pointer rounded bg-white shadow p-2"
              >
                <div className="">
                  <h1>{job.title}</h1>
                  <p>{job.company}</p>
                  <p>{job.type}</p>
                  <p>{job.salary}</p>
                </div>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
