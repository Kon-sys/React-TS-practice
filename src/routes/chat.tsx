import { createFileRoute } from '@tanstack/react-router';
import { Send } from 'lucide-react';
import type { FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useAuth } from '@/features/auth/auth-provider';
import { useChat } from '@/features/chat/use-chat';
import type {
    ChatMessage,
    ConnectionStatus,
} from '@/features/chat/use-chat';

export const Route = createFileRoute('/chat')({
    component: ChatPage,
});

function ChatPage() {
    const { user } = useAuth();

    const {
        status,
        message,
        setMessage,
        messages,
        messagesEndRef,
        sendMessage,
    } = useChat({
        user,
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        sendMessage();
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    Work Chat
                </h1>
                <p className="text-sm text-slate-500">
                    Team workspace chat for testing process discussions.
                </p>
            </div>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <h2 className="font-bold text-slate-950">
                            Testing workspace
                        </h2>
                        <p className="text-xs text-slate-500">
                            Messages are saved locally and remain after logout.
                        </p>
                    </div>

                    <StatusBadge status={status} />
                </div>

                <div className="h-[420px] overflow-y-auto bg-white p-5">
                    {messages.length === 0 ? (
                        <EmptyChatState />
                    ) : (
                        <div className="space-y-4">
                            {messages.map((item) => (
                                <ChatBubble
                                    key={item.id}
                                    message={item}
                                    isOwnMessage={item.authorEmail === user?.email}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                <form
                    className="flex gap-3 border-t border-slate-200 bg-white p-4"
                    onSubmit={handleSubmit}
                >
                    <Input
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Write a message..."
                    />

                    <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        Send
                    </Button>
                </form>
            </section>
        </div>
    );
}

type StatusBadgeProps = {
    status: ConnectionStatus;
};

function StatusBadge({ status }: StatusBadgeProps) {
    const statusConfig = {
        connecting: {
            label: 'Connecting',
            className: 'bg-orange-100 text-orange-600',
        },
        connected: {
            label: 'Online',
            className: 'bg-green-100 text-green-600',
        },
        disconnected: {
            label: 'Offline',
            className: 'bg-slate-100 text-slate-600',
        },
        error: {
            label: 'Offline mode',
            className: 'bg-red-100 text-red-600',
        },
    } satisfies Record<
        ConnectionStatus,
        {
            label: string;
            className: string;
        }
    >;

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[status].className}`}
        >
            {statusConfig[status].label}
        </span>
    );
}

function EmptyChatState() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="max-w-sm rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <h3 className="font-semibold text-slate-950">No messages yet</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Start a discussion with your team. Messages will stay here after
                    logout.
                </p>
            </div>
        </div>
    );
}

type ChatBubbleProps = {
    message: ChatMessage;
    isOwnMessage: boolean;
};

function ChatBubble({ message, isOwnMessage }: ChatBubbleProps) {
    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[75%] space-y-1">
                <div
                    className={`flex items-center gap-2 text-xs ${
                        isOwnMessage ? 'justify-end text-slate-400' : 'text-slate-500'
                    }`}
                >
                    <span>{message.authorName}</span>
                    <span>·</span>
                    <span>{message.createdAt}</span>
                </div>

                <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                        isOwnMessage
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                    }`}
                >
                    {message.text}
                </div>
            </div>
        </div>
    );
}