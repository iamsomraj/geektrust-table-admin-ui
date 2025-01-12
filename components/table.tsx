import { useMemo } from 'react';

type Column<T> = {
  key: string;
  label: string;
  render: (value: T) => string;
};

type TableProps<T> = {
  selected?: T[];
  data: T[];
  columns: Column<T>[];
  addCheckbox?: boolean;
  onSelect?: (selected: T[]) => void;
  areEqual?: (a: T, b: T) => boolean;
};

function Table<T>({ selected, columns, data, addCheckbox, onSelect, areEqual }: TableProps<T>) {
  const areAllSelected = useMemo(() => {
    if (!selected || !data) return false;

    if (selected.length === 0) return false;

    const areAllSelected = data.every((d) => selected.some((s) => (areEqual ? areEqual(d, s) : d === s)));

    return areAllSelected;
  }, [selected, data, areEqual]);

  const handleSelectAll = () => {
    if (!onSelect) return;

    if (areAllSelected) {
      onSelect([]);
      return;
    }

    onSelect(data);
  };

  const handleSelect = (selected: T) => {
    if (!onSelect) return;

    onSelect([selected]);
  };

  return (
    <table>
      <thead>
        <tr>
          {addCheckbox && (
            <th>
              <input
                value={areAllSelected ? 'on' : 'off'}
                type='checkbox'
                onChange={() => handleSelectAll()}
              />
              <span>Select All</span>
            </th>
          )}
          {columns.map((column, index) => (
            <th key={index}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {addCheckbox && (
              <td>
                <input
                  value={selected?.some((s) => (areEqual ? areEqual(row, s) : row === s)) ? 'on' : 'off'}
                  type='checkbox'
                  onChange={() => handleSelect(row)}
                />
              </td>
            )}
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
