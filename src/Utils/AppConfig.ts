import { cyber } from "./cyber";

class AppConfig {

    private readonly cypherApiKey = "g_!dfc^!D'<g^Kn@kjXj?Y\\mJ-ZUM@Z-\\kB&S5ZJX@>(Ydm%,kmeW\\+kXXMBG)Sn,'dG8I9X?ZaHk?J<E;H'6`V_:>VG@+j*C-AcNK[*+IUi;ZZ,U_IA,G5mj!FjBC7g8>a5JYXi&U@NZ$'_\\\\VXYd:->>$::]ah>m$5";
    public readonly gptUrl = "https://api.openai.com/v1/chat/completions";

    public get apiKey(): string {
        return cyber.decrypt(this.cypherApiKey);
    }
}

export const appConfig = new AppConfig();
