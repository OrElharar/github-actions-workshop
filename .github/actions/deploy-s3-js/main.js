// 1. Get some input values
// 2. Upload the files - while doing that, the aws cli would be searching for
//    the following credentials in the environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
// 3. Output the website url
const core = require('@actions/core');
const exec = require('@actions/exec');
// const github = require('@actions/github');
// @actions/github would be useful to get access for:
// 1. github.context  - context of the action - providing some useful information
//    about the event like the type of the event, the payload, the repo, etc.
// 2. github.getOctokit - get authenticated GitHub client - a tool to interact with
//    the GitHub API easily

function run(){
    core.notice('Running deploy-s3-js action');

    const bucket = core.getInput('bucket', {required: true});
    const region = core.getInput('region', {required: true});
    const distFolder = core.getInput('dist-folder', {required: true});

    const s3Uri = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${region}`)
    const websiteUrl = `http://${bucket}.s3-website-${region}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl);
}

run();


