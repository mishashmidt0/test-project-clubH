import clsx from 'clsx';
import styles from './WhiteBlock.module.scss';

export const WhiteBlock = ({children, className}: any) => {
    return <div className={clsx(styles.block, className)}>{children}</div>;
};
