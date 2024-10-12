import jwt from 'jsonwebtoken';
import { readDataFromFile, writeDataToFile } from '@/helpers/readWriteData';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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

    // Read existing links from the file
    const existingLinks = await readDataFromFile('links.json');

    // Find the index of the user with the same email
    const linkIndex = existingLinks.findIndex(
      (user: any) => user.email === email
    );

    const requestBody = await req.json();
    console.log(requestBody.links);

    if (linkIndex !== -1) {
      existingLinks[linkIndex].links = requestBody.links;
    } else {
      // If the user doesn't exist, creating a new entry
      const newLinks = { email, links: [...requestBody.links] };
      existingLinks.push(newLinks);
    }

    await writeDataToFile(existingLinks, 'links.json');

    return NextResponse.json(
      { message: 'Links saved successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json(
      { message: 'Failed to save links' },
      { status: 401 }
    );
  }
}
