// RESPONSIBILITY: Iterates over a collection of repository data to render a uniform list of RepoCard components, handling empty states gracefully.
// DATA FLOW: Parent Container -> RepoList (Array of Data + Callbacks) -> RepoCard (Individual Data + Callbacks).

// IMPORT: React.
// IMPORT: 'RepoCard' component.
import RepoCard from "./RepoCard";
// IMPORT: 'IRepo' interface from '../types'.
import {type IRepo} from "../types/index";



/**
 * INTERFACE: IRepoListProps
 * 1. DATA: Expect 'repos' as 'IRepo[]'.
 * 2. STATE: Expect 'favorites' as 'IRepo[]' (or ideally, a Set of IDs for performance).
 * 3. CALLBACK: Expect 'onSave' as '(repo: IRepo) => void'.
 * 4. CALLBACK: Expect 'onRemove' as '(id: number) => void'.
 */
interface IRepoListProps {
    repos : IRepo[];
    // When you render a list of 100 repositories and need to check if each one is "favorited," an array has to scan every single item to find a match using Array (.includes()) or Set (.has()):
    // A Set physically cannot contain the same value twice
    favorites: IRepo[];
    onSave: (repo: IRepo) => void;
    onRemove: (id: number) => void;
};


/**
 * COMPONENT: RepoList
 * 1. SIGNATURE: Export functional component destructuring { repos, favorites, onSave, onRemove }.
 */

const RepoList = ({repos, favorites, onSave, onRemove}: IRepoListProps) => {

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
    if (repos.length === 0) {
        return (
            <div 
                className="empty-state"
            >
                No repositories found.
            </div>
        )
    }

    return (
        <div
            className="repo-list-container"
        >
            {repos.map( (repo: IRepo)  => {
                // for every single repo from the search results, you need to look into the favorites array and see if a match exists
                    // .some() on favorites array
                // pass result to the isSaved prop in the card
                const isSaved = favorites.some( (fav: IRepo) => fav.repoId === repo.repoId);

                return (
                    <RepoCard
                        key={repo.repoId}
                        repo={repo}
                        isSaved={isSaved}
                        onSave={onSave}
                        onRemove={onRemove}
                    />
                )
                }
            )}
        </div>
    );


}

export default RepoList;