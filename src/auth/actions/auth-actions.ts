
import prisma from "@/lib/prisma";
import bcryp from 'bcryptjs';
import { getServerSession } from "next-auth";
import { authOptions } from "../options/route";

export const getUserSessionServer = async() => {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export const singInEmailPassword = async( email: string, password: string ) => {
  if ( !email || !password ) return null;

  const user = await prisma.user.findUnique({ where:  {email} })

  if ( !user ) {
    const dbUser = await createUser( email, password );
    return dbUser;
  }


  if ( !bcryp.compareSync( password, user.password ?? '')){
    return null;
  }

  return user;
}

const createUser = async ( email: string, password: string ) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcryp.hashSync(password),
      name: email.split('@')[0],
    }
  });

  return user;
}