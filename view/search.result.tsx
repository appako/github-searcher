import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import { useService } from '~/services/app';
import { SearchService } from '~/services/service.search';
import styles from '../styles/Search.module.scss';

export const SearchResult = observer(() => {
    const searchSvc = useService(SearchService);
    return (
        <ul className={styles.items}>
            {searchSvc.result.map(user => {
                return (
                    <Link key={user.id} href={`/user?username=${user.login}`}>
                        <li className={styles.item}>
                            <Image src={user.avatar_url} alt="avatar" width={80} height={80} />
                            <h4>{user.login}</h4>
                            <p>Repo: {'##'}</p>
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
});
