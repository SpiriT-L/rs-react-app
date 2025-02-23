import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setTheme } from '../../store/themeSlice';
import style from './ThemeSwitcher.module.scss';

const ThemeSwitcher: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return (
    <div className={style.themeSwitcher} data-testid="theme-switcher">
      <label className={style.switch}>
        <input
          type="checkbox"
          id="theme-toggle"
          checked={theme === 'dark'}
          onChange={handleThemeChange}
        />
        <span className={style.slider}>
          <span className={style.sun}>☀️</span>
          <span className={style.moon}>🌙</span>
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
