declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        SHEET_ID: string
      }
    }
  }
}
