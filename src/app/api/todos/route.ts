import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { todo } from 'node:test';
import * as yup from 'yup';

export async function GET(request: Request) { 

  const { searchParams } = new URL(request.url)
  const take = searchParams.get('take') ?? '10';
  const skip = searchParams.get('skip') ?? '0';

  if ( isNaN (+take)) {
    return NextResponse.json({ message: 'El take tiene que ser un número'}, { status: 400 })
  }

  if ( isNaN (+skip)) {
    return NextResponse.json({ message: 'El skip tiene que ser un número'}, { status: 400 })
  }

  const todos = await prisma.todo.findMany({
    skip: +skip,
    take: +take,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete:yup.boolean().optional().default(false), //! TODO mostrar algo interesante
})

export async function POST(request: Request) { 
  // const todo = await request.json();
  // return NextResponse.json(todo);

  try{
    const { complete, description } = await postSchema.validate( await request.json() );
    const todo = await prisma.todo.create({ data: { complete, description } });
    return NextResponse.json(todo);  
  } catch (error) {
    return NextResponse.json( error, { status: 400 } );
  }


}

export async function DELETE(request: Request) { 
  // const todo = await request.json();
  // return NextResponse.json(todo);

  try{
    const todo = await prisma.todo.deleteMany({
      where: { complete: true }
    });
    return NextResponse.json('Se eliminaron ' + todo.count + ' registros');  
  } catch (error) {
    return NextResponse.json( error, { status: 400 } );
  }


}
