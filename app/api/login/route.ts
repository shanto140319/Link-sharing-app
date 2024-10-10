// app/api/login/route.ts
import { readDataFromFile } from '@/helpers/readWriteData';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Secret key for signing JWT (store this securely in .env)
const JWT_SECRET = 'link_sharing_app';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Read user data from the JSON file
  const users = await readDataFromFile('user.json');

  // Find the user by email
  const user = users.find((user: any) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  }

  // Generate a JWT token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: '3h',
  });

  // Return the token to the client
  return NextResponse.json(
    { message: 'Login successful', token },
    { status: 200 }
  );
}
