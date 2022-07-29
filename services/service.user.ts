import { action, computed, makeObservable, observable } from 'mobx';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Service } from 'typedi';
import { ApiService } from './service.api';
import { AsyncService } from './service.async';

@Service()
export class UserService extends AsyncService {
    @observable
    username: string = '';

    @observable
    filter: string = '';

    @observable
    info: ApiService.User | null = null;

    repos = observable.array<ApiService.Repo>();

    constructor(private apiSvc: ApiService) {
        super();
        makeObservable(this);
    }

    useData = () => {
        const router = useRouter();
        useEffect(() => {
            const username = new URLSearchParams(window.location.search).get('username');
            if (!username) {
                router.replace('/');
            } else {
                this.setUsername(username);
            }
            return () => this.resetData();
        }, [router]);

        this.useAsync(async () => {
            if (!this.username) return;
            const info = await this.apiSvc.getUser(this.username);
            const repos = await this.apiSvc.getUserRepositories(this.username);
            this.setInfo(info);
            this.setRepos(repos);
        });
    };

    get infoFields(): { key: keyof ApiService.User; render?: (...args: any) => string }[] {
        return [
            { key: 'login' },
            { key: 'email' },
            { key: 'location' },
            { key: 'name' },
            { key: 'followers', render: (count: number) => `${count} Followers` },
            { key: 'following', render: (count: number) => `Following ${count}` },
            { key: 'bio' },
            { key: 'company' },
        ];
    }

    @computed
    get reposFiltered() {
        if (!this.filter) return this.repos;
        const f = this.filter.toLocaleLowerCase();
        return this.repos.filter(r => r.name.toLocaleLowerCase().includes(f));
    }

    @action
    private setUsername = (username: string) => {
        this.username = username;
    };

    @action
    private setInfo = (data: ApiService.User) => {
        this.info = data;
    };

    @action setRepos = (data: ApiService.Repo[]) => {
        this.repos.replace(data);
    };

    @action
    setReposFilter = (value: string) => {
        this.filter = value;
    };

    @action
    private resetData = () => {
        this.username = '';
        this.info = null;
        this.filter = '';
        this.repos.replace([]);
    };
}
