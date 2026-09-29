import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, togglePostStatus } from './features/posts/postsSlice';
import { platformSelectors } from './features/platforms/platformsSlice';
import { setSearchTerm, setSelectedPlatform } from './features/ui/uiSlice';
import { selectDashboardStats, selectDraftCount, selectFilteredPosts, selectPostsByPlatform, selectPublishedCount, selectSelectedPlatform, selectSearchTerm } from './features/posts/selectors';

const PostCard = memo(function PostCard({ post, platform, onToggle, onDelete }) {
  return <article className="post-card">
    <div className="post-head"><span className="platform-dot" style={{ background: platform?.color }} /> <span>{platform?.name}</span><span className={`badge ${post.status}`}>{post.status}</span></div>
    <h3>{post.title}</h3><p>Scheduled: {post.scheduledFor}</p>
    <div className="post-actions"><button onClick={() => onToggle(post.id)}>Mark {post.status === 'draft' ? 'published' : 'draft'}</button><button className="quiet" onClick={() => onDelete(post.id)}>Remove</button></div>
  </article>;
});

function App() {
  const dispatch = useDispatch();
  const platforms = useSelector(platformSelectors.selectAll);
  const posts = useSelector(selectFilteredPosts);
  const stats = useSelector(selectDashboardStats);
  const publishedCount = useSelector(selectPublishedCount);
  const draftCount = useSelector(selectDraftCount);
  const selectedPlatform = useSelector(selectSelectedPlatform);
  const searchTerm = useSelector(selectSearchTerm);
  const [title, setTitle] = useState('');
  const [platformId, setPlatformId] = useState('linkedin');
  const [renderCount, setRenderCount] = useState(0);
  const linkedInPosts = useSelector((state) => selectPostsByPlatform(state, 'linkedin'));

  const submit = (event) => {
    event.preventDefault();
    if (title.trim()) { dispatch(addPost({ title: title.trim(), platformId })); setTitle(''); }
  };
  const platformMap = Object.fromEntries(platforms.map((item) => [item.id, item]));

  return <main>
    <header><div><p className="eyebrow">Full Stack Development – 2</p><h1>PostFlow Control Centre</h1><p>One normalized Redux store, with memoized views of publishing data.</p></div><button className="demo-button" onClick={() => setRenderCount((count) => count + 1)}>UI-only click: {renderCount}</button></header>
    <section className="explain"><div><b>Experiment 1 — Centralized state</b><span>Posts, platforms, and UI filters live in independent Redux slices.</span></div><div><b>Experiment 2 — Memoized selectors</b><span>Derived lists and statistics are cached with <code>createSelector</code>.</span></div></section>
    <section className="stats">{[[stats.total, 'Total posts'], [publishedCount, 'Published'], [draftCount, 'Drafts'], [stats.activePlatforms, 'Active platforms']].map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>
    <section className="workspace"><aside><h2>Add a draft</h2><form onSubmit={submit}><label>Post title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Write a post idea" required /></label><label>Platform<select value={platformId} onChange={(e) => setPlatformId(e.target.value)}>{platforms.map((platform) => <option value={platform.id} key={platform.id}>{platform.name}</option>)}</select></label><button type="submit">Save to Redux store</button></form><hr /><h2>Normalized state</h2><pre>{`posts: { ids, entities }\nplatforms: { ids, entities }\nui: { selectedPlatform, searchTerm }`}</pre><p className="small">LinkedIn selector result: {linkedInPosts.length} posts</p></aside>
      <div className="content"><div className="toolbar"><input aria-label="Search posts" value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} placeholder="Search titles…" /><select value={selectedPlatform} onChange={(e) => dispatch(setSelectedPlatform(e.target.value))}><option value="all">All platforms</option>{platforms.map((platform) => <option value={platform.id} key={platform.id}>{platform.name}</option>)}</select></div><p className="selector-note">Memoized filtered result: {posts.length} post{posts.length !== 1 ? 's' : ''}. UI-only clicks do not change selector inputs.</p><div className="posts">{posts.map((post) => <PostCard key={post.id} post={post} platform={platformMap[post.platformId]} onToggle={(id) => dispatch(togglePostStatus(id))} onDelete={(id) => dispatch(deletePost(id))} />)}{posts.length === 0 && <p>No matching posts.</p>}</div></div></section>
    <section className="breakdown"><h2>Memoized platform statistics</h2>{stats.platformBreakdown.map((platform) => <div key={platform.id}><span>{platform.name}</span><meter min="0" max={Math.max(stats.total, 1)} value={platform.count} /> <b>{platform.count}</b></div>)}</section>
  </main>;
}
export default App;
