import { PiMagnifyingGlassBold } from 'react-icons/pi';

import css from './SearchBar.module.css';
import { ISearchBarProps } from './types';
import { FormEvent } from 'react';

const SearchBar: React.FC<ISearchBarProps> = ({ onSubmit, notify }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const queryInput = form.elements.namedItem('query') as HTMLInputElement;
    const query = queryInput.value.toLowerCase().trim();
    if (query === '') return notify();
    onSubmit(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.button} type="submit">
          <PiMagnifyingGlassBold />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
