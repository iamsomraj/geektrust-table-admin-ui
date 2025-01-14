import Button from '@/components/button';
import Input from '@/components/input';
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
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse border border-gray-200 text-sm'>
        <thead className='bg-gray-100'>
          <tr>
            {addCheckbox && (
              <th className='p-2 text-center'>
                <input
                  id='select-all'
                  type='checkbox'
                  checked={areAllSelected}
                  onChange={handleSelectAll}
                  className='h-4 w-4'
                />
                <label
                  htmlFor='select-all'
                  className='sr-only'
                >
                  Select All
                </label>
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className='border border-gray-200 p-2 text-left text-xs md:text-sm'
              >
                {column.label}
              </th>
            ))}
            {addActions && <th className='border border-gray-200 p-2 text-left'>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isRowSelected = isSelected(row);
            const isEditing = editingRow === row;

            return (
              <tr
                key={rowIndex}
                className={`border border-gray-200 ${isRowSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                {addCheckbox && (
                  <td className='border border-gray-200 p-2 text-center'>
                    <input
                      type='checkbox'
                      checked={isRowSelected}
                      onChange={() => handleToggleRow(row)}
                      className='h-4 w-4'
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`border border-gray-200 p-2 text-xs md:text-sm ${isEditing ? 'bg-yellow-50' : ''}`}
                  >
                    {isEditing ? (
                      <Input
                        value={(editedData[column.key as keyof T] as string) || ''}
                        onChange={(e) => handleInputChange(column.key, e.target.value)}
                        className='w-full'
                      />
                    ) : (
                      column.render(row)
                    )}
                  </td>
                ))}
                {addActions && (
                  <td className='flex gap-2 justify-start p-2 text-xs md:text-sm'>
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          className='save'
                        >
                          Save
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEdit(row)}
                          className='edit'
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(row)}
                          className='delete'
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
