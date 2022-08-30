import { Project } from "./Project";

const baseUrl = 'http://localhost:4000';
export const url = `${baseUrl}/projects`

function toErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Please login again';
        case 403:
            return 'You do not have permissions to view the projects';
        default:
            return 'There was an error retrieving the project(s).';
    }
}

function checkStatus(response: any) {
    if (response.ok) return response;

    const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
    };

    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`)

    throw new Error(toErrorMessage(httpErrorInfo.status));
}

function parseJSON(response: Response) {
    return response.json()
}

// eslint-disable-next-line
function delay(ms: number) {
    return function (x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
}


function convertToProjectModels(data: any[]): Project[] {
    let projects: Project[] = data.map(convertToProjectModel);
    return projects;
}

function convertToProjectModel(item: any): Project {
    return new Project(item);
}

const projectAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToProjectModels)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error('There was an error retrieving projects. Please try again');

            });
    },

    put(project: Project) {
        return fetch(`${url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error updating the project. Please try again.'
                );
            });
    },

    find(id: number) {
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToProjectModel);
    },
}

export { projectAPI };