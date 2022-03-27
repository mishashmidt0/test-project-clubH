export interface ListenerInterface {
    name: string
}

export interface RoomCardInterface {
    id: string
    title: string,
    avatars: string[]
    listeners: ListenerInterface[],
}

export type RoomCardType = RoomCardInterface[] | []
