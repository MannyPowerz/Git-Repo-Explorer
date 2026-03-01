// RESPONSIBILITY: Captures user input for a GitHub username and broadcasts that string back to the parent component to trigger a search.
// DATA FLOW: User types -> Local State updates -> User clicks Search -> Parent's 'onSearch' prop function is executed.

// IMPORT: React and 'useState' hook to manage the input field's internal text.



/**
 * INTERFACE: ISearchBarProps
 * 1. SIGNATURE: Define an interface for the props this component expects.
 * 2. CALLBACK: It needs a single prop called 'onSearch'. 
 * 3. TYPE: 'onSearch' is a function that takes a 'username' (string) and returns 'void'.
 * WHY: This is the "communication cable" plugged in by the parent. The child sends data UP this cable.
 */

/**
 * COMPONENT: SearchBar
 * 1. SIGNATURE: Export a functional component that destructures '{ onSearch }' from its props.
 * 2. LOCAL STATE: Initialize 'username' state as an empty string using 'useState'.
 * WHY LOCAL STATE: You DO NOT want to lift every single keystroke up to the parent, or your entire page will re-render 10 times a second while typing. Keep the typing local.
 */

/**
 * HANDLER: handleSubmit
 * 1. SIGNATURE: Create a function to handle the form submission (takes an event object 'e').
 * 2. PREVENT DEFAULT: Call 'e.preventDefault()' so the browser doesn't refresh the page.
 * 3. VALIDATION: Check if 'username.trim()' is empty. If it is, return early (don't search for nothing).
 * 4. EXECUTE: Call the 'onSearch(username)' prop function, passing the local state UP to the parent.
 * 5. CLEANUP: Optional - clear the local state back to an empty string.
 */

// RETURN: Return JSX. 
// THE TRASH CHECK: Wrap the input and button inside a <form onSubmit={handleSubmit}>. 
// If you just use a <div> and an onClick on the button, the user can't press the "Enter" key on their keyboard to search. That is terrible UX.