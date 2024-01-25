import { FETCH_CURRENT_USER_QUERY } from './queries/FetchCurrentUser';
import { client } from '@/utils/apolloClient';
import { User, UserData } from '@/types';
import { UPDATE_USER_MUTATION } from './mutations/UpdateUser';
import { CHANGE_PASSWORD_MUTATION } from './mutations/ChangePassword';
import { CREATE_USER_MUTATION } from './mutations/CreateUser';
import { FETCH_USERS_QUERY } from './queries/FetchUsers';
import { FETCH_FAVORITES_QUERY } from './queries/FetchFavorites';
import { TOGGLE_ATTENDANCE_MUTATION } from './mutations/ToggleAttendance';
import { TOGGLE_FAVORITE_MUTATION } from './mutations/ToggleFavorite';
import { LOGIN_USER_MUTATION } from './mutations/LoginUser';
import { DELETE_USER_MUTATION } from './mutations/DeleteUser';


export const fetchCurrentUser = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_CURRENT_USER_QUERY,
      fetchPolicy: 'network-only',
    });

    return data.currentUser;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const updateUser = async (editedUser: User) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: { id: editedUser.id, updates: editedUser },
    });
    return data.updateUser;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  try {
    const { data } = await client.mutate({
      mutation: CHANGE_PASSWORD_MUTATION,
      variables: { userId, currentPassword, newPassword },
    });
    return data.changePassword;
  } catch (error) {
    console.error('Error changing password:', error);
  }
};

export const createUser = async (credentials: UserData) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: { userData: credentials },
    });
    return data.registerUser;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER_MUTATION,
      variables: { username, password },
    });
    return data.loginUser;
  } catch (error) {
    console.error('There was an error during log in:', error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_USER_MUTATION,
      variables: { id: userId },
    });
    // userStore.setUsers(userStore.users.filter(user => user._id !== userId));
    return data.deleteUser;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_USERS_QUERY,
      fetchPolicy: 'network-only',
    });
    return data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const toggleAttending = async (userId: string, articleId: string, isAttending: boolean) => {
  try {
    const { data } = await client.mutate({
      mutation: TOGGLE_ATTENDANCE_MUTATION,
      variables: { userId, articleId, isAttending },
    });
    return data.toggleAttendance;
  } catch (error) {
    console.error('Error updating attending for user:', error);
  }
};


export const toggleFavorite = async (userId: string, articleId: string, isFavorite: boolean) => {
  try {
    const { data } = await client.mutate({
      mutation: TOGGLE_FAVORITE_MUTATION,
      variables: { userId, articleId, isFavorite },
    });
    return data.toggleFavorite;
  } catch (error) {
    console.error('Error updating favorite for user:', error);
  }
};


export const getFavorites = async (userId: string) => {
  try {
    const { data } = await client.query({
      query: FETCH_FAVORITES_QUERY,
      variables: { userId },
      fetchPolicy: 'network-only',
    });
    return data.favorites;
  } catch (error) {
    console.error('Error getting favorites for user:', error);
  }
};
