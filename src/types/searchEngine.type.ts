export declare interface SearchParams {
  key?: string
  value?: string
}

export declare interface SearchEngine {
  name: string
  icon?: string
  networkProtocol?: string
  domain?: string
  mapping?: string
  params?: Array<SearchParams>
}
