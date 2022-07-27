import {conversationMessagePost} from "../../botina-slack/src/conversationMessagePost";

app.message("cron", async ({ message, say }) => {
    cron.schedule("* * * * *", () => {
        setTimeout(async () => {
            await conversationMessagePost(
                app,
                generalChannelId,
                message?.event_ts,
                "Hey @Danilo Assis, this is a cron message every minute"
            );
        }, 5000);
    });
});