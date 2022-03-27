export interface ListenerInterface {
    name: string
    id: string
}

export interface RoomCardInterface {
    id: number
    title: string,
    avatars: string[]
    listeners: ListenerInterface[]
}
