// RESPONSIBILITY: Fetches and displays the user's saved repositories via React Query and the internal backend.
// DATA FLOW: React Query (Cache/Fetch) -> FavoritesPage -> RepoList -> Render.

// IMPORT: React, useQuery, useMutation, useQueryClient.
    // useQuery - for fetching favorites (enabled only when authenticated)
// IMPORT: RepoList, repoService.
import {useQuery, useQueryClient} from "@tanstack/react-query";
import RepoList from "../components/RepoList";
import * as repoService from "../services/repoService";
import {useMemo} from "react";
import {useAuth} from "../hooks/useAuth.tsx";
import { type IRepo } from "../types/index";

/**
 * COMPONENT: FavoritesPage
 * 1. SETUP: Initialize 'queryClient = useQueryClient()'.
 */
const FavoritesPage = () => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

/**
 * THE REACT QUERY: Fetching Favorites
 * 1. HOOK: useQuery with queryKey ['favorites'] and queryFn 'repoService.getFavorites'.
 * 2. DESTRUCTURE: { data: favorites, isLoading, isError }.
 */
    const { 
        data: favorites = [], 
        isLoading, 
        isError,
        error
    } = useQuery<IRepo[]>({
        queryKey: ['favorites'],
        queryFn: repoService.getFavorites,
        enabled: isAuthenticated
    })

/**
 * MEMOIZATION: The Favorites Set
 * 1. LOGIC: Create 'favoriteIdsSet' from the fetched favorites. 
 * WHY: You still need to pass this down to the RepoList so it knows to render the "Remove" buttons instead of "Save".
 */
    const favoriteIdsSet = useMemo( () => {
        return new Set(favorites.map(fav => fav.repoId));
    }, [favorites] );

/**
 * HANDLER: handleRemove (The Mutation)
 * 1. LOGIC: Define a function that awaits 'repoService.removeFavorite(id)'.
 * 2. CACHE INVALIDATION: Upon success, call 'queryClient.invalidateQueries({ queryKey: ['favorites'] })'.
 * WHY: This tells React Query "The database changed, go fetch the fresh list in the background right now and update the UI."
 */

        // MUTATION HANDLER: Syncing the cache
    const handleRemove = async (repoId: number) => {
        try{
            // It calls your repoService.getFavorites again.
            // It grabs the fresh data from the database.
            // It replaces the old data in the cache.
            await repoService.removeFavorite(repoId);
            // The Trigger: This tells the FavoritesPage to re-run the queryand remove the item from the list instantly. React Query will immediately and automatically trigger a new fetch
            // Bridge that synchronizes local browser state with actual database
            // ['favorites'] -  when fetching favorites, it stores them in a "bucket" labeled favorites
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        } catch (error) {
            console.error("Failed to remove favorite", error);
        }
    };

        // UI GUARDS
    if (!isAuthenticated) {
        return <p className="warning">Please log in to view your favorites.</p>;
    }

    if (isLoading) {
        return <p className="loading">Loading your collection...</p>;
    }

    if (isError) {
        return (
            <p className="error">
                Failed to load favorites. {error instanceof Error ? error.message : "Backend Error"}
            </p>
        );
    }
        


/**
 * RENDER: JSX Layout
 * 1. UI STATES: Handle isLoading and isError.
 * 2. RENDER: <RepoList repos={favorites || []} favoritesSet={favoriteIdsSet} onRemove={handleRemove} />. 
 * NOTE: Do not pass an 'onSave' prop here. You can't save a repo that is already in your favorites.
 */
    return(
        <div className="favoritepage-content">
            <h2>My Saved Repositories</h2>
            <RepoList 
                repos = {favorites}
                favorites = {favoriteIdsSet}
                onRemove = {handleRemove} 
            /> 
        </div>
    );
}

export default FavoritesPage;

