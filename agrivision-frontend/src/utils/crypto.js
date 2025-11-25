/**
 * Calculates the SHA-256 hash of a file.
 * @param {File} file - The file to hash.
 * @returns {Promise<string>} - The hexadecimal representation of the hash.
 */
export const calculateImageHash = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

/**
 * Generates an RSA-PSS key pair for digital signatures.
 * @returns {Promise<CryptoKeyPair>} - The generated key pair.
 */
export const generateKeyPair = async () => {
    return await window.crypto.subtle.generateKey(
        {
            name: "RSA-PSS",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["sign", "verify"]
    );
};

/**
 * Signs a file using the private key.
 * @param {CryptoKey} privateKey - The private key to sign with.
 * @param {File} file - The file to sign.
 * @returns {Promise<string>} - The hexadecimal signature.
 */
export const signFile = async (privateKey, file) => {
    const buffer = await file.arrayBuffer();
    const signature = await window.crypto.subtle.sign(
        {
            name: "RSA-PSS",
            saltLength: 32,
        },
        privateKey,
        buffer
    );
    return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Exports the public key to PEM format.
 * @param {CryptoKey} publicKey - The public key to export.
 * @returns {Promise<string>} - The PEM formatted public key.
 */
export const exportPublicKey = async (publicKey) => {
    const exported = await window.crypto.subtle.exportKey("spki", publicKey);
    let binary = '';
    const bytes = new Uint8Array(exported);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const exportedAsBase64 = window.btoa(binary);
    return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
};

