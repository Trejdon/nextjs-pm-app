import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import Greeting from "@/components/Greeting";
import GreetingSkeleton from "@/components/GreetingSkeleton";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";

// TODO: create a higher order withAuth function to auto check user auth before doing a data fetch
// TODO: see Greeting component as well

const getData = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

// TODO: Fetch a count of the projects for the user.  Pass that into a ProjectsContainer component that then
// independantly loads each project, suspense with a shimmer card and load in a small delay

export default async function Page() {
  const { projects } = await getData();
  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingSkeleton />}>
            {/* https://github.com/vercel/next.js/issues/42292 */}
            {/* @ts-expect-error Server Component */}
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 m-3">
          {projects.map((project) => {
            return (
              <div className="w-1/3 p-3" key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </div>
            );
          })}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
