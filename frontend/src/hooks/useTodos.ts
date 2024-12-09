import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { todoService } from '../services/todoService';
import { getErrorMessage, logError } from '../utils/errorHandling';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      const message = getErrorMessage(err);
      setError('Failed to load todos. Please try again later.');
      logError('loadTodos', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      setError(null);
      const newTodo = await todoService.createTodo(text);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      const message = getErrorMessage(err);
      setError('Failed to add todo. Please try again.');
      logError('addTodo', err);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      setError(null);
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = await todoService.updateTodo(id, {
        completed: !todoToUpdate.completed,
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      const message = getErrorMessage(err);
      setError('Failed to update todo. Please try again.');
      logError('toggleTodo', err);
    }
  };

  const updateTodo = async (id: string, text: string) => {
    try {
      setError(null);
      const updatedTodo = await todoService.updateTodo(id, { text });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      const message = getErrorMessage(err);
      setError('Failed to update todo. Please try again.');
      logError('updateTodo', err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      const message = getErrorMessage(err);
      setError('Failed to delete todo. Please try again.');
      logError('deleteTodo', err);
    }
  };

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
}