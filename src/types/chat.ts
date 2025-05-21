export interface Message {
    sender: string;
    text: string;
    timestamp: string;
    mediaUrl?: string;
}

export interface User {
    id: string;
    name: string;
}
