import { SITE } from '@/site.config';
/** ads.txt exigido pelo AdSense. Gera a linha automaticamente a partir de PUBLIC_ADSENSE_CLIENT (ca-pub-XXXX). */
export function GET() {
  const pub = SITE.adsenseClient.replace(/^ca-/, '');
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : `# Defina PUBLIC_ADSENSE_CLIENT para gerar a linha do AdSense\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
