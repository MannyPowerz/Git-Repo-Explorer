// RESPONSIBILITY: Iterates over a collection of repository data to render a uniform list of RepoCard components, handling empty states gracefully.
// DATA FLOW: Parent Container -> RepoList (Array of Data + Callbacks) -> RepoCard (Individual Data + Callbacks).

// IMPORT: React.
// IMPORT: 'RepoCard' component.
// IMPORT: 'IRepo' interface from '../types'.



/**
 * INTERFACE: IRepoListProps
 * 1. DATA: Expect 'repos' as 'IRepo[]'.
 * 2. STATE: Expect 'favorites' as 'IRepo[]' (or ideally, a Set of IDs for performance).
 * 3. CALLBACK: Expect 'onSave' as '(repo: IRepo) => void'.
 * 4. CALLBACK: Expect 'onRemove' as '(id: number) => void'.
 */

/**
 * COMPONENT: RepoList
 * 1. SIGNATURE: Export functional component destructuring { repos, favorites, onSave, onRemove }.
 */

/**
 * RENDER: JSX Layout
 * 1. EMPTY STATE GUARD: If 'repos.length === 0', immediately return a fallback UI (e.g., <div className="empty-state">No repositories found.</div>).
 * WHY: If you don't handle the empty state, the user stares at a blank white screen and assumes your app is broken.
 * 2. MAPPING: Return a container <div> that maps over the 'repos' array.
 * 3. THE LOOP: For each 'repo' in the array, render a '<RepoCard />'.
 * 4. THE PROP PASSING: 
 * - Pass 'key={repo.repoId}' (CRITICAL: React will scream in the console and destroy performance if you forget the unique key).
 * - Pass 'repo={repo}'.
 * - Pass 'isSaved={favorites.some(fav => fav.repoId === repo.repoId)}'.
 * - Pass 'onSave={onSave}'.
 * - Pass 'onRemove={onRemove}'.
 */