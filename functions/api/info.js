/** Cloudflare Pages Function /api/info : read-only CSV proxy.
 * Configure INFO_FEED_URL as an environment variable in Cloudflare Pages.
 * The upstream web app returns ONLY the published extra data, never the review queue.
 */
export async function onRequestGet({ env }) {
  const value=String(env.INFO_FEED_URL||'').trim();
  let feed;
  try { feed=new URL(value); } catch (_) { return new Response('追加情報の公開設定が未完了です。',{status:503}); }
  if(feed.protocol!=='https:' || feed.hostname!=='script.google.com' || !feed.pathname.startsWith('/macros/s/'))
    return new Response('公開URLの設定を確認してください。',{status:503});
  try{
    const response=await fetch(feed.toString(), {redirect:'follow',headers:{'Accept':'text/csv,text/plain'}});
    if(!response.ok)throw new Error('upstream status '+response.status);
    const text=await response.text();
    if(text.length>2_000_000 || !text.startsWith('"id","type","name","mapId","x","y","category","location","memo","related","status"'))
      throw new Error('unexpected feed');
    return new Response(text,{status:200,headers:{'Content-Type':'text/csv; charset=utf-8','Cache-Control':'public, max-age=60','X-Content-Type-Options':'nosniff','Access-Control-Allow-Origin':'*'}});
  }catch(_){return new Response('追加情報を取得できません。',{status:503,headers:{'Cache-Control':'no-store'}});}
}
