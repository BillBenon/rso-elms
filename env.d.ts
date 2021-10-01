interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
