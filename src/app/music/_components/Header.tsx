import styles from '../../../../styles/music/music.module.css';
import { useRouter } from 'next/navigation';

export default function Headers() {

    const router = useRouter();

    return (
        <>
            <div
                className={styles.out_div}
                onClick={() => { router.push('/main'); }}
            ></div>
        </>
    )
}