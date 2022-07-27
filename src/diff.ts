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

// get diff
export const getDiff = async (
    say: SayFn,
    owner = "daniloab",
    repo = "botina-slack"
) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const latestReleases = await octokit.rest.repos.listReleases({
    owner,
    repo,
    per_page: 1,
  });

  const latestReleaseTag =
      latestReleases && latestReleases.data && latestReleases.data.length
          ? latestReleases.data[0].tag_name
          : "main";

  const response = await octokit.rest.repos.compareCommits({
    owner,
    repo,
    base: latestReleaseTag,
    head: "main",
  });

  const getCommitsBlocks = () => {
    let blocks = [];
    for (const commit of response.data.commits) {
      blocks = [
        ...blocks,
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: commit.commit.message,
          },
        },
        {
          type: "divider",
        },
      ];
    }

    return blocks;
  };

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
};
