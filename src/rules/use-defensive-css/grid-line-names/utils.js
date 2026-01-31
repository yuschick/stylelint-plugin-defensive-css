export function tokenizeGridColumns(value) {
  const tokens = [];
  let cur = '';
  let inBracket = false;
  let inParens = false;

  for (let i = 0; i < value.length; i++) {
    const ch = value[i];

    if (ch === '[') {
      if (cur.trim()) {
        tokens.push(cur.trim());
        cur = '';
      }
      inBracket = true;
      cur += ch;
      continue;
    }

    if (ch === ']') {
      cur += ch;
      inBracket = false;
      continue;
    }

    if (ch === '(') {
      inParens = true;
      cur += ch;
      continue;
    }

    if (ch === ')') {
      cur += ch;
      inParens = false;
      continue;
    }

    if (!inBracket && !inParens && /\s/.test(ch)) {
      if (cur.trim()) {
        tokens.push(cur.trim());
        cur = '';
      }
      continue;
    }

    cur += ch;
  }

  if (cur.trim()) tokens.push(cur.trim());
  return tokens;
}

// Extract names from the first bracketed group within a token, or `null`.
export function extractBracketNames(token) {
  const m = token.match(/\[([^\]]+)\]/);
  if (!m) return null;
  return m[1].trim().split(/\s+/);
}

export function extractAllBracketNamesFromString(str) {
  const names = [];
  const re = /\[([^\]]+)\]/g;
  let m;
  while ((m = re.exec(str))) {
    names.push(...m[1].trim().split(/\s+/));
  }
  return names;
}

export function buildTrackTokens(tokens) {
  const trackTokens = [];
  for (let i = 0; i < tokens.length; ) {
    const token = tokens[i];

    if (/^\[[^\]]+\]$/.test(token)) {
      const brackets = [token];
      i++;
      while (i < tokens.length && /^\[[^\]]+\]$/.test(tokens[i])) {
        brackets.push(tokens[i]);
        i++;
      }

      if (i < tokens.length) {
        trackTokens.push(`${brackets.join(' ')} ${tokens[i]}`);
        i++;
      } else {
        trackTokens.push(brackets.join(' '));
      }
    } else {
      trackTokens.push(token);
      i++;
    }
  }
  return trackTokens;
}

export function isValueInvalidForLineNames(value) {
  const tokens = tokenizeGridColumns(value);
  const trackTokens = buildTrackTokens(tokens);

  if (!trackTokens.length) return false;

  const invalidTrack = trackTokens.find((token) => {
    let names = extractBracketNames(token);

    if ((!names || !names.length) && /repeat\s*\(/i.test(token)) {
      names = extractAllBracketNamesFromString(value);
    }

    if (!names || !names.length) return true;

    return names.some((n) => ['span', 'auto'].includes(n));
  });

  return Boolean(invalidTrack);
}
