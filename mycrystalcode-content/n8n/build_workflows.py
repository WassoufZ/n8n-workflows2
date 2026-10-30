#!/usr/bin/env python3
"""Builds the My Crystal Code n8n workflows from the sources in this folder.

    python3 mycrystalcode-content/n8n/build_workflows.py

Inputs (single source of truth, edit these and rebuild):
  src/*.js                      Code-node scripts
  ../templates/mcc-slide.html   slide template (carousels + reel frames)
  ../01-brand-brief.md          brand & offer brief
  ../agency/B-formulas.json, B-strategist-data.json   content system
  ../agency/C-design-system.md  visual QA checklist (section 5)
  ../agency/D-compliance-governance.md  claims policy (section 1) + compliance prompt (section 3.3)
Outputs: workflows/*.json, importable in n8n (Workflows > Import from File).
"""
import hashlib
import json
import re
import uuid
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SRC = HERE / "src"
OUT = HERE / "workflows"
SETTINGS = "⚙️ Settings"


def read(path):
    return (ROOT / path).read_text(encoding="utf-8")


def section(text, start, end):
    i = text.index(start)
    j = text.index(end, i + len(start))
    return text[i:j].strip()


# ---------------------------------------------------------------- embedded knowledge
BRIEF = read("01-brand-brief.md")
D = read("agency/D-compliance-governance.md")
POLICY = section(D, "## 1. Claims policy", "## 2. Platform")
COMPLIANCE = section(D, "```text\nYou are the compliance gate", "```\n\n**n8n wiring")[len("```text\n"):]
COMPLIANCE = re.sub(r"\nINPUT\n.*?\n\nRULES", "\n\nRULES", COMPLIANCE, flags=re.S)
COMPLIANCE += "\n(The INPUT block follows below.)"
C = read("agency/C-design-system.md")
QA_CHECKLIST = section(C, "| ID | Check | Sev |", "Log every verdict")
FORMULAS = json.loads(read("agency/B-formulas.json"))
STRATEGY = json.loads(read("agency/B-strategist-data.json"))
for k in ("calendar_14d", "posting_slots", "doc", "generated", "version"):
    STRATEGY.pop(k, None)
TEMPLATE = read("templates/mcc-slide.html")
PROMPT_VERSION = hashlib.sha1((BRIEF + POLICY + COMPLIANCE + json.dumps(FORMULAS) + TEMPLATE).encode()).hexdigest()[:10]

CONTRACT = """The renderer is fixed. Break any rule below and the post is rejected before rendering.
CAROUSEL: exactly 8 slides. Slide 1 layout "cover", slide 8 layout "cta", slides 2-7 any of:
statement, list, quote, split, centers, sample. If the formula has more or fewer slides, merge or
split its middle slides to make exactly 8 (keep its hook, its save/share trigger and its CTA).
Formula layout codes: L1=cover, L2=statement, L3=list, L4=quote, L5=split, L6=centers, L7=sample, L8=cta.
Wrap the 1-3 emphasised words of a headline/statement/title in *asterisks* (gradient). English limits
below; Arabic limits are 90% of them. Counts exclude asterisks.
- every slide: eyebrow <=32 (short uppercase-style label, e.g. "SOUND FAMILIAR?"; Arabic: no uppercase)
- cover: headline <=60 (second-person question or open loop), sub <=70, glyph one of transmutation|seed|metatron|crystal
- statement: statement <=140, support <=120
- list: title <=48, items 3-5 of {text <=56 (<=60 when 5 items), sub <=60 optional}
- quote: question <=110, prompt <=40 (e.g. "SIT WITH THIS · SAVE IT")
- split: behavior <=40, reasons exactly 3 strings, each <=64
- centers: title <=40 optional; centers 1-7 of {key: root|sacral|solarPlexus|heart|throat|thirdEye|crown, name, state: care|working|rising|flowing, note <=38}. With ONE center it renders the large single-center variant and also shows body <=160.
- sample: title <=40, callout <=34, page 1-6 = real sample pages: 1 energy story, 2 pattern under pressure,
  3 energy-center map, 4 focus centers, 5 crystal protocol, 6 seven-day reset. English only (no Arabic sample exists). The template adds the "Lina is fictional" label itself.
- cta: button <=22 optional. Prices and the disclaimer are printed by the template from the site's price table.
REEL: exactly 5 beats {text <=60, seconds 1.5-6}, total 12-30 s. Beat 1 is the hook: <=7 words, lands in under 1.5 s.
Each beat renders as a full-screen text frame (owned brand background, or over the AI b-roll clip in the premium tier).
voiceover <=650 characters, matches the beats, calm and warm, no hype. broll_prompt: one 9:16 shot from the
design system's b-roll list (hands/objects/abstract light, no faces, no text, no religious symbols), motion described.
ALWAYS: hook <=90 (also the TikTok title); caption <=1800 without hashtags or footer; 3-5 hashtags from the
pillar's set; alt_text describes slide 1 or the reel; visual_description summarises what is on screen.
cta_tier one of T0, T1, T2 (Lite $8.88, link /crystal-match) or T3 (Full $18.88, link /quiz). Captions say "link in bio";
never paste URLs into captions."""


def js(name, **embeds):
    code = (SRC / name).read_text(encoding="utf-8")
    for key, value in embeds.items():
        token = f"/*@{key}@*/"
        default = re.escape(token) + r"(''|\[\]|\{\})"
        assert re.search(default, code), f"{name}: missing {token}"
        code = re.sub(default, lambda _m: json.dumps(value, ensure_ascii=False), code, count=1)
    return code


# ---------------------------------------------------------------- node helpers
class Flow:
    def __init__(self, name):
        self.name = name
        self.nodes = []
        self.conns = {}

    def add(self, name, type_, version, params, pos, **extra):
        node = {"parameters": params, "id": str(uuid.uuid5(uuid.NAMESPACE_URL, f"mcc/{self.name}/{name}")),
                "name": name, "type": type_, "typeVersion": version, "position": list(pos)}
        node.update(extra)
        self.nodes.append(node)
        return name

    def link(self, a, b, out=0, inp=0, kind="main"):
        outs = self.conns.setdefault(a, {}).setdefault(kind, [])
        while len(outs) <= out:
            outs.append([])
        outs[out].append({"node": b, "type": kind, "index": inp})

    def chain(self, *names):
        for a, b in zip(names, names[1:]):
            self.link(a, b)

    def note(self, title, text, pos, w=420, h=260, color=7):
        self.add(title, "n8n-nodes-base.stickyNote", 1, {"content": text, "height": h, "width": w, "color": color}, pos)

    def build(self, tags=()):
        names = {n["name"] for n in self.nodes}
        for a, kinds in self.conns.items():
            assert a in names, f"{self.name}: unknown source {a}"
            for outs in kinds.values():
                for out in outs:
                    for c in out:
                        assert c["node"] in names, f"{self.name}: unknown target {c['node']}"
        assert len(names) == len(self.nodes), f"{self.name}: duplicate node names"
        return {
            "name": self.name, "nodes": self.nodes, "connections": self.conns, "active": False,
            "settings": {"executionOrder": "v1", "timezone": "Asia/Dubai", "saveManualExecutions": True,
                         "callerPolicy": "workflowsFromSameOwner"},
            "pinData": {}, "tags": [{"name": t} for t in tags],
            "meta": {"templateCredsSetupCompleted": False, "promptVersion": PROMPT_VERSION},
        }


S = f"$('{SETTINGS}').first().json"


def code(flow, name, script, pos, **extra):
    return flow.add(name, "n8n-nodes-base.code", 2, {"jsCode": script}, pos, **extra)


def sheet_read(flow, name, tab, pos, **extra):
    return flow.add(name, "n8n-nodes-base.googleSheets", 4.5, {
        "operation": "read",
        "documentId": {"__rl": True, "value": f"={{{{ {S}.SHEET_ID }}}}", "mode": "id"},
        "sheetName": {"__rl": True, "value": tab, "mode": "name"},
        "options": {},
    }, pos, **extra)


def sheet_write(flow, name, tab, op, pos, match=None, values=None, **extra):
    columns = {"mappingMode": "autoMapInputData", "value": {}, "matchingColumns": [match] if match else [], "schema": []}
    if values:
        columns = {"mappingMode": "defineBelow", "value": values, "matchingColumns": [match] if match else [],
                   "schema": [{"id": k, "displayName": k, "required": False, "defaultMatch": False, "display": True,
                               "type": "string", "canBeUsedToMatch": True} for k in values]}
    params = {"operation": op,
              "documentId": {"__rl": True, "value": f"={{{{ {S}.SHEET_ID }}}}", "mode": "id"},
              "sheetName": {"__rl": True, "value": tab, "mode": "name"},
              "columns": columns, "options": {}}
    return flow.add(name, "n8n-nodes-base.googleSheets", 4.5, params, pos, **extra)


def telegram_text(flow, name, text, pos, chat=None, **extra):
    return flow.add(name, "n8n-nodes-base.telegram", 1.2, {
        "chatId": chat or f"={{{{ {S}.TELEGRAM_CHAT_ID }}}}", "text": text,
        "additionalFields": {"appendAttribution": False}}, pos, **extra)


def if_node(flow, name, left, op, pos, right=None, kind="boolean"):
    cond = {"id": str(uuid.uuid5(uuid.NAMESPACE_URL, name)), "leftValue": left,
            "operator": {"type": kind, "operation": op}}
    if right is None:
        cond["operator"]["singleValue"] = True
        cond["rightValue"] = ""
    else:
        cond["rightValue"] = right
    return flow.add(name, "n8n-nodes-base.if", 2.2, {
        "conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                       "conditions": [cond], "combinator": "and"},
        "looseTypeValidation": True, "options": {}}, pos)


def switch(flow, name, rules, pos, fallback=False):
    values = []
    for key, left, right in rules:
        values.append({"conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                                      "conditions": [{"id": str(uuid.uuid5(uuid.NAMESPACE_URL, name + key)), "leftValue": left, "rightValue": right,
                                                      "operator": {"type": "string", "operation": "equals"}}],
                                      "combinator": "and"},
                       "renameOutput": True, "outputKey": key})
    opts = {"fallbackOutput": "extra", "renameFallbackOutput": "other"} if fallback else {}
    return flow.add(name, "n8n-nodes-base.switch", 3.2, {"rules": {"values": values}, "looseTypeValidation": True, "options": opts}, pos)


def http(flow, name, pos, method, url, *, auth=None, multipart=None, json_body=None, headers=None, query=None,
         file_out=None, timeout=120000, **extra):
    p = {"method": method, "url": url, "options": {"timeout": timeout}}
    if auth == "header":
        p.update({"authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth"})
    elif auth == "anthropic":
        p.update({"authentication": "predefinedCredentialType", "nodeCredentialType": "anthropicApi"})
    if headers:
        p.update({"sendHeaders": True, "headerParameters": {"parameters": [{"name": k, "value": v} for k, v in headers]}})
    if query:
        p.update({"sendQuery": True, "queryParameters": {"parameters": [{"name": k, "value": v} for k, v in query]}})
    if multipart is not None:
        params = []
        for k, v in multipart:
            if isinstance(v, tuple):
                params.append({"parameterType": "formBinaryData", "name": k, "inputDataFieldName": v[1]})
            else:
                params.append({"name": k, "value": v})
        p.update({"sendBody": True, "contentType": "multipart-form-data", "bodyParameters": {"parameters": params}})
    if json_body is not None:
        p.update({"sendBody": True, "specifyBody": "json", "jsonBody": json_body})
    if file_out:
        p["options"]["response"] = {"response": {"responseFormat": "file", "outputPropertyName": file_out}}
    return flow.add(name, "n8n-nodes-base.httpRequest", 4.2, p, pos, **extra)


def llm_chain(flow, name, prompt_expr, system, schema, model, temperature, pos, max_tokens=8000):
    chain = flow.add(name, "@n8n/n8n-nodes-langchain.chainLlm", 1.5, {
        "promptType": "define", "text": prompt_expr, "hasOutputParser": True,
        "messages": {"messageValues": [{"type": "SystemMessagePromptTemplate", "message": system}]}}, pos)
    lm = flow.add(f"{name} · model", "@n8n/n8n-nodes-langchain.lmChatAnthropic", 1.3, {
        "model": {"__rl": True, "mode": "id", "value": model},
        "options": {"maxTokensToSample": max_tokens, "temperature": temperature}}, (pos[0] - 80, pos[1] + 220))
    parser = flow.add(f"{name} · JSON", "@n8n/n8n-nodes-langchain.outputParserStructured", 1.2, {
        "schemaType": "manual", "inputSchema": json.dumps(schema, indent=1)}, (pos[0] + 120, pos[1] + 220))
    flow.link(lm, chain, kind="ai_languageModel")
    flow.link(parser, chain, kind="ai_outputParser")
    return chain


STR = {"type": "string"}
COPY_SCHEMA = {
    "type": "object",
    "required": ["lang", "format", "formula", "pillar", "cta_tier", "hook", "caption", "hashtags", "alt_text",
                 "visual_description", "slides", "beats", "voiceover", "broll_prompt"],
    "properties": {
        "lang": {"type": "string", "enum": ["en", "ar"]},
        "format": {"type": "string", "enum": ["carousel", "reel"]},
        "formula": STR, "pillar": STR,
        "cta_tier": {"type": "string", "enum": ["T0", "T1", "T2", "T3"]},
        "hook": STR, "caption": STR, "alt_text": STR, "visual_description": STR,
        "hashtags": {"type": "array", "items": STR},
        "slides": {"type": "array", "description": "Exactly 8 for a carousel; [] for a reel", "items": {
            "type": "object", "required": ["layout"],
            "properties": {
                "layout": {"type": "string", "enum": ["cover", "statement", "list", "quote", "split", "centers", "sample", "cta"]},
                "eyebrow": STR, "headline": STR, "sub": STR,
                "glyph": {"type": "string", "enum": ["transmutation", "seed", "metatron", "crystal"]},
                "statement": STR, "support": STR, "title": STR,
                "items": {"type": "array", "items": {"type": "object", "properties": {"text": STR, "sub": STR}, "required": ["text"]}},
                "question": STR, "prompt": STR, "behavior": STR,
                "reasons": {"type": "array", "items": STR},
                "centers": {"type": "array", "items": {"type": "object", "required": ["key", "name", "state"], "properties": {
                    "key": {"type": "string", "enum": ["root", "sacral", "solarPlexus", "heart", "throat", "thirdEye", "crown"]},
                    "name": STR, "state": {"type": "string", "enum": ["care", "working", "rising", "flowing"]}, "note": STR, "body": STR}}},
                "page": {"type": "integer", "minimum": 1, "maximum": 6}, "callout": STR, "button": STR}}},
        "beats": {"type": "array", "description": "Exactly 5 for a reel; [] for a carousel",
                  "items": {"type": "object", "required": ["text", "seconds"], "properties": {"text": STR, "seconds": {"type": "number"}}}},
        "voiceover": {"type": "string", "description": "Reel voiceover; empty string for a carousel"},
        "broll_prompt": {"type": "string", "description": "Reel b-roll prompt; empty string for a carousel"},
    },
}
COMPLIANCE_SCHEMA = {
    "type": "object", "required": ["pass", "issues", "fixed_caption"],
    "properties": {
        "pass": {"type": "boolean"},
        "issues": {"type": "array", "items": {"type": "object", "properties": {
            "rule": STR, "severity": {"type": "string", "enum": ["blocker", "major", "minor"]}, "field": STR,
            "excerpt": STR, "reason": STR, "requires_regeneration": {"type": "boolean"}}}},
        "fixed_caption": STR,
    },
}
INSIGHTS_SCHEMA = {"type": "object", "required": ["summary", "do_more", "do_less", "top_hooks"],
                   "properties": {k: STR for k in ("summary", "do_more", "do_less", "top_hooks")}}

SETTINGS_VALUES = [
    ("SHEET_ID", "PASTE_GOOGLE_SHEET_ID"),
    ("TELEGRAM_CHAT_ID", "PASTE_TELEGRAM_CHAT_ID"),
    ("ADMIN_TELEGRAM_IDS", "PASTE_YOUR_TELEGRAM_USER_ID"),
    ("SITE", "https://www.mycrystalcode.com"),
    ("TIMEZONE", "Asia/Dubai"),
    ("GOTENBERG_URL", "http://gotenberg:3000"),
    ("REEL_URL", "http://mcc-reel:3900"),
    ("UPLOADPOST_USER", "PASTE_UPLOAD_POST_PROFILE_NAME"),
    ("UPLOADPOST_ANALYTICS_URL", "https://api.upload-post.com/api/analytics"),
    ("TIKTOK_POST_MODE", "MEDIA_UPLOAD"),
    ("REEL_TIER", "standard"),
    ("FAL_MODEL", "PASTE_FAL_MODEL_ID"),
    ("FAL_INPUT_JSON", '{"aspect_ratio":"9:16","duration":"8s","generate_audio":false}'),
    ("ELEVEN_VOICE_EN", "PASTE_ELEVENLABS_VOICE_ID_EN"),
    ("ELEVEN_VOICE_AR", "PASTE_ELEVENLABS_VOICE_ID_AR"),
    ("ELEVEN_MODEL", "eleven_v3"),
    ("COPY_MODEL", "claude-sonnet-5-5"),
    ("QA_MODEL", "claude-sonnet-5-5"),
    ("AUTO_PUBLISH_EN", "false"),
    ("LAUNCH_END_DATE", ""),
    ("INSIGHTS_WEEKDAY", "1"),
    ("PROMPT_VERSION", PROMPT_VERSION),
]


def settings(flow, pos, keys=None):
    vals = [(k, v) for k, v in SETTINGS_VALUES if keys is None or k in keys]
    return flow.add(SETTINGS, "n8n-nodes-base.set", 3.4, {
        "assignments": {"assignments": [{"id": str(uuid.uuid5(uuid.NAMESPACE_URL, k)), "name": k, "value": v, "type": "string"} for k, v in vals]},
        "options": {}}, pos)


# ================================================================ 1. Content autopilot
def autopilot():
    f = Flow("MCC · Content Autopilot (create → check → approve → publish)")
    X = lambda i: 240 * i  # noqa: E731
    f.note("README", (
        "## My Crystal Code · Content Autopilot\n"
        "Daily: picks the next Queue row → Claude writes one carousel (8 slides) or reel (5 beats) from a formula →\n"
        "**Gate A** (deterministic limits + claims blocklist) → **Compliance** (Claude) → render (Gotenberg; reels via mcc-reel)\n"
        "→ **Visual QA** (Claude vision) → **Telegram approval** → kill switch re-read → Upload-Post (IG + TikTok drafts) → audit Log.\n"
        "Any failed gate gets ONE corrective rewrite, then the post is held for a human.\n\n"
        "Setup: see `mycrystalcode-content/SETUP.md`. Fill **⚙️ Settings** first; set credentials on every red node."), (-560, -420), w=700, h=300, color=5)
    slot_a = f.add("Slot A · EN 14:00 UTC", "n8n-nodes-base.scheduleTrigger", 1.2,
                   {"rule": {"interval": [{"field": "cronExpression", "expression": "0 18 * * *"}]}}, (X(-2), 0))
    slot_b = f.add("Slot B · AR 18:30 UTC", "n8n-nodes-base.scheduleTrigger", 1.2,
                   {"rule": {"interval": [{"field": "cronExpression", "expression": "30 22 * * *"}]}}, (X(-2), 200))
    jitter = f.add("Jitter 0-20 min", "n8n-nodes-base.wait", 1.1,
                   {"amount": "={{ Math.floor(Math.random() * 20) }}", "unit": "minutes"}, (X(-1), 100))
    manual = f.add("Run now (test)", "n8n-nodes-base.manualTrigger", 1, {}, (X(-1), 360))
    st = settings(f, (X(0), 100))
    f.link(slot_a, jitter); f.link(slot_b, jitter); f.link(jitter, st); f.link(manual, st)

    rc = sheet_read(f, "Read Control", "Control", (X(1), 100))
    ks = code(f, "Kill switch gate", js("kill-switch-gate.js"), (X(2), 100))
    rq = sheet_read(f, "Read Queue", "Queue", (X(3), 100), alwaysOutputData=True)
    rl = sheet_read(f, "Read Log", "Log", (X(4), 100), alwaysOutputData=True, executeOnce=True)
    ri = sheet_read(f, "Read Insights", "Insights", (X(5), 100), alwaysOutputData=True, executeOnce=True)
    pick = code(f, "Pick next post", js("pick-next.js").replace(
        "const langOk = (l) => (l === 'ar' ? control.ar : control.en);",
        "// A scheduled slot prefers its own language (agency/B posting slots); a manual run takes any.\n"
        "const slotLang = $('Slot A · EN 14:00 UTC').isExecuted ? 'en' : $('Slot B · AR 18:30 UTC').isExecuted ? 'ar' : '';\n"
        "const langOk = (l) => (l === 'ar' ? control.ar : control.en) && (!slotLang || l === slotLang);"), (X(6), 100))
    f.chain(st, rc, ks, rq, rl, ri, pick)

    bb = code(f, "Build brief", js("build-brief.js", BRIEF=BRIEF, POLICY=POLICY, FORMULAS=FORMULAS, STRATEGY=STRATEGY,
                                    CONTRACT=CONTRACT, COMPLIANCE=COMPLIANCE), (X(7), 100))
    cw = llm_chain(f, "Copywriter (Claude)", "={{ $json.prompt }}",
                   "You are a meticulous bilingual (English/Arabic) social copywriter. You follow the brand brief, the claims policy and the template contract exactly, and you output only valid JSON.",
                   COPY_SCHEMA, "claude-sonnet-5-5", 0.7, (X(8), 100))
    ga = code(f, "Gate A: validate copy", js("gate-a-validate.js"), (X(9), 100))
    ok_a = if_node(f, "Copy OK?", "={{ $json.ok }}", "true", (X(10), 100))
    comp = llm_chain(f, "Compliance (Claude)", "={{ $json.compliance_prompt }}",
                     "You are a strict compliance reviewer. Output only the JSON object requested.",
                     COMPLIANCE_SCHEMA, "claude-sonnet-5-5", 0, (X(11), 0), max_tokens=3000)
    cv = code(f, "Compliance verdict", js("compliance-verdict.js"), (X(12), 0))
    ok_c = if_node(f, "Compliance OK?", "={{ $json.ok }}", "true", (X(13), 0))
    f.chain(pick, bb, cw, ga, ok_a)
    f.link(ok_a, comp, 0); f.chain(comp, cv, ok_c)

    roh = code(f, "Retry or hold", js("retry-or-hold.js"), (X(11), 520))
    retry = if_node(f, "Retry?", "={{ $json.retry }}", "true", (X(12), 520))
    hold = sheet_write(f, "Hold: mark queue", "Queue", "appendOrUpdate", (X(13), 620), match="id", values={
        "id": "={{ $json.row.id }}", "status": "held", "notes": "={{ ($json.stage + ': ' + ($json.issues || []).join(' | ')).slice(0, 900) }}"})
    hold_n = telegram_text(f, "Hold: notify", "={{ $('Retry or hold').first().json.message }}", (X(14), 620), executeOnce=True)
    f.link(ok_a, roh, 1); f.link(ok_c, roh, 1)
    f.link(roh, retry); f.link(retry, bb, 0); f.link(retry, hold, 1); f.link(hold, hold_n)

    fmt = switch(f, "Format?", [("carousel", "={{ $json.post.format }}", "carousel"), ("reel", "={{ $json.post.format }}", "reel")], (X(14), 0))
    f.link(ok_c, fmt, 0)
    # carousel branch
    sh = code(f, "Slides → HTML", js("slides-html.js", TEMPLATE=TEMPLATE), (X(15), -200))
    rs = http(f, "Render slide (Gotenberg)", (X(16), -200), "POST", f"={{{{ {S}.GOTENBERG_URL }}}}/forms/chromium/screenshot/html",
              multipart=[("files", ("bin", "data")), ("width", "1080"), ("height", "1350"), ("clip", "true"), ("format", "jpeg"),
                         ("quality", "92"), ("failOnConsoleExceptions", "true"), ("waitForExpression", "document.body.getAttribute('data-ready') === '1' || document.body.hasAttribute('data-error')")], file_out="data")
    cs = code(f, "Collect slides", js("collect-slides.js"), (X(17), -200))
    rsh = http(f, "Render contact sheet (Gotenberg)", (X(18), -200), "POST", f"={{{{ {S}.GOTENBERG_URL }}}}/forms/chromium/screenshot/html",
               multipart=[("files", ("bin", "data")), ("width", "1080"), ("height", "700"), ("clip", "true"), ("format", "jpeg"),
                          ("quality", "85"), ("failOnConsoleExceptions", "true"), ("waitForExpression", "document.body.getAttribute('data-ready') === '1' || document.body.hasAttribute('data-error')")], file_out="data")
    bc = code(f, "Bundle carousel", js("bundle-carousel.js"), (X(19), -200))
    f.link(fmt, sh, 0); f.chain(sh, rs, cs, rsh, bc)
    # reel branch
    bh = code(f, "Beats → HTML", js("beats-html.js", TEMPLATE=TEMPLATE), (X(15), 200))
    rb = http(f, "Render beat (Gotenberg)", (X(16), 200), "POST", f"={{{{ {S}.GOTENBERG_URL }}}}/forms/chromium/screenshot/html",
              multipart=[("files", ("bin", "data")), ("width", "1080"), ("height", "1920"), ("clip", "true"), ("format", "png"),
                         ("omitBackground", "={{ $json.omit_background }}"),
                         ("failOnConsoleExceptions", "true"), ("waitForExpression", "document.body.getAttribute('data-ready') === '1' || document.body.hasAttribute('data-error')")], file_out="data")
    cb = code(f, "Collect beats", js("collect-beats.js"), (X(17), 200))
    vo = http(f, "Voiceover (ElevenLabs)", (X(18), 200), "POST",
              f"=https://api.elevenlabs.io/v1/text-to-speech/{{{{ $json.post.lang === 'ar' ? {S}.ELEVEN_VOICE_AR : {S}.ELEVEN_VOICE_EN }}}}?output_format=mp3_44100_128",
              auth="header", json_body=f"={{{{ JSON.stringify({{ text: $json.post.voiceover, model_id: {S}.ELEVEN_MODEL }}) }}}}", file_out="data")
    prem = if_node(f, "Premium reel?", f"={{{{ {S}.REEL_TIER }}}}", "equals", (X(19), 200), right="premium", kind="string")
    fal = http(f, "fal: submit clip", (X(20), 380), "POST", f"=https://queue.fal.run/{{{{ {S}.FAL_MODEL }}}}", auth="header",
               json_body=f"={{{{ JSON.stringify(Object.assign({{ prompt: $('Collect beats').first().json.post.broll_prompt }}, JSON.parse({S}.FAL_INPUT_JSON || '{{}}'))) }}}}")
    fw = f.add("fal: wait", "n8n-nodes-base.wait", 1.1, {"amount": 45, "unit": "seconds"}, (X(21), 380))
    fs = http(f, "fal: status", (X(22), 380), "GET", "={{ $('fal: submit clip').first().json.status_url }}", auth="header")
    fd = f.add("fal: done?", "n8n-nodes-base.if", 2.2, {
        "conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                       "conditions": [
                           {"id": "fal-done", "leftValue": "={{ $json.status }}", "rightValue": "COMPLETED", "operator": {"type": "string", "operation": "equals"}},
                           {"id": "fal-timeout", "leftValue": "={{ $runIndex }}", "rightValue": 20, "operator": {"type": "number", "operation": "gte"}}],
                       "combinator": "or"}, "looseTypeValidation": True, "options": {}}, (X(23), 380))
    fr = http(f, "fal: result", (X(24), 380), "GET", "={{ $('fal: submit clip').first().json.response_url }}", auth="header",
              onError="continueRegularOutput")
    ari = code(f, "Assemble reel inputs", js("assemble-reel-inputs.js"), (X(25), 200))
    mr = http(f, "Assemble reel (mcc-reel)", (X(26), 200), "POST", f"={{{{ {S}.REEL_URL }}}}/reel",
              multipart=[("frames", ("bin", "beat_1")), ("frames", ("bin", "beat_2")), ("frames", ("bin", "beat_3")),
                         ("frames", ("bin", "beat_4")), ("frames", ("bin", "beat_5")), ("audio", ("bin", "voice")),
                         ("durations", "={{ $json.durations }}"), ("clip_url", "={{ $json.clip_url }}")], file_out="data", timeout=600000)
    br = code(f, "Bundle reel", js("bundle-reel.js"), (X(27), 200))
    f.link(fmt, bh, 1); f.chain(bh, rb, cb, vo, prem)
    f.link(prem, fal, 0); f.chain(fal, fw, fs, fd); f.link(fd, fr, 0); f.link(fd, fw, 1); f.link(fr, ari)
    f.link(prem, ari, 1); f.chain(ari, mr, br)

    # visual QA (both formats)
    qr = code(f, "QA request", js("qa-request.js", QA_CHECKLIST=QA_CHECKLIST), (X(28), 0))
    vq = http(f, "Vision QA (Claude)", (X(29), 0), "POST", "https://api.anthropic.com/v1/messages", auth="anthropic",
              headers=[("anthropic-version", "2023-06-01")], json_body="={{ $json.qa_body }}", timeout=180000)
    qv = code(f, "QA verdict", js("qa-verdict.js"), (X(30), 0))
    ok_q = if_node(f, "QA OK?", "={{ $json.ok }}", "true", (X(31), 0))
    f.link(bc, qr); f.link(br, qr); f.chain(qr, vq, qv, ok_q)
    f.link(ok_q, roh, 1)

    # approval
    auto = if_node(f, "Auto-publish allowed?",
                   f"={{{{ {S}.AUTO_PUBLISH_EN === 'true' && $json.post.lang === 'en' && $json.post.pillar !== 'P6' && $json.post.format === 'carousel' }}}}",
                   "true", (X(32), 0))
    pf = switch(f, "Preview format?", [("carousel", "={{ $json.post.format }}", "carousel"), ("reel", "={{ $json.post.format }}", "reel")], (X(33), 120))
    cap = "={{ ('🆕 ' + $json.post.post_id + ' · ' + $json.post.formula + ' · ' + $json.post.cta_tier + '\\n\\n' + $json.post.caption).slice(0, 1000) }}"
    pc = f.add("Preview carousel (Telegram)", "n8n-nodes-base.telegram", 1.2, {
        "operation": "sendPhoto", "chatId": f"={{{{ {S}.TELEGRAM_CHAT_ID }}}}", "binaryData": True, "binaryPropertyName": "sheet",
        "additionalFields": {"caption": cap}}, (X(34), 40))
    pr = f.add("Preview reel (Telegram)", "n8n-nodes-base.telegram", 1.2, {
        "operation": "sendVideo", "chatId": f"={{{{ {S}.TELEGRAM_CHAT_ID }}}}", "binaryData": True, "binaryPropertyName": "video",
        "additionalFields": {"caption": cap}}, (X(34), 220))
    ap = f.add("Approve? (Telegram)", "n8n-nodes-base.telegram", 1.2, {
        "operation": "sendAndWait", "chatId": f"={{{{ {S}.TELEGRAM_CHAT_ID }}}}",
        "message": "={{ 'Publish ' + $('QA verdict').first().json.post.post_id + ' to ' + ($('Build brief').first().json.row.platforms || 'instagram, tiktok') + '?\\n\\nHook: ' + $('QA verdict').first().json.post.hook + '\\nTikTok goes to drafts: open the app, check the AI + promotional toggles, then post.' }}",
        "approvalOptions": {"values": {"approvalType": "double", "approveLabel": "✅ Publish", "disapproveLabel": "❌ Reject"}},
        "options": {"limitWaitTime": {"values": {"limitType": "afterTimeInterval", "resumeAmount": 20, "resumeUnit": "hours"}}}},
        (X(35), 120))
    apd = if_node(f, "Approved?", "={{ $json.data && $json.data.approved }}", "true", (X(36), 120))
    rej = sheet_write(f, "Rejected: mark queue", "Queue", "appendOrUpdate", (X(37), 320), match="id", values={
        "id": "={{ $('Build brief').first().json.row.id }}", "status": "rejected", "post_id": "={{ $('QA verdict').first().json.post.post_id }}"})
    f.link(ok_q, auto, 0); f.link(auto, pf, 1)
    f.link(pf, pc, 0); f.link(pf, pr, 1); f.link(pc, ap); f.link(pr, ap); f.link(ap, apd)
    f.link(apd, rej, 1)

    # publish
    rc2 = sheet_read(f, "Re-read Control", "Control", (X(37), 0), executeOnce=True)
    pp = code(f, "Publish plan", js("publish-plan.js"), (X(38), 0))
    pfm = switch(f, "Publish format?", [("carousel", "={{ $json.skipped ? 'skip' : $json.post.format }}", "carousel"),
                                        ("reel", "={{ $json.skipped ? 'skip' : $json.post.format }}", "reel")], (X(39), 0), fallback=True)
    base = [("user", f"={{{{ {S}.UPLOADPOST_USER }}}}"), ("platform[]", "={{ $json.platform }}"), ("title", "={{ $json.title }}"),
            ("description", "={{ $json.description }}")]
    tiktok = [("post_mode", "={{ $json.tiktok_post_mode }}"), ("is_aigc", "true"), ("auto_add_music", "true")]
    upc = http(f, "Upload-Post: carousel", (X(40), -100), "POST", "https://api.upload-post.com/api/upload_photos", auth="header",
               multipart=base + [("photos[]", ("bin", f"slide_{i}")) for i in range(1, 9)] + tiktok, timeout=300000,
               onError="continueRegularOutput")
    upr = http(f, "Upload-Post: reel", (X(40), 100), "POST", "https://api.upload-post.com/api/upload", auth="header",
               multipart=base + [("video", ("bin", "video"))] + tiktok, timeout=600000, onError="continueRegularOutput")
    skip = telegram_text(f, "Skipped: kill switch", "={{ '⏸ Not published (kill switch): ' + $json.post.post_id }}", (X(40), 300), executeOnce=True)
    f.link(auto, rc2, 0); f.link(apd, rc2, 0); f.chain(rc2, pp, pfm)
    f.link(pfm, upc, 0); f.link(pfm, upr, 1); f.link(pfm, skip, 2)
    au = code(f, "Audit row", js("audit-row.js"), (X(41), 0))
    wl = sheet_write(f, "Write Log", "Log", "append", (X(42), 0))
    mq = sheet_write(f, "Mark queue", "Queue", "appendOrUpdate", (X(43), 0), match="id", executeOnce=True, values={
        "id": "={{ $('Build brief').first().json.row.id }}", "status": "posted", "post_id": "={{ $('Audit row').first().json.post_id }}",
        "date": "={{ $('Build brief').first().json.row.date }}", "lang": "={{ $('Build brief').first().json.row.lang }}",
        "format": "={{ $('Build brief').first().json.row.format }}", "formula": "={{ $('Build brief').first().json.row.formula }}"})
    done = telegram_text(f, "Notify published", "={{ '✅ ' + $('Audit row').all().map(r => r.json.platform + ': ' + r.json.status).join(', ') + '\\n' + $('Audit row').first().json.post_id + '\\nStory/DM link: ' + $('Audit row').first().json.link }}",
                         (X(44), 0), executeOnce=True)
    f.link(upc, au); f.link(upr, au); f.chain(au, wl, mq, done)
    return f.build(tags=["mycrystalcode", "social"])


# ================================================================ 2. Analytics & learning loop
def analytics():
    f = Flow("MCC · Analytics & weekly learning loop")
    f.note("README", (
        "## Analytics & learning loop\nDaily: fetches per-post metrics for posts 1-8 days old into **Metrics**.\n"
        "Weekly (INSIGHTS_WEEKDAY, 1 = Monday): Claude reads Log + Metrics + Clicks + Sales and writes **Insights**,\n"
        "which the autopilot's brief reads before writing the next posts.\n\n"
        "⚠️ Verify the Upload-Post analytics endpoint and query names in their API docs and adjust **Fetch analytics**.\n"
        "Until then you can type numbers into the Metrics sheet by hand; the weekly review works either way."), (-560, -380), w=640, h=260, color=5)
    t = f.add("Daily 06:10", "n8n-nodes-base.scheduleTrigger", 1.2, {"rule": {"interval": [{"field": "cronExpression", "expression": "10 6 * * *"}]}}, (0, 0))
    m = f.add("Run now (test)", "n8n-nodes-base.manualTrigger", 1, {}, (0, 200))
    st = settings(f, (240, 100))
    rl = sheet_read(f, "Read Log", "Log", (480, 100), alwaysOutputData=True)
    sel = code(f, "Posts to measure", """// Posts published 1-8 days ago, one item per post + platform.
const S = $('⚙️ Settings').first().json;
const now = $now.setZone(S.TIMEZONE);
return $input.all().map((i) => i.json)
  .filter((r) => r.post_id && ['published', 'tiktok_draft'].includes(r.status))
  .map((r) => ({ ...r, age_days: Math.floor(now.diff(DateTime.fromISO(r.created_at), 'days').days) }))
  .filter((r) => r.age_days >= 1 && r.age_days <= 8)
  .map((r) => ({ json: { post_id: r.post_id, platform: r.platform, age_days: r.age_days, upload_response: r.upload_response } }));""", (720, 100))
    fa = http(f, "Fetch analytics", (960, 100), "GET", f"={{{{ {S}.UPLOADPOST_ANALYTICS_URL }}}}", auth="header",
              query=[("user", f"={{{{ {S}.UPLOADPOST_USER }}}}"), ("platform", "={{ $json.platform }}"),
                     ("request_id", "={{ (() => { try { const r = JSON.parse($json.upload_response); return r.request_id || r.id || ''; } catch (e) { return ''; } })() }}")],
              onError="continueRegularOutput")
    mn = code(f, "Normalize metrics", js("metrics-normalize.js"), (1200, 100))
    wm = sheet_write(f, "Write Metrics", "Metrics", "appendOrUpdate", (1440, 100), match="key")
    f.link(t, st); f.link(m, st); f.chain(st, rl, sel, fa, mn, wm)
    rm = sheet_read(f, "Read Metrics", "Metrics", (1680, 100), alwaysOutputData=True, executeOnce=True)
    rcl = sheet_read(f, "Read Clicks", "Clicks", (1920, 100), alwaysOutputData=True, executeOnce=True)
    rsa = sheet_read(f, "Read Sales", "Sales", (2160, 100), alwaysOutputData=True, executeOnce=True)
    ip = code(f, "Insights prompt", js("insights-prompt.js"), (2400, 100))
    ch = llm_chain(f, "Weekly review (Claude)", "={{ $json.prompt }}", "You are a careful growth analyst. Output only the JSON requested.",
                   INSIGHTS_SCHEMA, "claude-haiku-5-5", 0.2, (2640, 100), max_tokens=2000)
    row = code(f, "Insights row", """const o = $input.first().json.output || {};
return [{ json: { week: $('Insights prompt').first().json.week, summary: o.summary || '', do_more: o.do_more || '', do_less: o.do_less || '', top_hooks: o.top_hooks || '' } }];""", (2880, 100))
    wi = sheet_write(f, "Write Insights", "Insights", "append", (3120, 100))
    tg = telegram_text(f, "Send weekly review", "={{ '📊 Week ' + $('Insights row').first().json.week + '\\n\\n' + $('Insights row').first().json.summary + '\\n\\n➕ ' + $('Insights row').first().json.do_more + '\\n➖ ' + $('Insights row').first().json.do_less }}", (3360, 100))
    f.chain(wm, rm, rcl, rsa, ip, ch, row, wi, tg)
    return f.build(tags=["mycrystalcode", "analytics"])


# ================================================================ 3. Kill switch bot
def kill_switch():
    f = Flow("MCC · Kill switch (Telegram /pause /resume /status)")
    f.note("README", (
        "## Kill switch\nSend `/pause <reason>` to stop all posting immediately, `/resume <reason>` to restart,\n"
        "`/status` to see the Control sheet. Only IDs in ADMIN_TELEGRAM_IDS are obeyed.\n"
        "Use a **separate bot** from the approval bot if you prefer; one bot works because approvals use link buttons."), (-560, -320), w=600, h=200, color=5)
    t = f.add("Telegram command", "n8n-nodes-base.telegramTrigger", 1.1, {"updates": ["message"], "additionalFields": {}}, (0, 0))
    st = settings(f, (240, 0), keys={"SHEET_ID", "ADMIN_TELEGRAM_IDS", "TIMEZONE"})
    pc = code(f, "Parse command", js("kill-switch-bot.js"), (480, 0))
    sw = switch(f, "Action", [("update", "={{ $json.action }}", "update"), ("status", "={{ $json.action }}", "status"),
                              ("reply", "={{ $json.action }}", "reply")], (720, 0))
    up = sheet_write(f, "Update Control", "Control", "appendOrUpdate", (960, -160), match="key",
                     values={"key": "={{ $json.key }}", "value": "={{ $json.value }}"})
    r1 = telegram_text(f, "Confirm", "={{ $('Parse command').first().json.reply }}", (1200, -160),
                       chat="={{ $('Parse command').first().json.chat_id }}", executeOnce=True)
    rs = sheet_read(f, "Read Control", "Control", (960, 0))
    sr = code(f, "Format status", js("status-reply.js"), (1200, 0))
    r2 = telegram_text(f, "Send status", "={{ $json.reply }}", (1440, 0), chat="={{ $json.chat_id }}")
    r3 = telegram_text(f, "Reply", "={{ $json.reply }}", (960, 160), chat="={{ $json.chat_id }}")
    f.chain(t, st, pc, sw); f.link(sw, up, 0); f.link(up, r1); f.link(sw, rs, 1); f.chain(rs, sr, r2); f.link(sw, r3, 2)
    return f.build(tags=["mycrystalcode", "governance"])


# ================================================================ 4. Link tracker
def tracker():
    f = Flow("MCC · Link tracker (story / DM / bio redirects)")
    f.note("README", (
        "## Link tracker\n`https://<your-n8n>/webhook/go?p=<post_id>&s=instagram&m=story&d=lite&l=en`\n"
        "Logs the click to **Clicks** and redirects to the site with UTMs (d = home|lite|full|sample|crystals).\n"
        "The autopilot's Telegram message gives the post_id for each new post."), (-560, -300), w=600, h=200, color=5)
    w = f.add("GET /go", "n8n-nodes-base.webhook", 2, {"path": "go", "httpMethod": "GET", "responseMode": "responseNode", "options": {}}, (0, 0),
              webhookId=str(uuid.uuid5(uuid.NAMESPACE_URL, "mcc-go")))
    st = settings(f, (240, 0), keys={"SHEET_ID", "SITE", "TIMEZONE"})
    c = code(f, "Build redirect", js("tracker-redirect.js"), (480, 0))
    r = f.add("Redirect", "n8n-nodes-base.respondToWebhook", 1.1, {"respondWith": "redirect", "redirectURL": "={{ $json.location }}", "options": {}}, (720, -100))
    a = sheet_write(f, "Log click", "Clicks", "append", (720, 100), onError="continueRegularOutput")
    f.chain(w, st, c); f.link(c, r); f.link(c, a)
    return f.build(tags=["mycrystalcode", "analytics"])


# ---------------------------------------------------------------- sheet templates
def sheet_templates():
    tpl = HERE / "sheet-templates"
    tpl.mkdir(exist_ok=True)
    (tpl / "Control.csv").write_text("key,value\nglobal_enabled,FALSE\nig_enabled,TRUE\ntt_enabled,TRUE\nen_enabled,TRUE\nar_enabled,TRUE\nmax_posts_day,2\npaused_reason,Not launched yet\n", encoding="utf-8")
    cal = json.loads(read("agency/B-strategist-data.json"))["calendar_14d"]
    manual = {f["id"] for f in FORMULAS if f.get("production_mode") in ("founder", "screen_capture")}
    lines = ["id,date,lang,format,pillar,formula,angle,cta_tier,platforms,status,notes,post_id"]
    for c in cal:
        status = "manual" if c["formula_id"] in manual else "planned"
        note = "Needs the founder or a screen recording: make it by hand" if status == "manual" else ""
        angle = f'{c["topic"]} (hook {c["hook_id"]})'.replace('"', "'")
        lines.append(",".join([f'D{c["day"]:02d}{c["slot"]}', c["date"], c["lang"], c["format"], c["pillar"], c["formula_id"],
                               f'"{angle}"', c["cta_tier"], c["platform_warmup_days_1_14"], status, note, ""]))
    (tpl / "Queue.csv").write_text("\n".join(lines) + "\n", encoding="utf-8")
    headers = {
        "Log": "post_id,queue_id,created_at,platform,status,lang,format,pillar,formula,cta_tier,hook,caption,link,attempt,llm_model,qa_model,prompt_version,blocklist_hits,compliance_json,vision_qa,ai_caption_disclosure,footer_present,approved,upload_response",
        "Insights": "week,summary,do_more,do_less,top_hooks",
        "Metrics": "key,post_id,platform,measured_at,age_days,views,reach,likes,comments,shares,saves,profile_visits,follows,raw",
        "Clicks": "ts,post_id,source,medium,lang,dest,location",
        "Sales": "date,tier,amount,utm_source,utm_content,notes",
    }
    for name, h in headers.items():
        (tpl / f"{name}.csv").write_text(h + "\n", encoding="utf-8")


def main():
    OUT.mkdir(exist_ok=True)
    flows = {"01-mcc-content-autopilot.json": autopilot(), "02-mcc-analytics-learning.json": analytics(),
             "03-mcc-kill-switch.json": kill_switch(), "04-mcc-link-tracker.json": tracker()}
    for fname, wf in flows.items():
        (OUT / fname).write_text(json.dumps(wf, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{fname}: {len(wf['nodes'])} nodes")
    sheet_templates()
    print(f"prompt version {PROMPT_VERSION}")


if __name__ == "__main__":
    main()
