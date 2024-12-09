import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
      />
      <span
        className={classNames('flex-1', {
          'line-through text-gray-400': todo.completed,
        })}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-600 focus:outline-none"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}