// Formats the Control sheet for /status.
const rows = $input.all().map((i) => i.json).filter((r) => r.key);
const chat = $('Parse command').first().json.chat_id;
return [{ json: { chat_id: chat, reply: 'Control:\n' + rows.map((r) => `${r.key}: ${r.value}`).join('\n') } }];
