// Cloudflare Pages Function /api/npcs
// 公開設定されたGoogleシートだけを読み込みます。ユーザー入力URLは受け取りません。
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSjZh-s-aml_JB0vtmZgZcZEI3qg4Tc-BSvSxUHXjuLDDTunPBz25ZxAaCmt5apquZr4fX6Fj_76Ks/pub?gid=0&single=true&output=csv';

export async function onRequestGet() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    let upstream;
    try {
      upstream = await fetch(SHEET_CSV_URL, {
        signal: controller.signal,
        headers: { 'Accept': 'text/csv,text/plain;q=0.9,*/*;q=0.5' },
        redirect: 'follow'
      });
    } finally {
      clearTimeout(timer);
    }
    if (!upstream.ok) {
      return new Response('CSV source HTTP ' + upstream.status, { status: 502, headers: { 'Content-Type':'text/plain; charset=utf-8', 'Cache-Control':'no-store' } });
    }
    const csv = await upstream.text();
    if (csv.length > 2000000 || /^\s*<(?:!doctype|html)/i.test(csv) || !/\bname\s*,/.test(csv)) {
      return new Response('Unexpected CSV response', { status: 502, headers: { 'Content-Type':'text/plain; charset=utf-8', 'Cache-Control':'no-store' } });
    }
    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=180',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    return new Response('CSV temporarily unavailable', { status: 502, headers: { 'Content-Type':'text/plain; charset=utf-8', 'Cache-Control':'no-store' } });
  }
}
