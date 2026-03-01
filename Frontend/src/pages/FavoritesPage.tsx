// RESPONSIBILITY: Fetches and displays the user's saved repositories via React Query and the internal backend.
// DATA FLOW: React Query (Cache/Fetch) -> FavoritesPage -> RepoList -> Render.

// IMPORT: React, useQuery, useMutation, useQueryClient.
// IMPORT: RepoList, repoService.

/**
 * COMPONENT: FavoritesPage
 * 1. SETUP: Initialize 'queryClient = useQueryClient()'.
 */

/**
 * THE REACT QUERY: Fetching Favorites
 * 1. HOOK: useQuery with queryKey ['favorites'] and queryFn 'repoService.getFavorites'.
 * 2. DESTRUCTURE: { data: favorites, isLoading, isError }.
 */

/**
 * MEMOIZATION: The Favorites Set
 * 1. LOGIC: Create 'favoriteIdsSet' from the fetched favorites. 
 * WHY: You still need to pass this down to the RepoList so it knows to render the "Remove" buttons instead of "Save".
 */

/**
 * HANDLER: handleRemove (The Mutation)
 * 1. LOGIC: Define a function that awaits 'repoService.removeFavorite(id)'.
 * 2. CACHE INVALIDATION: Upon success, call 'queryClient.invalidateQueries({ queryKey: ['favorites'] })'.
 * WHY: This tells React Query "The database changed, go fetch the fresh list in the background right now and update the UI."
 */

/**
 * RENDER: JSX Layout
 * 1. UI STATES: Handle isLoading and isError.
 * 2. RENDER: <RepoList repos={favorites || []} favoritesSet={favoriteIdsSet} onRemove={handleRemove} />. 
 * NOTE: Do not pass an 'onSave' prop here. You can't save a repo that is already in your favorites.
 */