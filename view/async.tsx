import { observer } from 'mobx-react-lite';
import { FCC } from '~/lib/types';
import styles from '~/styles/Loader.module.scss';
import { Modal } from './modal';

type Call = { error?: Error; loading?: boolean };

export const Async: FCC<{ call: Call }> = observer(({ call, children }) => {
    return (
        <>
            <Modal display={!!call.loading}>
                <div className={styles.loader} />
            </Modal>
            {children}
        </>
    );
});
