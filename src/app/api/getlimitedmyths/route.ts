import prisma from '@/database/prismclient'
import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = await prisma.myths.findMany({
    take: 5,
    orderBy: {
      created_at: "desc",
    },
    select:{
        title:true,
        shrotsec:true,
        date:true,
        postcode:true,
    }
  });
 
  return NextResponse.json({ res })
}