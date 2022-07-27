const result = await app.client.chat.postMessage({
    token: "xoxb-3744551104532-3793906652642-7eqtTUIaeP5i2M1rjs0U9jiJ",
    channel: 'channel_id',
    thread_ts: 'thread_id',
    text: 'what you want to say',
});

return result;