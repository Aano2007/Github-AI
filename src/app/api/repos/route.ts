import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: response.status });
  }

  const repos = await response.json();
  return NextResponse.json(repos, {
    headers: { 'Cache-Control': 's-maxage=3600' },
  });
}
