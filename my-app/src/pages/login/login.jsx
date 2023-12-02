import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useAppContext} from '../../context';
import ErrorComponent from '../../reusables/components/errorMsg';


export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAppContext();
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const [ error , setError ] = useState({ msg: '' , hasError: false });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleLogin = () => {
      // Perform login logic here, e.g., calling a login API
      // For simplicity, we'll just call the login function from the context
      login({ username: formData.username, password: formData.password }, ( { didLog , res } ) => {
          if ( didLog ) {
              navigate('/savedbooks')
          } 
          else {
              console.log('error ' , res )
              setError({ hasError: true , msg: res });
          }
      });
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.form}>

          <ErrorComponent state={ error } />

          <label style={styles.label}>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin} style={styles.button}>
            Login
          </button>
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
      
    },
    form: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      maxWidth: '300px',
      width: '100%',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      margin: '10px 0',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '8px',
      margin: '5px 0',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '10px',
      background: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };
  