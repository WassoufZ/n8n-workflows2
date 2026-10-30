// Telegram commands for the kill switch (agency/D §3.5): /pause <reason>, /resume <reason>,
// /status. Only allowlisted Telegram user IDs may change anything; resuming needs a reason.
const S = $('⚙️ Settings').first().json;
const msg = $input.first().json.message || {};
const text = String(msg.text || '').trim();
const from = String(msg.from?.id || '');
const allowed = String(S.ADMIN_TELEGRAM_IDS || '').split(/[,\s]+/).filter(Boolean);
const [cmd, ...rest] = text.split(/\s+/);
const reason = rest.join(' ');
const reply = (t) => [{ json: { action: 'reply', chat_id: msg.chat?.id, reply: t } }];
if (!['/pause', '/resume', '/status'].includes(cmd)) return [];
if (!allowed.includes(from)) return reply('Not authorised.');
if (cmd === '/status') return [{ json: { action: 'status', chat_id: msg.chat?.id } }];
if (cmd === '/resume' && !reason) return reply('Resuming needs a reason: /resume <why it is safe now>');
const now = $now.setZone(S.TIMEZONE).toISO();
const updates = cmd === '/pause'
  ? [['global_enabled', 'FALSE'], ['paused_reason', reason || 'paused from Telegram'], ['paused_by', from], ['paused_at', now]]
  : [['global_enabled', 'TRUE'], ['paused_reason', ''], ['resumed_reason', reason], ['resumed_by', from], ['resumed_at', now]];
return updates.map(([key, value]) => ({ json: { action: 'update', chat_id: msg.chat?.id, key, value, reply: cmd === '/pause' ? `⏸ Paused. Nothing will be posted until /resume. Reason: ${reason || '-'}` : `▶️ Resumed. Reason: ${reason}` } }));
