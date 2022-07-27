import {conversationMessagePost} from "../../botina-slack/src/conversationMessagePost";

app.message("Reminder: Daily thread.", async ({ message, say }) => {
    setTimeout(async () => {
        await conversationMessagePost(
            app,
            generalChannelId,
            message?.event_ts,
            "Hey @daniloassis, check if the team answer the thread"
        );
    }, 60000);
});