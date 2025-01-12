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

function Table<T>({ selected = [], columns, data, addCheckbox, onSelect, areEqual }: TableProps<T>) {
  const isSelected = (row: T) => selected.some((s) => (areEqual ? areEqual(row, s) : row === s));

  const areAllSelected = useMemo(() => {
    if (data.length === 0) return false;
    return data.every((row) => isSelected(row));
  }, [data, isSelected]);

  const handleSelectAll = () => {
    if (!onSelect) return;
    onSelect(areAllSelected ? [] : data);
  };

  const handleToggleRow = (row: T) => {
    if (!onSelect) return;
    const newSelected = isSelected(row) ? selected.filter((s) => (areEqual ? !areEqual(s, row) : s !== row)) : [...selected, row];
    onSelect(newSelected);
  };

  return (
    <table>
      <thead>
        <tr>
          {addCheckbox && (
            <th>
              <input
                type='checkbox'
                checked={areAllSelected}
                onChange={handleSelectAll}
              />
              <span>Select All</span>
            </th>
          )}
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {addCheckbox && (
              <td>
                <input
                  type='checkbox'
                  checked={isSelected(row)}
                  onChange={() => handleToggleRow(row)}
                />
              </td>
            )}
            {columns.map((column) => (
              <td key={column.key}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
