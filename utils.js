export function calculateAccuracy(expected, actual) {
  const len1 = expected.length;
  const len2 = actual.length;
  const dp = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (expected[i - 1] === actual[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],
          dp[i][j - 1],
          dp[i - 1][j - 1]
        );
      }
    }
  }

  const distance = dp[len1][len2];
  const maxLen = Math.max(len1, len2);
  const accuracy = maxLen === 0 ? 100 : Math.round(((maxLen - distance) / maxLen) * 100);

  return accuracy;
}
