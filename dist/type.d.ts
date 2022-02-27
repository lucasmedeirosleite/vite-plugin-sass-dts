import { Options } from 'prettier'
import { ResolvedConfig } from 'vite'
export declare type FinalConfig = ResolvedConfig & {
  prettierOptions: Options
}
export declare type AdditionalData =
  | string
  | ((source: string, filename: string) => string | Promise<string>)
export declare type PluginOption = {
  allGenerate?: boolean
  global?: {
    generate: boolean
    outFile: string
  }
}
export declare type CSS = {
  localStyle: string
  globalStyle?: string
}
