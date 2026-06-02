import { useEffect, useRef, useState } from 'react';

import type { AuthUser } from '@/features/auth/types';

import {
    getStoredMessages,
    saveStoredMessages,
    type ChatMessage,
} from './chat-storage';

export type ConnectionStatus =
    | 'connecting'
    | 'connected'
    | 'disconnected'
    | 'error';

const WEB_SOCKET_URL = 'wss://ws.ifelse.io';

type UseChatParams = {
    user: AuthUser | null;
};

export function useChat({ user }: UseChatParams) {
    const socketRef = useRef<WebSocket | null>(null);
    const lastSentMessageRef = useRef<string>('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const [status, setStatus] = useState<ConnectionStatus>('connecting');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>(() =>
        getStoredMessages(),
    );

    useEffect(() => {
        const socket = new WebSocket(WEB_SOCKET_URL);
        socketRef.current = socket;

        socket.addEventListener('open', () => {
            setStatus('connected');
        });

        socket.addEventListener('message', (event) => {
            const serverText = String(event.data).trim();

            if (!serverText) {
                return;
            }

            if (serverText.toLowerCase().startsWith('request served by')) {
                return;
            }

            if (serverText === lastSentMessageRef.current) {
                return;
            }
        });

        socket.addEventListener('close', () => {
            setStatus('disconnected');
        });

        socket.addEventListener('error', () => {
            setStatus('error');
        });

        return () => {
            socket.close();
            socketRef.current = null;
        };
    }, []);

    useEffect(() => {
        saveStoredMessages(messages);
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    function sendMessage() {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || !user) {
            return;
        }

        const newMessage: ChatMessage = {
            id: createMessageId(),
            text: trimmedMessage,
            authorName: user.name,
            authorEmail: user.email,
            createdAt: getCurrentTime(),
        };

        setMessages((currentMessages) => [...currentMessages, newMessage]);
        setMessage('');
        lastSentMessageRef.current = trimmedMessage;

        const socket = socketRef.current;

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(trimmedMessage);
        }
    }

    return {
        status,
        message,
        setMessage,
        messages,
        messagesEndRef,
        sendMessage,
    };
}

function createMessageId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getCurrentTime() {
    return new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date());
}

export type { ChatMessage };