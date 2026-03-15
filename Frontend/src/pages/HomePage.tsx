// RESPONSIBILITY: The Smart Container for searching GitHub, utilizing React Query to manage fetching, caching, and loading states.
// DATA FLOW: SearchBar (Submit) -> Local State (Query) -> React Query (Fetch) -> Memoized Set -> RepoList (Render).

// IMPORT: React hooks (useState, useMemo).
    // useMemo - caches the result of a calculation between re-renders, improving performance by skipping expensive recalculations unless dependencies change. It accepts a function that computes a value and a dependency array, only re-running the calculation when a dependency is updated
import {useState, useMemo} from "react";
// IMPORT: useQuery from '@tanstack/react-query'.
    // useQuery - tool for fetching, caching, synchronizing, and updating server data in React applications,  abstracts away complex data-fetching logic, replacing manual state management with useState and useEffect
        // two main arguments 
        // queryKey: A unique key (must be an array) that the library uses to internally manage and cache the data. The query automatically updates when this key changes. A unique key (string or an array) used for caching, refetching, and sharing the query data throughout your application
        // queryFn: An asynchronous function that fetches the data and must return a promise.
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
// IMPORT: Dumb Components (SearchBar, RepoList).
import SearchBar from "../components/SearchBar";
import RepoList from "../components/RepoList";
// IMPORT: repoService and useAuth.
import * as repoService from "../services/repoService";
import {useAuth} from "../hooks/useAuth";
import { type IRepo } from "../types/index";



/**
 * COMPONENT: HomePage
 * 1. GLOBAL STATE: Destructure '{ isAuthenticated }' from 'useAuth()'.
 * 2. LOCAL STATE: Initialize 'submittedUsername' as an empty string. 
 * WHY: Do NOT tie React Query to the live keystroke state, or it will fire an API call for every letter typed. Only update this state when the user hits 'Submit'.
 */
const HomePage = () => {
    const {isAuthenticated } = useAuth();
    const [submittedUsername,setSubmittedUsername] = useState('');
    const queryClient = useQueryClient();
/**
 * THE REACT QUERY: Fetching GitHub Repos
 * 1. HOOK: Initialize 'useQuery' with an object config.
 * 2. QUERY KEY: Set 'queryKey' to ['repos', submittedUsername]. (This tells React Query how to cache this specific search).
 * 3. QUERY FN: Set 'queryFn' to '() => repoService.searchRepos(submittedUsername)'.
 * 4. THE TRASH AVOIDANCE (Enabled): Set 'enabled: !!submittedUsername'. 
 * WHY: If you omit this, React Query fires the second the page loads, sending a blank username to the GitHub API, returning a 404, and crashing your UI instantly.
 * 5. DESTRUCTURE: Grab '{ data: searchResults, isLoading, isError, error }' from the useQuery return object.
 */
    const { 
        data: searchResults,
        isLoading: isSearchLoading, // Shows errors for both GitHub and Backend.
        isError: isSearchError,  // Specific naming convention
        error: searchError  ////  Does not Hide errors from the backend.
    } = useQuery<IRepo[]>({
        queryKey: ['repos', submittedUsername],
        queryFn: () => repoService.searchRepos(submittedUsername),
        enabled: !!submittedUsername
    });

/**
 * THE REACT QUERY: Fetching Local Favorites (If Authenticated)
 * 1. HOOK: Initialize a second 'useQuery' to fetch the user's favorites from your backend.
 * 2. CONFIG: queryKey: ['favorites'], queryFn: repoService.getFavorites, enabled: isAuthenticated.
 *          - enabled: allows you to control whether a query should automatically run or not. It accepts a boolean value or an expression that resolves to a boolean
 * 3. DESTRUCTURE: Grab '{ data: favorites }'.
 */

    const { 
        data: serverFavorites = [],   // Now you can see if favorites are loading!
        isError: isFavError,        // Now you can see if the backend failed!
        error: favError
    } = useQuery<IRepo[]>({
        queryKey: ['favorites'],
        queryFn: repoService.getFavorites,
        enabled: isAuthenticated 
    })

/**
 * MEMOIZATION: The O(1) Optimization
 * 1. HOOK: Use 'useMemo' dependent on '[favorites]'. 
 * 2. LOGIC: Convert the 'favorites' array into a Set of 'repoId's for instant O(1) lookup.
 *     -  On every subsequent render, React will compare the dependencies with the dependencies you passed during the last render. If none of the dependencies have changed (compared with Object.is), useMemo will return the value you already calculated before. Otherwise, React will re-run your calculation and return the new value.
 *              - The Function (() => ...): This is the Chef. React only calls the chef when the "ingredients" (favorites) change
 *              - The Result (new Set): This is the Meal. Once the chef makes it, React puts it in the Refrigerator (the memoization cache).
 */

    const favoriteIds = useMemo( () => 
        { 
            return new Set(serverFavorites.map(fav => fav.repoId) );
        } , 
        [serverFavorites]
    );

/**
 * HANDLERS
 * 1. handleSearch: Takes the string from SearchBar and updates 'submittedUsername'. (This reactively triggers the useQuery).
 * 2. handleSave / handleRemove: Async functions that call the service and then trigger 'queryClient.invalidateQueries({ queryKey: ['favorites'] })' to instantly refresh the cache.
 *      .invalidateQueries() - s a specific command that tells the manager: "The data we have is no longer the truth." When this runs, two things happen instantly
 *          - The data currently in the cache for that key is marked as "stale" (expired).
 *          - If the component using that data is currently on the screen, React Query will immediately fire off a new network request to get the updated version from the server
 *      { queryKey: ['favorites'] } -  This is how you tell the manager which piece of data to throw away.
 *           - React Query stores data in buckets labeled by their queryKey
 *           - By passing ['favorites'], you are saying: "Leave the search results alone, leave the user profile alone, but destroy and refresh everything in the favorites bucket
 * 
 *
 */        

    const {mutate: saveMutation} = useMutation({
        mutationFn: (repo: IRepo) => repoService.addFavorite(repo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    })

    const {mutate: removeMutation} = useMutation({
        mutationFn: (repoId: number) => repoService.removeFavorite(repoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    })


    const handleSearch = (username: string) =>  setSubmittedUsername(username) ;

    const handleSave = (repo: IRepo) =>  saveMutation(repo) ;
    

    const handleRemove = (repoId: number) =>  removeMutation(repoId)  ;


/**
 * RENDER: JSX Layout
 * 1. RENDER: <SearchBar onSearch={handleSearch} />
 * 2. RENDER: Handle isLoading (show skeleton) and isError (show error message).
 * 3. RENDER: <RepoList repos={searchResults || []} favorites={favoriteIds} onSave={handleSave} onRemove={handleRemove} />
 */

    return (
        <div className="homepage-content">

            <SearchBar onSearch={handleSearch} />

            {/* Use the Favorites Error Shield */}
            {isFavError && (
                <p className="warning">
                    ⚠️ Favorites are currently unavailable: {favError?.message}
                </p>
            )}

            {/* 1. Error State */}
            {isSearchError && (
                <p className="error">
                    Something went wrong. Try again.
                    <br />
                    {searchError instanceof Error ? searchError.message : "GitHub Error"}
                </p>
            )}

            {/* 2. Loading State */}
            {isSearchLoading && <p className="Loading">Fetching repos...</p>}

            {/* 3. Empty State (Only if not loading, no error, and we actually searched) */}
            {!isSearchLoading && !isSearchError && submittedUsername && searchResults?.length === 0 && (
                <p className="no-results">No repositories found for "{submittedUsername}".</p>
            )}

            {/* 4. Success State */}
            {!isSearchLoading && !isSearchError && !isFavError && searchResults && searchResults.length > 0 && (
                <RepoList
                    repos={searchResults || []} 
                    favorites={favoriteIds} 
                    onSave={handleSave} 
                    onRemove={handleRemove} 
                />
            )}

        </div>
    )

};

export default HomePage;