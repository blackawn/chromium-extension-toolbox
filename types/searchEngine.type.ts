export declare type SearchParams = {
  key?: string
  value?: string
}

export declare type SearchEngine = {
  name: string
  icon?: string
  networkProtocol?: string
  domain?: string
  mapping?: string
  params?: Array<SearchParams>
}
