// import React from "react";

// const TaskUpdates = () => {
//   return <div>TaskUpdates</div>;
// };

// export default TaskUpdates;

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1bEzoAM7kZp
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function TaskUpdates() {
  const [tasks, setTasks] = useState([
    // { jobId: 1, progress: 45 },
    // { jobId: 2, progress: 0 },
    // { jobId: 3, progress: 100 },
  ]);
  console.log("first", tasks);
  useEffect(() => {
    // const eventSource = new EventSource("http://localhost:5000/events");
    const eventSource = new EventSource("http://64.227.172.82:5000/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setTasks((currentTasks) => {
        const taskIndex = currentTasks.findIndex(
          (task) => task.jobId === data.jobId
        );

        if (taskIndex !== -1) {
          // Update existing task
          const updatedTasks = [...currentTasks];
          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            progress: data.progress,
          };
          return updatedTasks;
        } else {
          // Add new task
          return [...currentTasks, data];
        }
      });

      console.log(data);
    };

    return () => eventSource.close();
  }, []);
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex items-center gap-4">
          <Link className="text-2xl font-bold" href="#">
            Tasks
          </Link>
        </div>
        <form className="flex-1 ml-auto sm:flex-initial">
          <Input
            className="w-full md:w-[300px] lg:w-[400px]"
            placeholder="Search tasks..."
            type="search"
          />
        </form>
      </header> */}
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-10">
        <div className="flex items-center gap-2 mb-4 md:gap-4">
          {/* <Button size="sm">Refresh</Button>
          <Button size="sm">Add Task</Button>
          <Button size="sm">Complete</Button>
          <Button size="sm">Delete</Button> */}
        </div>
        <Card>
          {tasks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 leading-none">
                    {/* <Checkbox id="task1" /> */}
                  </TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead className="text-center">Progress</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.jobId} className="bg-gray-100">
                    <TableCell className="leading-none">
                      {/* <Checkbox id={task.jobId} /> */}
                    </TableCell>
                    <TableCell className="font-medium">{task.jobId}</TableCell>
                    <TableCell className="text-center">
                      <span> {task.progress}%</span>
                      <Progress
                        className="h-1 w-full shrink-0"
                        value={task.progress}
                      />
                    </TableCell>
                    {task.progress === 100 ? (
                      <TableCell className="text-center">Completed</TableCell>
                    ) : (
                      <TableCell className="text-center">In Progress</TableCell>
                    )}
                    {/* <TableCell className="text-center">In Progress</TableCell> */}
                    <TableCell className="flex gap-2 text-right">
                      <Button
                        className="rounded-full"
                        size="icon"
                        variant="ghost"
                      >
                        <ChevronRightIcon className="w-4 h-4" />
                        <span className="sr-only">View task</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center p-4">
              <span>No pending task</span>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// <TableRow>
// <TableCell className="leading-none">
//   <Checkbox id="task3" />
// </TableCell>
// <TableCell className="font-medium">Task 2</TableCell>
// <TableCell className="text-center">
//   <span>100%</span>
//   <Progress className="h-1 w-full shrink-0" value={100} />
// </TableCell>
// <TableCell className="text-center">Completed</TableCell>
// <TableCell className="flex gap-2 text-right">
//   <Button className="rounded-full" size="icon" variant="ghost">
//     <ChevronRightIcon className="w-4 h-4" />
//     <span className="sr-only">View task</span>
//   </Button>
// </TableCell>
// </TableRow>
// <TableRow>
// <TableCell className="leading-none">
//   <Checkbox id="task4" />
// </TableCell>
// <TableCell className="font-medium">Task 3</TableCell>
// <TableCell className="text-center">
//   <span>70%</span>
//   <Progress className="h-1 w-full shrink-0" value={70} />
// </TableCell>
// <TableCell className="text-center">In Progress</TableCell>
// <TableCell className="flex gap-2 text-right">
//   <Button className="rounded-full" size="icon" variant="ghost">
//     <ChevronRightIcon className="w-4 h-4" />
//     <span className="sr-only">View task</span>
//   </Button>
// </TableCell>
// </TableRow>
