const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const [owner, repo] = process.env.REPO.split("/");

function initUser(data, user) {
  if (!data.contributors[user]) {
    data.contributors[user] = {
      commits: 0,
      prsCreated: 0,
      prsMerged: 0,
      reviews: 0,
    };
  }
}
// Kenli's Original getCommits
// async function getCommits(data) {
//   const commits = await octokit.paginate(
//     octokit.rest.repos.listCommits,
//     { owner, repo, per_page: 100 }
//   );

//   for (const c of commits) {
//     const user = c.author?.login;
//     if (!user) continue;

//     initUser(data, user);
//     data.contributors[user].commits += 1;
//   }
// }
async function getCommits(data) {
  const branches = await octokit.paginate(
    octokit.rest.repos.listBranches,
    { owner, repo, per_page: 100 }
  );

  const seenCommits = new Set();

  for (const branch of branches) {
    const commits = await octokit.paginate(
      octokit.rest.repos.listCommits,
      {
        owner,
        repo,
        sha: branch.name,
        per_page: 100
      }
    );

    for (const c of commits) {
      if (seenCommits.has(c.sha)) continue;
      seenCommits.add(c.sha);

      const user = c.author?.login;
      if (!user) continue;

      initUser(data, user);
      data.contributors[user].commits += 1;
    }
  }
}

async function getPRs(data) {
  const prs = await octokit.paginate(
    octokit.rest.pulls.list,
    { owner, repo, state: "all", per_page: 100 }
  );

  for (const pr of prs) {
    const user = pr.user?.login;
    if (!user) continue;

    initUser(data, user);

    data.contributors[user].prsCreated += 1;

    if (pr.merged_at) {
      data.contributors[user].prsMerged += 1;
    }
  }
}

async function getReviews(data) {
  const prs = await octokit.paginate(
    octokit.rest.pulls.list,
    { owner, repo, state: "all", per_page: 100 }
  );

  for (const pr of prs) {
    const reviews = await octokit.paginate(
      octokit.rest.pulls.listReviews,
      { owner, repo, pull_number: pr.number, per_page: 100 }
    );

    for (const r of reviews) {
      const user = r.user?.login;
      if (!user) continue;

      initUser(data, user);
      data.contributors[user].reviews += 1;
    }
  }
}

function computeSnapshot(data) {
  data.updatedAt = new Date().toISOString();
  return data;
}

async function main() {
  const data = {
    updatedAt: null,
    contributors: {},
  };

  await getCommits(data);
  await getPRs(data);
  await getReviews(data);

  const snapshot = computeSnapshot(data);

  const date = new Date().toISOString().split("T")[0];
  const fileName = `analytics-${date}.json`;

  const outputDir = path.join(process.cwd(), "reports");
  const outputPath = path.join(outputDir, fileName);

  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

  console.log("Wrote snapshot:", fileName);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
