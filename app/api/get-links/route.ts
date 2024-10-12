import jwt from 'jsonwebtoken';
import { readDataFromFile } from '@/helpers/readWriteData';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Extract the token from the Authorization header
  const token = req.headers.get('authorization')?.split(' ')[1]; // Bearer token

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized user' }, { status: 401 });
  }

  try {
    // Verify the token
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || 'link_sharing_app'
    );
    const email = decoded?.email;

    // Read existing links from the JSON file
    const existingLinks = await readDataFromFile('links.json');

    // Find the user's links by email
    const userLinks = existingLinks.find((link: any) => link.email === email);

    if (!userLinks) {
      return NextResponse.json(
        { message: 'No links found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({ links: userLinks.links }, { status: 200 });
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json(
      { message: 'Failed to retrieve links' },
      { status: 500 }
    );
  }
}
