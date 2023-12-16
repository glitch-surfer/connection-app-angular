import { AppState } from '../store.model';

export const selectConversations = (store: AppState) => store.conversations;
