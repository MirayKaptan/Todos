import Link from "next/link";
import TodoItem from "@/components/TodoItem";
import { prisma } from "./db";

function getTodos() {
  return prisma.todo.findMany();
  // prisma.todo.create({ data: { title: "test", complete: false } });
}
async function toggleTodo(id: string, complete: boolean) {
  "use server";
  console.log(id, complete);
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl">To Do List</h1>
        <Link
          className="border border-slate-200 text-slate-300 rounded p-2 hover: bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul>
        {todos.map((todo: any) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
