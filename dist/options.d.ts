import { FinalConfig } from './type'
export declare const getParseCase: (
  config: FinalConfig
) => ((target: string) => string) | undefined
export declare const getPreprocessorOptions: (config: FinalConfig) => any
