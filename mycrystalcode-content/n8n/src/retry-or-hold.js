// One corrective draw, then a human (agency/D §3.3). Collects the issues from whichever gate
// failed (Gate A, compliance, or visual QA) and either loops back to "Build brief" with them as
// feedback, or marks the post as held for review.
const brief = $('Build brief').first().json;
const failed = $input.first().json;
const issues = (failed.issues || []).map((i) => `- ${i}`).join('\n') || '- (no detail returned)';
if (brief.attempt < 2) {
  return [{ json: { retry: true, row: brief.row, attempt: brief.attempt + 1, today_count: brief.today_count,
    feedback: `Stage that failed: ${failed.stage}\n${issues}` } }];
}
return [{ json: { retry: false, row: brief.row, stage: failed.stage, issues: failed.issues || [], post_id: failed.post?.post_id || '',
  message: `⏸ Held for review: ${brief.row.id} (${brief.row.lang}/${brief.row.format || 'any'})\nFailed twice at ${failed.stage}.\n${issues}`.slice(0, 3900) } }];
