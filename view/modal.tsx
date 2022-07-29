import { FCC } from '~/lib/types';

import styles from '~/styles/Modal.module.scss';

export const Modal: FCC<{ display: boolean }> = ({ children, display }) => {
    return (
        <div className={styles.modal} style={{ display: display ? 'block' : 'none' }}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};
