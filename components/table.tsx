import Input from '@/components/input';
import Button from '@/components/button';
import { useCallback, useMemo, useState } from 'react';

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
  addActions?: boolean;
  onSelect?: (selected: T[]) => void;
  onDelete?: (row: T) => void;
  onSave?: (updatedRow: T) => void;
  areEqual?: (a: T, b: T) => boolean;
};

function Table<T>({ selected = [], columns, data, addCheckbox, addActions, onSelect, onDelete, onSave, areEqual }: TableProps<T>) {
  const [editingRow, setEditingRow] = useState<T | null>(null);
  const [editedData, setEditedData] = useState<Partial<T>>({});

  const isSelected = useCallback((row: T) => selected.some((s) => (areEqual ? areEqual(row, s) : row === s)), [selected, areEqual]);

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

  const handleEdit = (row: T) => {
    setEditingRow(row);
    setEditedData(row);
  };

  const handleSave = () => {
    if (onSave && editingRow) {
      onSave({ ...editingRow, ...editedData } as T);
      setEditingRow(null);
      setEditedData({});
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const handleDelete = (row: T) => {
    if (onDelete) {
      onDelete(row);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <table>
      <thead>
        <tr>
          {addCheckbox && (
            <th>
              <input
                id='select-all'
                type='checkbox'
                checked={areAllSelected}
                onChange={handleSelectAll}
              />
              <label
                htmlFor='select-all'
                className='ml-2'
              >
                Select All
              </label>
            </th>
          )}
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
          {addActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {addCheckbox && (
              <td className='text-center'>
                <input
                  type='checkbox'
                  checked={isSelected(row)}
                  onChange={() => handleToggleRow(row)}
                />
              </td>
            )}
            {columns.map((column) => (
              <td
                key={column.key}
                className='text-center'
              >
                {editingRow === row ? (
                  <Input
                    value={(editedData[column.key as keyof T] as string) || ''}
                    onChange={(e) => handleInputChange(column.key, e.target.value)}
                  />
                ) : (
                  column.render(row)
                )}
              </td>
            ))}
            {addActions && (
              <td className='flex gap-2 justify-center'>
                {editingRow === row ? (
                  <>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(row)}>Edit</Button>
                    <Button onClick={() => handleDelete(row)}>Delete</Button>
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
