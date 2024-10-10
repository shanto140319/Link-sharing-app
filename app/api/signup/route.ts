import { readDataFromFile, writeDataToFile } from '@/helpers/readWriteData';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log('email', email);
  console.log('password', password);
  // Read the current user data from the JSON file
  const users = await readDataFromFile('user.json');
  console.log('users', users);

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

  // Create a new user object
  const newUser = { email, password: hashedPassword };

  // Add the new user to the array
  users.push(newUser);

  // Write the updated users array back to the JSON file
  await writeDataToFile(users, 'user.json');

  return NextResponse.json(
    { message: 'User created successfully' },
    { status: 201 }
  );
}
