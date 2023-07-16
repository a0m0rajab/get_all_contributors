const { Octokit } = require("octokit");
const octokit = new Octokit();


async function paginate(){
    let contributors = [];

    const iterator = await octokit.paginate.iterator(octokit.rest.repos.listContributors, {
        owner: "tensorflow",
        repo: "tensorflow",
        per_page: 100,
    });
    
    // iterate through each response
    // for await (const { data: users } of iterator) {
    //     for (const user of users) {
    //         contributors.push(user);
    //     }
    // }
    console.log(iterator)
    debugger;   
    return iterator;
}

async function rest(){
    let contributors = [];
    let page = 1;
    let request;    
    do {
        request = await getContributorsOctoKit("tensorflow", "tensorflow", page);
        page++;
        contributors = contributors.concat(request.data);
    } while (request.data.length > 0);
    debugger;
    return contributors;
}

async function getContributorsOctoKit(repo, owner, page = 1) {
    return request = await octokit.rest.repos.listContributors({
        owner,
        repo,
        per_page: 100,
        page
    });
}

paginate();