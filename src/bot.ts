require("isomorphic-fetch");
import { App } from "@slack/bolt";

import cron from "node-cron";
import { conversationReplyGet } from "./conversationReplyGet";
import { conversationMessagePost } from "./conversationMessagePost";
import { userGet } from "./userGet";

import dotenvSafe from "dotenv-safe";
import path from "path";
import { getDiff } from "./git/getDiff";

const root = path.join.bind(this, __dirname, "../");

dotenvSafe.config({
    path: root(".env"),
    sample: root(".env.example"),
});

const app = new App({
    token: process.env.TOKEN,
    appToken: process.env.APP_TOKEN,
    signingSecret: process.env.SIGNING_SECRET_TOKEN,
    socketMode: true,
});

const generalChannelId = "C03MMFU7PAS";
const myUserId = "U03NHSA09LY";

app.message("Lembrete", async ({ message, say }) => {
    await conversationMessagePost(
        app,
        generalChannelId,
        message?.thread_ts,
        "Hey @Danilo Assis, answer the thread"
    );
});

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

app.message("find", async ({ message, say }) => {
    await conversationReplyGet(app, generalChannelId, message.event_ts);
});

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

app.message("user", async ({ message }) => {
    await userGet(app, myUserId);
});

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

app.message("diff", async ({ message, say }) => {
    if (!process.env.GITHUB_TOKEN) {
        await conversationMessagePost(
            app,
            generalChannelId,
            message?.event_ts,
            "You do not have the github token configured"
        );
        return;
    }

    await getDiff(say, process.env.OWNER, process.env.REPO);
});

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log("⚡️ BOTina app is running!");
})();


