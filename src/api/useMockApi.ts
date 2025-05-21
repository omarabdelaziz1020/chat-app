import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

const LOCAL_KEY = 'mock-messages';

function loadMessages() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    } catch {
        return {};
    }
}

function saveMessages(messages: typeof MESSAGES) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(messages));
}

const USERS = [
    { id: 'user1', name: 'Alice' },
    { id: 'user2', name: 'Bob' },
    { id: 'chatbot', name: 'Chatbot 🤖' },
];

const MESSAGES: Record<string, { sender: string; text: string; timestamp: string, mediaUrl?: string }[]> = loadMessages();

mock.onPost('/login').reply(config => {
    const { email, password } = JSON.parse(config.data);
    if (email === 'test@chat.com' && password === '123456') {
        return [200, { token: 'mock-token' }];
    }
    return [401, { message: 'Invalid credentials: Please check your email and password.' }];
});

mock.onGet('/users').reply(200, USERS);

mock.onGet(/\/messages\/.+/).reply(config => {
    const id = config.url!.split('/').pop()!;
    return [200, MESSAGES[id] || []];
});

mock.onPost(/\/messages\/.+/).reply(config => {
    const id = config.url!.split('/').pop()!;
    const { text, mediaUrl } = JSON.parse(config.data);
    const msg = { sender: 'me', text, mediaUrl, timestamp: new Date().toISOString() };
    if (!MESSAGES[id]) MESSAGES[id] = [];
    MESSAGES[id].push(msg);
    saveMessages(MESSAGES);

    // Chatbot canned response logic
    if (id === 'chatbot') {
        setTimeout(() => {
            const botMsg = {
                sender: 'chatbot',
                text: getChatbotReply(text),
                timestamp: new Date().toISOString(),
            };
            MESSAGES['chatbot'].push(botMsg);
            saveMessages(MESSAGES);
        }, 1200);
    }
    return [200, msg];
});

function getChatbotReply(userText: string): string {
    // Simple canned responses
    if (/hello|hi|hey/i.test(userText)) return "Hello! How can I help you today?";
    if (/help|support/i.test(userText)) return "I'm here to assist you. What do you need help with?";
    if (/bye|goodbye/i.test(userText)) return "Goodbye! Have a great day!";
    return "I'm a chatbot 🤖. Ask me anything!";
}

export default function useMockApi() {
    return {
        login: async (email: string, password: string) => {
            const res = await axios.post('/login', { email, password });
            return res.data;
        },
        getUsers: async () => {
            const res = await axios.get('/users');
            return res.data;
        },
        getMessages: async (id: string) => {
            const res = await axios.get(`/messages/${id}`);
            return res.data;
        },
        sendMessage: async (id: string, text: string, mediaUrl: string) => {
            const res = await axios.post(`/messages/${id}`, { text, mediaUrl });
            return res.data;
        },
    };
}
