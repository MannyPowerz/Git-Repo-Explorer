// RESPONSIBILITY: Renders repository data and dynamically displays Save/Remove actions based on parent-provided state.
// DATA FLOW: Parent passes state/callbacks -> Card Renders -> User clicks -> Card executes corresponding Parent callback.

// IMPORT: React.
// IMPORT: 'IRepo' interface to strictly type the incoming 'repo' prop object.
// IMPORT: 'useAuth' hook to determine if action buttons should be rendered at all.



/**
 * INTERFACE: IRepoCardProps
 * 1. REPO: Expect 'repo' of type 'IRepo'.
 * 2. STATE: Expect 'isSaved' of type 'boolean'. (The parent's source of truth).
 * 3. ACTION (ADD): Expect 'onSave' as a function: '(repo: IRepo) => void'.
 * 4. ACTION (REMOVE): Expect 'onRemove' as a function: '(id: number) => void'. (Matches repoId type).
 */

/**
 * COMPONENT: RepoCard
 * 1. SIGNATURE: Export functional component destructuring { repo, isSaved, onSave, onRemove } from props.
 * 2. AUTH GATEKEEPER: Destructure { isAuthenticated } from useAuth().
 */

/**
 * RENDER: JSX Layout
 * 1. DATA: Render the standard visual fields (name, description, starCount, language, link).
 * 2. CONDITIONAL LOGIC (Auth): Use logical AND. If '!isAuthenticated', the action area remains totally empty.
 * 3. CONDITIONAL LOGIC (Remove): If 'isAuthenticated' && 'isSaved', render the "Remove" button with onClick={() => onRemove(repo.repoId)}.
 * 4. CONDITIONAL LOGIC (Save): If 'isAuthenticated' && '!isSaved', render the "Save" button with onClick={() => onSave(repo)}.
 */