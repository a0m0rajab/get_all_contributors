async function getContributors(repoName, page = 1) {
    debugger;
    let request = await fetch(`https://api.github.com/repos/${repoName}/contributors?per_page=100&page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    // print data from the fetch on screen
    let contributorsList = await request.json();
    debugger
    return contributorsList;
};

async function getAlllContributors(repoName) {
    let contributors = [];
    let page = 1;

    do {
        list = await getContributors(repoName, page);
        contributors = contributors.concat(list);
        page++;
    } while (list.length > 0);
    // while (list.length%100 == 0)
    debugger;
    return contributors;
}

async function getAllContributorsRecursive(repoName, page = 1, allContributors = []) {
    const list = await getContributors(repoName, page);
    allContributors = allContributors.concat(list);

    if (list.length === 100) {
        return getAllContributorsRecursive(repoName, page + 1, allContributors);
    }

    // The base case: when the list is empty, return allContributors
    return allContributors;
}

async function getAllContributorsRecursive_version1(repoName, page = 1, contributors = []) {
    const list = await getContributors(repoName, page);
    if (list.length === 0) {
        return contributors;
    }
    contributors = contributors.concat(list);
    return getAllContributors(repoName, page + 1, contributors);
}

let list = getAllContributorsRecursive("tensorflow/tensorflow");
