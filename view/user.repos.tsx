import { observer } from 'mobx-react-lite';
import { useService } from '~/services/app';
import { UserService } from '~/services/service.user';
import styles from '../styles/User.module.scss';
import { Async } from './async';
import { SearchRepos } from './search.input';

export const UserRepos = observer(() => {
    const userSvc = useService(UserService);
    userSvc.useData();

    if (!userSvc.repos.length) return null;
    return (
        <Async call={userSvc}>
            <SearchRepos />
            <ul className={styles.repos}>
                {userSvc.reposFiltered.map(r => {
                    return (
                        <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer">
                            <li className={styles.item}>
                                <h4>{r.name}</h4>
                                <div>
                                    <p>{r.forks} Forks</p>
                                    <p>{r.stargazers_count} Stars</p>
                                </div>
                            </li>
                        </a>
                    );
                })}
            </ul>
        </Async>
    );
});
