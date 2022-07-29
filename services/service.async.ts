import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { useEffect } from 'react';

export abstract class AsyncService {
    @computed get loading() {
        return this.asyncState === 'loading';
    }

    @observable asyncState: 'idle' | 'loading' | 'error' | 'done' = 'idle';

    @observable error?: Error = undefined;

    constructor() {
        makeObservable(this);
    }

    @action resetError = () => (this.error = undefined);

    protected async(req: () => Promise<any>, final?: () => void): void {
        if (this.asyncState === 'loading') {
            console.warn('Async operation already in progress');
            return;
        }
        this.setAsyncState('loading');
        req()
            .then(
                resp => {
                    this.setAsyncState('done');
                    return resp;
                },
                err => this.setAsyncState(err),
            )
            .finally(final);
    }

    protected useAsync(req: () => Promise<any>) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (this.asyncState === 'idle') {
                this.async(req);
            }
            return () => {
                runInAction(() => (this.asyncState = 'idle'));
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return this;
    }

    @action
    protected setAsyncState(state: 'loading' | 'done' | Error) {
        if (typeof state === 'string') {
            this.asyncState = state;
        }
        if (state instanceof Error) {
            this.error = state;
            this.asyncState = 'error';
            console.error(state);
        } else {
            this.error = undefined;
        }
    }
}
