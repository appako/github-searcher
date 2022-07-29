import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useService } from '~/services/app';
import { UserService } from '~/services/service.user';
import styles from '../styles/User.module.scss';
import { Async } from './async';

export const UserInfo = observer(() => {
    const userSvc = useService(UserService);
    userSvc.useData();

    return (
        <Async call={userSvc}>
            <div className={styles.info}>
                <div>
                    {userSvc.info?.avatar_url && (
                        <Image src={userSvc.info.avatar_url} alt="" width={300} height={300} objectFit="contain" />
                    )}
                </div>
                <div>
                    {userSvc.infoFields.map(f => {
                        const d = userSvc.info?.[f.key]?.toString();
                        if (!d) return null;
                        return <h4 key={f.key}>{f.render ? f.render(d) : d}</h4>;
                    })}
                </div>
            </div>
        </Async>
    );
});
