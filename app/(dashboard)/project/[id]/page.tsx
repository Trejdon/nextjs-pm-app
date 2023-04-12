import TasksCard from "@/components/TasksCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({ params }: { params: {id: string;}}) {
  const project = await getData(params.id);

  // TODO: Consider a better way to handle the page being blocked by the data load
  // Spinner is ezmode, or create some default JSX and move the data fetch down and suspense around it

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      {/* @ts-expect-error Server Component */}
      <TasksCard tasks={project?.tasks} title={project?.name} />
    </div>
  );
}
