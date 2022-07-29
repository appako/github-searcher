import { action, makeObservable, observable, runInAction } from 'mobx';
import { Service } from 'typedi';
import { ApiService } from './service.api';
import { AsyncService } from './service.async';

@Service()
export class SearchService extends AsyncService {
    @observable
    private timeout: NodeJS.Timeout;

    @observable
    query = '';

    result = observable.array<ApiService.SearchUser>();

    constructor(private apiSvc: ApiService) {
        super();
        makeObservable(this);
    }

    @action
    search = (query: string) => {
        if (this.loading) return;
        if (!query) {
            this.query = '';
            runInAction(() => {
                this.result.replace([]);
                clearTimeout(this.timeout);
            });
            return;
        }
        if (this.timeout) {
            runInAction(() => clearTimeout(this.timeout));
        }
        this.query = query;
        this.timeout = setTimeout(() => {
            this.async(async () => {
                const users = await this.apiSvc.searchUsers(this.query);
                runInAction(() => {
                    this.result.replace(users);
                });
            });
        }, 500);
    };
}
