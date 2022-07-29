import { Endpoints } from '@octokit/types';
import { Octokit } from 'octokit';
import { Service } from 'typedi';

@Service()
export class ApiService {
    private octokit = new Octokit();

    searchUsers = async (query: string): Promise<ApiService.SearchUser[]> => {
        const rv = await this.octokit.rest.search.users({ q: query });
        return rv.data.items;
    };

    getUser = async (username: string): Promise<ApiService.User> => {
        const rv = await this.octokit.rest.users.getByUsername({ username });
        return rv.data;
    };

    getUserRepositories = async (username: string) => {
        const rv = await this.octokit.rest.repos.listForUser({ username });
        return rv.data;
    };
}

export namespace ApiService {
    export type SearchUser = Endpoints['GET /search/users']['response']['data']['items'][0];
    export type User = Endpoints['GET /users/{username}']['response']['data'];
    export type Repo = Endpoints['GET /users/{username}/repos']['response']['data'][0];
}
