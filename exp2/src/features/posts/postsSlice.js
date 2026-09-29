import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter({ sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt) });

const initialState = postsAdapter.setAll(postsAdapter.getInitialState(), [
  { id: 'p1', title: 'Launch-day product story', platformId: 'linkedin', status: 'published', scheduledFor: '2026-09-01', updatedAt: '2026-09-01T10:00:00Z' },
  { id: 'p2', title: 'Behind the scenes: design sprint', platformId: 'instagram', status: 'draft', scheduledFor: '2026-09-04', updatedAt: '2026-09-01T09:00:00Z' },
  { id: 'p3', title: 'Weekly engineering update', platformId: 'x', status: 'published', scheduledFor: '2026-08-30', updatedAt: '2026-08-30T12:00:00Z' },
  { id: 'p4', title: 'Community Q&A announcement', platformId: 'linkedin', status: 'draft', scheduledFor: '2026-09-06', updatedAt: '2026-09-01T08:00:00Z' },
]);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      prepare: ({ title, platformId }) => ({
        payload: { id: nanoid(), title, platformId, status: 'draft', scheduledFor: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString() },
      }),
      reducer: postsAdapter.addOne,
    },
    togglePostStatus: (state, action) => {
      const post = state.entities[action.payload];
      if (post) {
        post.status = post.status === 'draft' ? 'published' : 'draft';
        post.updatedAt = new Date().toISOString();
      }
    },
    deletePost: postsAdapter.removeOne,
  },
});

export const { addPost, togglePostStatus, deletePost } = postsSlice.actions;
export const postsSelectors = postsAdapter.getSelectors((state) => state.posts);
export default postsSlice.reducer;
