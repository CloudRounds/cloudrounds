import { CreateUserInput, User } from '@/types';
import apiClient from '@/utils/apiClient';

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// fetch User by token
export const fetchCurrentUser = async () => {
  try {
    const response = await apiClient.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// fetches User by ID
export const fetchUserById = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


// fetches User by username
export const fetchUserByUsername = async (username: string) => {
  try {
    const response = await apiClient.get(`/users/username/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


export const updateUser = async (editedUser: User) => {
  try {
    const response = await apiClient.put(`/users/user/${editedUser.id}`, editedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  try {
    const response = await apiClient.put(`/users/${userId}/change-password`, { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
  }
};


export const createUser = async (credentials: CreateUserInput) => {
  try {
    const response = await apiClient.post('/users/register', credentials);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/users/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('There was an error during log in:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const toggleAttending = async (userId: string, articleId: string, isAttending: boolean) => {
  try {
    const response = await apiClient.put('/users/toggle-attendance', { userId, articleId, isAttending });
    return response.data;
  } catch (error) {
    console.error('Error updating attending for user:', error);
  }
};

export const toggleFavorite = async (userId: string, articleId: string, isFavorite: boolean) => {
  try {
    const response = await apiClient.put('/users/toggle-favorite', { userId, articleId, isFavorite });
    return response.data;
  } catch (error) {
    console.error('Error updating favorite for user:', error);
  }
};

export const getFavorites = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}/favorites`);
    return response.data;
  } catch (error) {
    console.error('Error getting favorites for user:', error);
  }
};