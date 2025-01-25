/**
 * Transforms the given input string so that it satisfies the regex:
 *  ^[\w][\w\.]*$
 * 
 * The result will:
 * - Start with a letter, digit, or underscore (if the input’s first character 
 *   is invalid, it will be replaced with an underscore).
 * - Contain only letters, digits, underscores, or dots after the first character.
 */
const toWordDotString = (input: string): string => {
  if (!input) {
    return "_";
  }

  let firstChar = input[0];
  if (!/^\w$/.test(firstChar)) {
    firstChar = "_";
  }

  const rest = input
    .slice(1)
    .replace(/[^\w\.]/g, "");

  return firstChar + rest;
}

export const generateUsername = (email: string): string => {
	const emailHandle = email.split('@')[0].toLowerCase();
	const randomDigits = Math.floor(1000 + Math.random() * 9000);
	const username = toWordDotString(`${emailHandle}${randomDigits}`);

	return username;
};
