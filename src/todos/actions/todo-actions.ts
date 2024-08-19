'use server';

import { getUserSessionServer } from "@/auth";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async( seconds: number = 0) => {
  return  new Promise (  resolve => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  })
}


export const toggleTodo = async( id: string, complete: boolean): Promise<Todo> => {

  await sleep(3);

  const todo = await prisma.todo.findFirst({where: {id}});

  if(!todo){
    throw `Todo con id ${id} no  econtrado`;
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete }
  });

  revalidatePath('/dashboard/server-todos');
  return updateTodo;
}

export const addTodo = async(  description: string  ) => {
  
  try{
    const user = await getUserSessionServer();
    console.log(user);
    const todo = await prisma.todo.create({ data: { description, userId: `${user?.id}` } });
    revalidatePath('/dashboard/server-todos');

    return todo;

  } catch (error) {
    return {
      message: 'Error creando todo'
    }
  }

}

export const deleteTodo = async ():Promise<void> => {
  const user = await getUserSessionServer();
  await prisma.todo.deleteMany({
    where: { complete: true,  userId: user?.id}
  });
  revalidatePath('/dashboard/server-todos');

}