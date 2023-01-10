export declare type Status = '' | 'success' | 'warning' | 'info' | 'error'
export declare type Position =
    ''
    | 'top'
    | 'bottom'
    | 'center'
    | 'left-top'
    | 'right-top'
    | 'left-bottom'
    | 'right-bottom'

export declare interface Options {
    message: string
    status?: Status
    position?: Position
    duration?: number
    offset?: number
    toTargetElement?: string | HTMLElement
    onInvisible?: () => void
    onDestroy?: () => void
}
