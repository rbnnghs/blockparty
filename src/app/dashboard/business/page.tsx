"use client";
import CopyTextField from "@/components/CopyTextField/copytextfield";
import CopyIcon from "@/components/Icons/CopyIcon";
import { XrplContext } from "@/hooks/useXrpl";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { makeid } from "@/lib/utils";

interface Task {
  id: string;
  maxspend: number;
  code: string;
  status: "pending" | "complete";
  wallet_address: string;
}

const exampleCode = `function add (a)
  local sum = 0
  for i, v in ipairs(a) do
    sum = sum + v
  end
  return sum
end
`;

export default function BusinessPage() {
  const { wallet, balance, createEscrow } = useContext(XrplContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskFormOpen, setTaskFormOpen] = useState(false);

  const [code, setCode] = useState("");
  const [maxSpend, setMaxSpend] = useState<number>();

  async function submitTask() {
    if (!maxSpend) {
      return;
    }
    const resp = await createEscrow(maxSpend)
    const newTask = {
      id: makeid(10),
      code,
      maxspend: maxSpend,
      wallet_address: wallet?.classicAddress ?? "",
      ...resp
    };

    console.log("Submitting new task:", newTask);

    try {
      
      const response = await axios.post("/api/tasks", newTask);
      console.log("Task submission response:", response);

      setTasks((tasks) => [
        ...tasks,
        {
          ...newTask,
          status: "pending",
        },
      ]);
      setMaxSpend(undefined);
      setCode("");
      setTaskFormOpen(false);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  }

  useEffect(() => {
    axios.get("/api/tasks").then((res) => setTasks(res.data.tasks ?? []));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 pb-10">
        <p className="font-semibold text-xl">Billing Account Info</p>
        <p className="text-stone-500 text-sm">
          Your current account balance is{" "}
          <span className="text-[#008aff]">{balance}</span>. Deposit more XRP
          directly to the address below to increase your available balance.
        </p>

        <CopyTextField
          placeholder="Wallet Address"
          value={wallet?.address ?? null}
        />
        <CopyTextField placeholder="Seed" hidden value={wallet?.seed ?? null} />
      </div>
      <hr />

      <div className="flex flex-col gap-3 pb-10">
        <p className="font-semibold text-xl">Submit Compute Task</p>
        <div className="flex flex-col gap-2">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-md p-2 flex flex-col gap-3 border border-black border-opacity-10"
            >
              <div className="flex gap-10 text-slate-500">
                <p className="font-semibold">Task {i + 1}</p>
                <p className="capitalize">{task.status}</p>
                <p className="text-slate-400 italic">
                  {task.code.slice(0, 50)}...
                </p>
              </div>
            </div>
          ))}
        </div>
        {taskFormOpen && (
          <div className="flex flex-col gap-3 bg-slate-50 p-4 border border-black border-opacity-10 rounded-lg">
            <p className="text-md font-medium">Job Descriptor</p>
            <input
              value={maxSpend}
              onChange={(e) =>
                setMaxSpend(Number.parseFloat(e.target.value ?? "0"))
              }
              placeholder="Max Compute Spend (20 XRP)"
              type="number"
              className="bg-slate-100 rounded-md resize-none p-4 w-full focus:outline-none"
            />
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={exampleCode}
              className="bg-slate-100 rounded-md resize-none h-[25rem] p-4 w-full focus:outline-none"
            />
            <button
              className="py-2 px-4 text-[#008aff] transition-all flex max-w-[5rem] duration-200 hover:scale-105 active:scale-95"
              onClick={submitTask}
            >
              Submit
            </button>
          </div>
        )}
        <button
          className="py-2 px-4 text-[#008aff] transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={() => setTaskFormOpen((v) => !v)}
        >
          {taskFormOpen ? "Hide" : "+ New Task"}
        </button>
      </div>
    </div>
  );
}
