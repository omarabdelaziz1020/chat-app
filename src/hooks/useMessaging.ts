import { useState, useRef, useEffect } from 'react';
import useMockApi from '../api/useMockApi';
import type { Message } from '../types';

interface UseMessagingOptions {
    initialMessages?: Message[];
    chatId?: string;
}

export const useMessaging = (options: UseMessagingOptions = {}) => {
    const { initialMessages = [], chatId } = options;
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const api = useMockApi();

    // Auto-scrolling logic
    const bottomRef = useRef<HTMLDivElement>(null);
    const [initialScrollDone, setInitialScrollDone] = useState(false);
    const prevMessageCountRef = useRef(0);

    // Load messages if chatId is provided
    useEffect(() => {
        if (!chatId) return;
        api.getMessages(chatId).then(setMessages);
    }, [chatId, api]);

    // Auto-scroll logic
    useEffect(() => {
        // Scroll when:
        // 1. First load of messages (initialScrollDone is false)
        // 2. New message added (messages.length > prevMessageCountRef.current)
        if (
            (messages.length > 0 && !initialScrollDone) ||
            messages.length > prevMessageCountRef.current
        ) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            if (!initialScrollDone) {
                setInitialScrollDone(true);
            }
        }

        // Update the previous message count
        prevMessageCountRef.current = messages.length;
    }, [messages, initialScrollDone]);

    // Handle sending a message
    const handleSend = async () => {
        if ((!chatId && !options.chatId) || (!input && !file)) return;

        let mediaUrl = '';
        if (file) {
            setProgress(0);
            for (let i = 1; i <= 10; i++) {
                await new Promise((res) => setTimeout(res, 80));
                setProgress(i * 10);
            }
            mediaUrl = URL.createObjectURL(file);
        }

        if (chatId) {
            const msg = await api.sendMessage(chatId, input, mediaUrl);
            setMessages((msgs) => [...msgs, msg]);
        }

        setInput('');
        setFile(null);
        setProgress(0);

        return { text: input, mediaUrl };
    }; return {
        messages,
        setMessages,
        input,
        setInput,
        file,
        setFile,
        progress,
        setProgress,
        handleSend,
        bottomRef,
    };
};
