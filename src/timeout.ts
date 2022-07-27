import {conversationMessagePost} from "../../botina-slack/src/conversationMessagePost";

app.message("timeout", async ({ message, say }) => {
    setTimeout(async () => {
        await conversationMessagePost(
            app,
            generalChannelId,
            message?.event_ts,
            "Hey @Danilo Assis, this is a timeout message"
        );
    }, 5000);
});