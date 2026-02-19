import { useState } from 'react';

export function SearchBar({ onSearch, placeholder = 'Buscar por nombre...' }) {
  const [value, setValue] = useState('');
  const onChange = (e) => {
    const v = e.target.value;
    setValue(v);
    onSearch(v);
  };
  return (
    <div className="searchbar-wrap">
      <span className="searchbar-icon" aria-hidden>🔍</span>
      <input type="search" className="searchbar-input" value={value} onChange={onChange} placeholder={placeholder} aria-label="Buscar personajes" />
    </div>
  );
}
