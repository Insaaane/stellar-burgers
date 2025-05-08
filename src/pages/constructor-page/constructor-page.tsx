import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { getIngredientsStatus } from '../../services/slices/IngredientsSlice';
import { getIngredientsList } from '../../services/thunks/IngredientsThunk';

export const ConstructorPage: FC = () => {
  const { isLoading } = useSelector(getIngredientsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsList());
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
