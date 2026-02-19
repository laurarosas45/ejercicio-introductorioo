export const isValidStatus = (s) =>
  ['alive', 'dead', 'unknown'].includes((s || '').toLowerCase());

export const getStatusClass = (s) =>
  isValidStatus(s) ? (s || '').toLowerCase() : '';
