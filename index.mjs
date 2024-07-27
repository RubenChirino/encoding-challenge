import fetch from "node-fetch";
import msgpack from "msgpack5";

// == Problem Statement ==
/* https://ciphersprint.pulley.com
Write a program that solves the challenge returned by this API
the first task will be returned by a GET request to /{your_email}
*/

/**
 * Main function to execute the Encoding Challenge.
 */
async function main() {
  try {
    console.log("=== Encoding Challenge ===");
    let level = 0;
    let path = EMAIL;
    while (level <= 6) {
      const fetchUrl = `${BASE_URL}/${path}`;
      const response = await fetchUrlWithLogging(fetchUrl);

      if (response.status !== 200) {
        console.log("❌ Wrong answer ❌");
        break;
      }

      console.log(`✅ Correct answer ✅`);

      const data = await response.json();
      level = data.level;
      console.log("Next Challenge:", data);

      if (level === 6) {
        console.log("🎉 Congratulations! You solved the challenge! 🎉");
        break;
      }

      const prefix = data.encrypted_path.split("_")[0];
      const value = data.encrypted_path.split("_")[1];

      path = `${prefix}_${processPathByEncryptionMethod(
        value,
        data.encryption_method
      )}`;
    }
    console.log("=== End of Encoding Challenge ===");
  } catch (error) {
    console.error("Error fetching the URL:", error);
  }
}

/**
 * Fetches a URL and logs the duration of the request.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<Response>} - The response from the fetch request.
 */
async function fetchUrlWithLogging(url) {
  const startTime = Date.now();
  console.log(`Fetching URL: ${url}`);
  const response = await fetch(url);
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log(`Request duration: ${duration}ms`);
  return response;
}

/**
 * Processes the encrypted path based on the given encryption method.
 * @param {string} encryptedPath - The encrypted path.
 * @param {string} encryptionMethod - The method used to encrypt the path.
 * @returns {string} - The processed path.
 */
function processPathByEncryptionMethod(encryptedPath, encryptionMethod) {
  try {
    encryptedPath = encryptedPath.trim();

    if (encryptionMethod === "nothing") {
      return encryptedPath;
    }

    if (encryptionMethod === "encoded as base64") {
      return handleBase64Encoding(encryptedPath);
    }

    if (encryptionMethod === "inserted some non-hex characters") {
      return handleInsertedNonHexCharacters(encryptedPath);
    }

    if (encryptionMethod.includes("circularly rotated left by")) {
      return handleCircularRotation(encryptedPath, encryptionMethod);
    }

    if (
      encryptionMethod.includes(
        "hex decoded, encrypted with XOR, hex encoded again"
      )
    ) {
      return handleXorDecryption(encryptedPath, encryptionMethod);
    }

    if (
      encryptionMethod.includes(
        "scrambled! original positions as base64 encoded messagepack"
      )
    ) {
      return handleScrambledMessagePack(encryptedPath, encryptionMethod);
    }

    if (encryptionMethod === "hashed with sha256, good luck") {
      console.log("Reached level 6 with SHA-256 hashing.");
      return encryptedPath;
    }

    console.log(`Unsupported encryption method: ${encryptionMethod}`);
    return encryptedPath;
  } catch (error) {
    console.error(`Error decoding path: ${error}`);
    return encryptedPath;
  }
}

/**
 * Handles the base64 encoding method.
 * @param {string} path - The path to decode.
 * @returns {string} - The decoded path.
 */
function handleBase64Encoding(path) {
  const decodedBytes = Buffer.from(path, "base64");
  const decodedPath = decodedBytes.toString("utf-8").trim();
  return decodedPath;
}

/**
 * Handles the insertion of non-hex characters in the path.
 * @param {string} path - The path to clean.
 * @returns {string} - The cleaned path.
 */
function handleInsertedNonHexCharacters(path) {
  return path.replace(/[^0-9a-fA-F]/g, "");
}

/**
 * Handles the circular rotation of the path.
 * @param {string} path - The path to rotate.
 * @param {string} encryptionMethod - The method indicating the rotation.
 * @returns {string} - The rotated path.
 */
function handleCircularRotation(path, encryptionMethod) {
  const rotationCount = parseInt(
    encryptionMethod.split("circularly rotated left by ")[1],
    10
  );
  const rotatedPath = rotateStringLeft(path, rotationCount);
  return rotatedPath;
}

/**
 * Rotates a string to the left by a given number of characters.
 * @param {string} str - The string to rotate.
 * @param {number} num - The number of characters to rotate.
 * @returns {string} - The rotated string.
 */
function rotateStringLeft(str, num) {
  num = num % str.length;
  return str.slice(-num) + str.slice(0, -num);
}

/**
 * Handles XOR decryption of a hex-encoded string.
 * @param {string} path - The path to decrypt.
 * @param {string} encryptionMethod - The method indicating the key for decryption.
 * @returns {string} - The decrypted path.
 */
function handleXorDecryption(path, encryptionMethod) {
  const key = encryptionMethod.split("key: ")[1];
  const decryptedPath = xorDecryptHex(path, key);
  return decryptedPath;
}

/**
 * XOR decrypts a hex-encoded string with a given key.
 * @param {string} hexStr - The hex-encoded string to decrypt.
 * @param {string} key - The key for XOR decryption.
 * @returns {string} - The decrypted hex string.
 */
function xorDecryptHex(hexStr, key) {
  const hexBytes = Buffer.from(hexStr, "hex");
  const keyBytes = Buffer.from(key, "utf-8");
  const decryptedBytes = Buffer.alloc(hexBytes.length);

  for (let i = 0; i < hexBytes.length; i++) {
    decryptedBytes[i] = hexBytes[i] ^ keyBytes[i % keyBytes.length];
  }

  return decryptedBytes.toString("hex");
}

/**
 * Handles scrambling of a path using base64 encoded messagepack.
 * @param {string} path - The scrambled path.
 * @param {string} encryptionMethod - The method indicating the scrambling details.
 * @returns {string} - The unscrambled path.
 */
function handleScrambledMessagePack(path, encryptionMethod) {
  const base64Positions = encryptionMethod.split(": ")[1];
  const positions = decodeBase64MessagePack(base64Positions);
  const unscrambledPath = unscramblePath(path, positions);
  return unscrambledPath;
}

/**
 * Decodes a base64 encoded messagepack string.
 * @param {string} base64Str - The base64 encoded messagepack string.
 * @returns {Array<number>} - The decoded positions.
 */
function decodeBase64MessagePack(base64Str) {
  const buffer = Buffer.from(base64Str, "base64");
  return msgpack().decode(buffer);
}

/**
 * Unscrambles a path based on the given positions.
 * @param {string} path - The scrambled path.
 * @param {Array<number>} positions - The positions to unscramble.
 * @returns {string} - The unscrambled path.
 */
function unscramblePath(path, positions) {
  const unscrambled = new Array(path.length);
  for (let i = 0; i < positions.length; i++) {
    unscrambled[positions[i]] = path[i];
  }
  return unscrambled.join("");
}

const EMAIL = ""; // Write your email here
const BASE_URL = "https://ciphersprint.pulley.com";

main();
