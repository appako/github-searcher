import type { NextPage } from 'next';
import { UserInfo } from '~/view/user.info';
import { UserRepos } from '~/view/user.repos';
import styles from '../styles/User.module.scss';
import { Layout } from '../view/layout';

const User: NextPage = () => {
    return (
        <Layout>
            <div className={styles.root}>
                <UserInfo />
                <UserRepos />
            </div>
        </Layout>
    );
};

export default User;
