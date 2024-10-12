export const platforms = [
  'GitHub',
  'Frontend Mentor',
  'Twitter',
  'LinkedIn',
  'YouTube',
  'Facebook',
  'Twitch',
  'Dev.to',
  'Codewars',
  'Codepen',
  'freeCodeCamp',
  'GitLab',
  'Hashnode',
  'Stack Overflow',
];

export const platformLinkPatterns: { [key: string]: RegExp } = {
  GitHub: /^https:\/\/(www\.)?github\.com\/.+$/,
  'Frontend Mentor': /^https:\/\/(www\.)?frontendmentor\.io\/.+$/, // Validates any Frontend Mentor URL
  Twitter: /^https:\/\/(www\.)?twitter\.com\/.+$/, // Validates any Twitter URL
  LinkedIn: /^https:\/\/(www\.)?linkedin\.com\/.+$/, // Validates any LinkedIn URL
  YouTube: /^https:\/\/(www\.)?youtube\.com\/.+$/, // Validates any YouTube URL
  Facebook: /^https:\/\/(www\.)?facebook\.com\/.+$/, // Validates any Facebook URL
  Twitch: /^https:\/\/(www\.)?twitch\.tv\/.+$/, // Validates any Twitch URL
  'Dev.to': /^https:\/\/(www\.)?dev\.to\/.+$/, // Validates any Dev.to URL
  Codewars: /^https:\/\/(www\.)?codewars\.com\/.+$/, // Validates any Codewars URL
  Codepen: /^https:\/\/(www\.)?codepen\.io\/.+$/, // Validates any Codepen URL
  freeCodeCamp: /^https:\/\/(www\.)?freecodecamp\.org\/.+$/, // Validates any freeCodeCamp URL
  GitLab: /^https:\/\/(www\.)?gitlab\.com\/.+$/, // Validates any GitLab URL
  Hashnode: /^https:\/\/(www\.)?hashnode\.com\/.+$/, // Validates any Hashnode URL
  'Stack Overflow': /^https:\/\/(www\.)?stackoverflow\.com\/.+$/, // Validates any Stack Overflow URL
};
