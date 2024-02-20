"use server";
import { redirect } from "next/navigation";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createTask = async (formData) => {
  const content = formData.get("content");
  console.log("content", content);
  await prisma.task.create({
    data: {
      content,
    },
  });
  revalidatePath("/task");
};
export const createCustomTask = async (prevState, formData) => {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 2000);
  // });
  const content = formData.get("content");
  const Task = z.object({
    content: z.string().min(3),
  });
  try {
    Task.parse({ content });
    await prisma.task.create({
      data: {
        content,
      },
    });
    revalidatePath("/tasks");
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
};

export const deleteTask = async (formData) => {
  const id = formData.get("id");
  try {
    await prisma.task.delete({
      where: { id },
    });
    revalidatePath("/tasks");
  } catch (error) {
    console.log(error);
  }
};

export const getTask = async (id) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const editTask = async (formData) => {
  const id = formData.get("id");
  const content = formData.get("content");
  const completed = formData.get("completed");

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      content,
      completed: completed === "on" ? true : false,
    },
  });
  redirect("/tasks");
};
