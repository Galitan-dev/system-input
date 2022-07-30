export function parseEvent(str: string): Event | KeyboardEvent {
    const args: string[] = str
        .substring(0, str.length - 1)
        .split(/\s/);
    
    const eventType: EventType = parseInt(args[0]);
    
    const event: Event | KeyboardEvent = {
        type: eventType,
        name: eventNames[eventType]
    };

    if ([EventType.KeyUp, EventType.KeyDown].includes(eventType))
        (<KeyboardEvent> event).keyCode = parseInt(args[1]);    

    return event;
}

export enum EventType {
    KeyDown = 10,
    KeyUp = 11,
}

export declare type EventNames = {
    [key in EventType]: EventName;
};

export enum EventName {
    KeyDown = "keydown",
    KeyUp = "keyup",
}

export const eventNames: EventNames = {
    [EventType.KeyDown]: EventName.KeyDown,
    [EventType.KeyUp]: EventName.KeyUp,
}

export declare type Event = {
    type: EventType;
    name: EventName;
}

export declare interface KeyboardEvent extends Event {
    keyCode: number;
    name: EventName.KeyDown | EventName.KeyUp;
}
