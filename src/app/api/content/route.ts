import { NextResponse } from 'next/server';

type ContentItem = { id: string; [key: string]: string };
type ContentStore = { testimonials: ContentItem[]; images: ContentItem[]; videos: ContentItem[] };

const contentPath = 'src/data/site-content.json';
const emptyContent: ContentStore = { testimonials: [], images: [], videos: [] };

function config() {
  return {
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || 'main',
    token: process.env.GITHUB_TOKEN,
    adminToken: process.env.ADMIN_CONTENT_TOKEN,
  };
}

function isContentStore(value: unknown): value is ContentStore {
  if (!value || typeof value !== 'object') return false;
  const content = value as Record<string, unknown>;
  return ['testimonials', 'images', 'videos'].every((key) => Array.isArray(content[key]) && content[key].every((item) => item && typeof item === 'object' && typeof (item as ContentItem).id === 'string'));
}

function githubHeaders(token: string) {
  return { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28' };
}

async function readGithubFile(owner: string, repo: string, branch: string, token: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${contentPath}?ref=${encodeURIComponent(branch)}`, { headers: githubHeaders(token), cache: 'no-store' });
  if (!response.ok) throw new Error(`GitHub read failed: ${response.status}`);
  const file = await response.json() as { content?: string; sha?: string };
  if (!file.content || !file.sha) throw new Error('GitHub content response is incomplete');
  const content = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'));
  if (!isContentStore(content)) throw new Error('Stored content has an invalid format');
  return { content, sha: file.sha };
}

export async function GET() {
  const { owner, repo, branch, token } = config();
  if (!owner || !repo || !token) return NextResponse.json(emptyContent);
  try {
    const { content } = await readGithubFile(owner, repo, branch, token);
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to read content' }, { status: 502 });
  }
}

export async function PUT(request: Request) {
  const { owner, repo, branch, token, adminToken } = config();
  if (!owner || !repo || !token || !adminToken) return NextResponse.json({ error: 'GitHub storage is not configured' }, { status: 503 });
  if (request.headers.get('authorization') !== `Bearer ${adminToken}`) return NextResponse.json({ error: 'Invalid admin token' }, { status: 401 });

  try {
    const body: unknown = await request.json();
    if (!isContentStore(body)) return NextResponse.json({ error: 'Invalid content format' }, { status: 400 });
    const current = await readGithubFile(owner, repo, branch, token);
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${contentPath}`, {
      method: 'PUT',
      headers: { ...githubHeaders(token), 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Update site content from admin', content: Buffer.from(`${JSON.stringify(body, null, 2)}\n`, 'utf8').toString('base64'), branch, sha: current.sha }),
    });
    if (!response.ok) throw new Error(`GitHub write failed: ${response.status}`);
    const result = await response.json() as { commit?: { sha?: string; html_url?: string } };
    return NextResponse.json({ ok: true, commit: result.commit?.sha, url: result.commit?.html_url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save content' }, { status: 502 });
  }
}
