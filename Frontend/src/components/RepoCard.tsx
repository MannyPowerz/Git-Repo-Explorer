// RESPONSIBILITY: Renders repository data and dynamically displays Save/Remove actions based on parent-provided state.
// DATA FLOW: Parent passes state/callbacks -> Card Renders -> User clicks -> Card executes corresponding Parent callback.

// IMPORT: React.
    // not necessary 
// IMPORT: 'IRepo' interface to strictly type the incoming 'repo' prop object.
import {type IRepo} from "../types/index";
// IMPORT: 'useAuth' hook to determine if action buttons should be rendered at all.
import {useAuth} from "../hooks/useAuth";



/**
 * INTERFACE: IRepoCardProps
 * 1. REPO: Expect 'repo' of type 'IRepo'.
 * 2. STATE: Expect 'isSaved' of type 'boolean'. (The parent's source of truth).
 * 3. ACTION (ADD): Expect 'onSave' as a function: '(repo: IRepo) => void'.
 * 4. ACTION (REMOVE): Expect 'onRemove' as a function: '(id: number) => void'. (Matches repoId type).
 */

interface IRepoCardProps {
    repo : IRepo;
    isSaved: boolean;
    onSave: (repo: IRepo) => void;
    onRemove: (id: number) => void;
};

/**
 * COMPONENT: RepoCard
 * 1. SIGNATURE: Export functional component destructuring { repo, isSaved, onSave, onRemove } from props.
 *      By using the curly braces { } inside the parentheses, you are telling JavaScript: "I know the first argument is an object. Instead of grabbing the whole object, just pluck these four specific keys out of it and make them local variables
 * 2. AUTH GATEKEEPER: Destructure { isAuthenticated } from useAuth().
 */

//export const RepoCard: React.FC<IRepoCardProps> = ({ repo, isSaved, onSave, onRemove }) => {
    //const { isAuthenticated } = useAuth();

const RepoCard = ({ repo, isSaved, onSave, onRemove }: IRepoCardProps) => {
    const { isAuthenticated } = useAuth();


/**
 * RENDER: JSX Layout
 * 1. DATA: Render the standard visual fields (name, description, starCount, language, link).
 * 2. CONDITIONAL LOGIC (Auth): Use logical AND. If '!isAuthenticated', the action area remains totally empty.
 * 3. CONDITIONAL LOGIC (Remove): If 'isAuthenticated' && 'isSaved', render the "Remove" button with onClick={() => onRemove(repo.repoId)}.
 * 4. CONDITIONAL LOGIC (Save): If 'isAuthenticated' && '!isSaved', render the "Save" button with onClick={() => onSave(repo)}.
 */
    return (
        // 1. DATA:
        <div 
            className="repo-card"
            style={{ border: '1px solid #ccc', padding: '15px', margin: '10px' }}
        >
            <h3>{repo.name}</h3>
            <p>{repo.description || "No description provided."}</p>

            <div 
                className="repo-meta"
            >
                <span>⭐ {repo.starCount}</span>

                {/* If the first part is true, it moves on and returns the second part.
                If the first part is false, it stops immediately and returns nothing (React won't render false or null to the UI) */}
                {repo.language && <span> • {repo.language}</span>}
                <a 
                    href={repo.link} 
                    target="_blank" 
                    rel="noreferrer">
                    View on GitHub
                </a>
            </div>
            {/* 2. ACTION AREA: Conditional Logic*/}
            <div
                className="repo-actions" 
                style={{ marginTop: '10px' }}
            > {/* Only show buttons if the user is logged in */}
                {isAuthenticated && (
                    <>
                        {/* 3. REMOVE BUTTON: User is logged in AND repo is already saved */}
                        {isSaved && 
                            (<button
                                onClick={() => onRemove(repo.repoId)}
                                style={{ color: 'red' }}
                            >
                                Remove from Favorites
                            </button>)
                        }

                        {/* 4. SAVE BUTTON: User is logged in AND repo is NOT yet saved */}
                        {!isSaved && 
                            (<button
                                onClick={() => onSave(repo)}
                                style={{ color: 'green' }}
                            >
                                Save to Favorites
                            </button>)
                        }
                    </>
                )}

            </div>
        </div>
    )
};

export default RepoCard;