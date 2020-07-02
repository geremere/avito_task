export function request(options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                } else {
                    return Promise.resolve(json);
                }
            })
        );
}

export function getTop(page) {
    return request({
        url: "https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&per_page=10&page=" + page,
        method: "GET"
    })

}

export function searchRep(q, page) {
    return request({
        url: "https://api.github.com/search/repositories?q=react&sort=stars&order=desc&per_page=10&page=" + page,
        method: "GET"
    })
}

export function getRep(owner, rep) {
    return request({
        url: "https://api.github.com/repos/" + owner + "/" + rep,
        method: "GET"
    })
}

export function getLanguages(owner, rep) {
    return request({
        url: "https://api.github.com/repos/" + owner + "/" + rep + "/languages",
        method: "GET"
    })
}

export function getContributers(owner, rep) {
    return request({
        url: "https://api.github.com/repos/" + owner + "/" + rep + "/contributors",
        method: "GET"
    })
}