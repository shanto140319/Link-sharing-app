import { readDataFromFile } from '@/helpers/readWriteData';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'link_sharing_app';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Reading user data from the JSON file
  const users = await readDataFromFile('user.json');

  const user = users.find((user: any) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: '10d',
  });

  // Return the token to the client
  return NextResponse.json(
    { message: 'Login successful', token },
    { status: 200 }
  );
}
