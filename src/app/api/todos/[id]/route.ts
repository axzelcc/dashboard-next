import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  }
}

export async function GET(request: Request, { params }:Segments) { 
  
  const todo = await prisma.todo.findFirst({
    where: {
      id: params.id
    }
  })
  
  if ( !todo ) {
    return NextResponse.json({ message: 'No se encontro el id del TODO'}, { status: 400 })
  }
  
  return NextResponse.json(todo);
}

const putSchema  = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
})

export async function PUT(request: Request, { params }:Segments) { 

  const todo = await prisma.todo.findFirst({
    where: {
      id: params.id
    }
  })
  
  if ( !todo ) {
    return NextResponse.json({ message: 'No se encontro el id del TODO'}, { status: 400 })
  }

  try {
    const { complete, description } = await putSchema.validate( await request.json() );

    const updateTodo = await prisma.todo.update({
      where: { id:params.id },
      data: { complete, description }
    })
    
    return NextResponse.json(updateTodo);

  } catch (error:any) {
    
    return NextResponse.json( error.message , {status: 400});    

  }

}