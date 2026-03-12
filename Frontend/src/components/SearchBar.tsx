// RESPONSIBILITY: Captures user input for a GitHub username and broadcasts that string back to the parent component to trigger a search.
// DATA FLOW: User types -> Local State updates -> User clicks Search -> Parent's 'onSearch' prop function is executed.

// IMPORT: React and 'useState' hook to manage the input field's internal text.
import {useState, type ReactElement, type FormEvent } from 'react';

/**
 * INTERFACE: ISearchBarProps
 * 1. SIGNATURE: Define an interface for the props this component expects.
 * 2. CALLBACK: It needs a single prop called 'onSearch'. 
 * 3. TYPE: 'onSearch' is a function that takes a 'username' (string) and returns 'void'.
 *      - type behavior (actions).
 *      - ```(...):``` This represents the input side of the pipe, Whatever function you pass here MUST accept these specific arguments
 *      -  ```=>``` :This is the "map" or "returns" arrow. It points from the input to the result.
 *      - ```username: string``` This defines the variable name (for readability) and the strict type
 *      - ```void``` -  This represents the output side. In programming, void means "nothing." It tells TypeScript: "This function does its job (like updating state) but it doesn't hand back a value to the caller."
 * WHY: This is the "communication cable" plugged in by the parent. The child sends data UP this cable.
 */

interface ISearchBarProps {
    onSearch: (username: string) => void;
}

/**
 * COMPONENT: SearchBar
 * 1. SIGNATURE: Export a functional component that destructures '{ onSearch }' from its props.
 *      ```({ onSearch })``` This is JavaScript. It is the act of pulling the variable out of the object.
 *      ```(: SearchBarProps)```This is TypeScript. It is the rulebook that proves onSearch actually exists and has the correct signature.
 * 2. LOCAL STATE: Initialize 'username' state as an empty string using 'useState'.
 *      - useState is crucial for managing data that needs to change over time and for triggering the component to re-render when the data changes. 
 *      - 
 * WHY LOCAL STATE: You DO NOT want to lift every single keystroke up to the parent, or your entire page will re-render 10 times a second while typing. Keep the typing local.
 */
const SearchBar = ( {onSearch}: ISearchBarProps): ReactElement => {
    const [queryUsername, setUsernameQuery] = useState('');
/**
 * HANDLER: handleSubmit
 * 1. SIGNATURE: Create a function to handle the form submission (takes an event object 'e').
 *       object that is passed to form event handlers in React, such as onSubmit or onChange. In TypeScript, the specific type used for a generic form event object is typically React.FormEvent
 *        e/event - object contains information about the event that just happened
 *              form data is managed by the React state
 * 2. PREVENT DEFAULT: Call 'e.preventDefault()' so the browser doesn't refresh the page.
 *       preventDefault(), which is crucial for handling form submissions without a full page reload
 * 3. VALIDATION: Check if 'username.trim()' is empty. If it is, return early (don't search for nothing).
 *       used to remove whitespace from both the beginning and the end of a string. It returns a new string and does not modify the original string, as JavaScript strings are immutable
 * 4. EXECUTE: Call the 'onSearch(username)' prop function, passing the local state UP to the parent.
 * 5. CLEANUP: Optional - clear the local state back to an empty string.
 */
    // handleSubmit is a Helper Function inside that component. Its only job is to "do something," not "be something." Therefore, its return type must be void.
    const handleSubmit = (event : FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (queryUsername.trim()) {
            onSearch(queryUsername.trim());
        }
    };

    return(
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Enter Github Username ..."
                value={queryUsername}
                // This property of the Event object refers to the specific DOM element that the event originated from. In this case, it refers to the actual <input> element the user is typing into
                // an object representing a specific HTML
                onChange={(event) => setUsernameQuery(event.target.value)}
                style={{ padding: '8px', width: '250px' }}
            />
           <button type="submit" style={{ padding: '8px 16px', marginLeft: '10px' }}>
                Search
            </button> 
        </form>
    );
};
// RETURN: Return JSX. 
// THE TRASH CHECK: Wrap the input and button inside a <form onSubmit={handleSubmit}>. 
// If you just use a <div> and an onClick on the button, the user can't press the "Enter" key on their keyboard to search. That is terrible UX.

export default SearchBar;