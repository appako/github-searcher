import { observer } from 'mobx-react-lite';
import { UserService } from '~/services/service.user';
import { useService } from '../services/app';
import { SearchService } from '../services/service.search';
import styles from '../styles/Search.module.scss';
import { Async } from './async';

export const SearchUsers = observer(() => {
    const searchSvc = useService(SearchService);
    return (
        <Async call={searchSvc}>
            <input
                className={styles.input}
                placeholder="Search for Users"
                onChange={({ target: { value } }) => searchSvc.search(value)}
                value={searchSvc.query}
            />
        </Async>
    );
});

export const SearchRepos = observer(() => {
    const userSvc = useService(UserService);
    return (
        <Async call={userSvc}>
            <input
                className={styles.input}
                placeholder="Search for User's Repositories"
                onChange={({ target: { value } }) => userSvc.setReposFilter(value)}
                value={userSvc.filter}
            />
        </Async>
    );
});
