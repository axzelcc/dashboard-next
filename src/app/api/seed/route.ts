import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('123'),
      roles: [ 'admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true},
          { description: 'Piedra del poder'},      
          { description: 'Piedra del tiempo'},
          { description: 'Piedra del espacio'},
          { description: 'Piedra del realidad'},
        ]
      }
    }
  })
  await prisma.todo.createMany({
    data: [

    ]
  })

  return NextResponse.json({ message: 'Seed Executed'});
}