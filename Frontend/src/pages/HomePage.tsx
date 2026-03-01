// RESPONSIBILITY: The Smart Container for searching GitHub, utilizing React Query to manage fetching, caching, and loading states.
// DATA FLOW: SearchBar (Submit) -> Local State (Query) -> React Query (Fetch) -> Memoized Set -> RepoList (Render).

// IMPORT: React hooks (useState, useMemo).
// IMPORT: useQuery from '@tanstack/react-query'.
// IMPORT: Dumb Components (SearchBar, RepoList).
// IMPORT: repoService and useAuth.



/**
 * COMPONENT: HomePage
 * 1. GLOBAL STATE: Destructure '{ isAuthenticated }' from 'useAuth()'.
 * 2. LOCAL STATE: Initialize 'submittedUsername' as an empty string. 
 * WHY: Do NOT tie React Query to the live keystroke state, or it will fire an API call for every letter typed. Only update this state when the user hits 'Submit'.
 */

/**
 * THE REACT QUERY: Fetching GitHub Repos
 * 1. HOOK: Initialize 'useQuery' with an object config.
 * 2. QUERY KEY: Set 'queryKey' to ['repos', submittedUsername]. (This tells React Query how to cache this specific search).
 * 3. QUERY FN: Set 'queryFn' to '() => repoService.searchRepos(submittedUsername)'.
 * 4. THE TRASH AVOIDANCE (Enabled): Set 'enabled: !!submittedUsername'. 
 * WHY: If you omit this, React Query fires the second the page loads, sending a blank username to the GitHub API, returning a 404, and crashing your UI instantly.
 * 5. DESTRUCTURE: Grab '{ data: searchResults, isLoading, isError, error }' from the useQuery return object.
 */

/**
 * THE REACT QUERY: Fetching Local Favorites (If Authenticated)
 * 1. HOOK: Initialize a second 'useQuery' to fetch the user's favorites from your backend.
 * 2. CONFIG: queryKey: ['favorites'], queryFn: repoService.getFavorites, enabled: isAuthenticated.
 * 3. DESTRUCTURE: Grab '{ data: favorites }'.
 */

/**
 * MEMOIZATION: The O(1) Optimization
 * 1. HOOK: Use 'useMemo' dependent on '[favorites]'.
 * 2. LOGIC: Convert the 'favorites' array into a Set of 'repoId's for instant O(1) lookup.
 */

/**
 * HANDLERS
 * 1. handleSearch: Takes the string from SearchBar and updates 'submittedUsername'. (This reactively triggers the useQuery).
 * 2. handleSave / handleRemove: Async functions that call the service and then trigger 'queryClient.invalidateQueries({ queryKey: ['favorites'] })' to instantly refresh the cache.
 */

/**
 * RENDER: JSX Layout
 * 1. RENDER: <SearchBar onSearch={handleSearch} />
 * 2. RENDER: Handle isLoading (show skeleton) and isError (show error message).
 * 3. RENDER: <RepoList repos={searchResults || []} favoritesSet={favoriteIdsSet} onSave={handleSave} onRemove={handleRemove} />
 */