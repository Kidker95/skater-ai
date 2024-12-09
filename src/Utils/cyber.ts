class Cyber {

    private encryptionKey = 12;

    public encrypt(plainText: string): string {
        let cypherText: string = "";
        for (const ch of plainText) {
            const originalCharCode = ch.charCodeAt(0);
            const encryptionCharCode = originalCharCode - this.encryptionKey;
            const encryptionChar = String.fromCharCode(encryptionCharCode);
            cypherText += encryptionChar;
        }
        return cypherText;
    }

    public decrypt(cypherText: string): string {
        let plainText: string = "";
        for (const ch of cypherText) {
            const cypherCharCode = ch.charCodeAt(0);
            const plainCharCode = cypherCharCode + this.encryptionKey;
            const plainChar = String.fromCharCode(plainCharCode);
            plainText += plainChar;
        }

        return plainText;
    }

}

export const cyber = new Cyber();

