import type { NextPage } from 'next';
import { SearchResult } from '~/view/search.result';
import styles from '../styles/Search.module.scss';
import { Layout } from '../view/layout';
import { SearchUsers } from '../view/search.input';

const Search: NextPage = () => {
    return (
        <Layout>
            <div className={styles.root}>
                <SearchUsers />
                <SearchResult />
            </div>
        </Layout>
    );
};

export default Search;
