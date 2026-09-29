import { createSelector } from '@reduxjs/toolkit';
import { postsSelectors } from './postsSlice';
import { platformSelectors } from '../platforms/platformsSlice';

export const selectAllPosts = postsSelectors.selectAll;
export const selectSelectedPlatform = (state) => state.ui.selectedPlatform;
export const selectSearchTerm = (state) => state.ui.searchTerm;

// Recomputes only when posts, platform choice, or search text changes.
export const selectFilteredPosts = createSelector(
  [selectAllPosts, selectSelectedPlatform, selectSearchTerm],
  (posts, platformId, searchTerm) => posts.filter((post) =>
    (platformId === 'all' || post.platformId === platformId) &&
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  ),
);

export const selectPostsByPlatform = createSelector(
  [selectAllPosts, (_, platformId) => platformId],
  (posts, platformId) => posts.filter((post) => post.platformId === platformId),
);

export const selectPublishedCount = createSelector([selectAllPosts], (posts) =>
  posts.filter((post) => post.status === 'published').length,
);

export const selectDraftCount = createSelector([selectAllPosts], (posts) =>
  posts.filter((post) => post.status === 'draft').length,
);

export const selectDashboardStats = createSelector(
  [selectAllPosts, platformSelectors.selectAll],
  (posts, platforms) => ({
    total: posts.length,
    published: posts.filter((post) => post.status === 'published').length,
    drafts: posts.filter((post) => post.status === 'draft').length,
    activePlatforms: new Set(posts.map((post) => post.platformId)).size,
    platformBreakdown: platforms.map((platform) => ({
      ...platform,
      count: posts.filter((post) => post.platformId === platform.id).length,
    })),
  }),
);
