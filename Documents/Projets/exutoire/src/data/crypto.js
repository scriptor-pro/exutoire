import { getKeyRecord, putKeyRecord } from "./db.js";

const KEY_ID = "aes-gcm-local-key";

function toBase64(bytes) {
  let binary = "";
  for (const value of bytes) {
    binary += String.fromCharCode(value);
  }
  return btoa(binary);
}

function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function generateAndPersistKey() {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
  const jwk = await crypto.subtle.exportKey("jwk", key);
  await putKeyRecord({ id: KEY_ID, jwk });
  return key;
}

export async function getOrCreateCryptoKey() {
  const record = await getKeyRecord(KEY_ID);
  if (!record) {
    return generateAndPersistKey();
  }

  try {
    return await crypto.subtle.importKey(
      "jwk",
      record.jwk,
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"],
    );
  } catch {
    throw new Error(
      "La clé de chiffrement locale est introuvable ou invalide. Utilisez une réinitialisation locale pour repartir proprement.",
    );
  }
}

export async function encryptText(key, text) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(text);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded,
  );

  return {
    ciphertext: toBase64(new Uint8Array(encrypted)),
    iv: toBase64(iv),
  };
}

export async function decryptText(key, payload) {
  const iv = fromBase64(payload.iv);
  const ciphertext = fromBase64(payload.ciphertext);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext,
  );
  return new TextDecoder().decode(decrypted);
}
