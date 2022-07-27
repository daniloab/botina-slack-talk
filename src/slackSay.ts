await say({
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Diff ${latestReleaseTag}*`,
            },
        },
        {
            type: "divider",
        },
        ...getCommitsBlocks(),
    ],
});