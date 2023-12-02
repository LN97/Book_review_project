import axios from 'axios';
import { useAppContext } from '../../../context';
import { useEffect } from 'react';

export default function AddToLibraryButton ({ bookId } ) {

    const { user } = useAppContext();

    var isAddedToLibrary = false;

    useEffect( ( ) => {

    }, [] );

    const handlePostRequest = async () => {
        try {
        // Your Axios POST request configuration goes here
        console.log( user.user._id );
          const response = await axios.post(`http://localhost:5000/api/users/${ user.user._id }/savebook/${ bookId }`, { data: 'your_data' });
          console.log('POST request successful:', response.data);
        } 
        catch (error) {
          console.error('Error during POST request:', error);
        }
      };
    
      const buttonText = isAddedToLibrary ? 'Added to Library' : 'Add to Library';
    
      const buttonStyle = {
        backgroundColor: '#3498db', // Blue background color
        color: '#fff', // White text color
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: isAddedToLibrary ? 'not-allowed' : 'pointer',
      };
    
      return (
        <button style={buttonStyle} onClick={handlePostRequest} disabled={isAddedToLibrary}>
          {buttonText}
        </button>
      );
    };