import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { dataLoad } from './utils/ingerdients-loads';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';
import AppHeader from './components/app-header/app-header';


const MESSAGE_LOADING = "Подождите, идет загрузка...";
const MESSAGE_ERROR = "Возникла ошибка при получении данных";

function App() {

    const [state, setState] = useState({ data: null, isLoading: true, isError: false });

    useEffect(() => {
        dataLoad()
        .then(data => {
            setState({ data: data, isLoading: false, isError: false });
        })
        .catch(err => {
            console.log('ошибка получения данных', err);
            setState({ data: null, isLoading: false, isError: true });
        });
    }, []);

    return (
        <>
            {(state.isLoading || state.isError) ? (
                <main className={styles.wait}>
                    <p className="text text_type_main-large">
                        {state.isLoading ? MESSAGE_LOADING : state.isError ? MESSAGE_ERROR : undefined}
                    </p>
                </main>
            ) :
            state.data && (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        <div className={styles.inner}>
                            <BurgerIngredients data={state.data} />
                            <BurgerConstructor data={state.data} />
                        </div>
                    </main>
                </>
            )}
        </>
    );
}

export default App;