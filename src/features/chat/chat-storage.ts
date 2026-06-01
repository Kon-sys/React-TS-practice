export type ChatMessage = {
    id: string;
    text: string;
    authorName: string;
    authorEmail: string;
    createdAt: string;
};

const CHAT_STORAGE_KEY = 'testing-dashboard-work-chat';

export function getStoredMessages(): ChatMessage[] {
    const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);

    if (!storedMessages) {
        return [];
    }

    try {
        const parsedMessages: unknown = JSON.parse(storedMessages);

        if (!Array.isArray(parsedMessages)) {
            return [];
        }

        return parsedMessages.filter(isChatMessage);
    } catch {
        return [];
    }
}

export function saveStoredMessages(messages: ChatMessage[]) {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
}

function isChatMessage(value: unknown): value is ChatMessage {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const message = value as Record<string, unknown>;

    return (
        typeof message.id === 'string' &&
        typeof message.text === 'string' &&
        typeof message.authorName === 'string' &&
        typeof message.authorEmail === 'string' &&
        typeof message.createdAt === 'string'
    );
}