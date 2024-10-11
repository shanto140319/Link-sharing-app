import { readDataFromFile, writeDataToFile } from '@/helpers/readWriteData';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log('email', email);
  console.log('password', password);

  // Read the current user data from the JSON file
  const users = await readDataFromFile('user.json');

  // Check if user already exists
  const existingUser = users.find((user: any) => user.email === email);
  if (existingUser) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { email, password: hashedPassword };

  users.push(newUser);

  await writeDataToFile(users, 'user.json');

  return NextResponse.json(
    { message: 'User created successfully' },
    { status: 201 }
  );
}
