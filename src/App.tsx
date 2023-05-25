import React, { useState } from 'react';
import data from './emojiList.json';
import { TextField, Button, Checkbox } from '@mui/material';
import styles from "../src/App.module.css";

interface ProductProps {
  input: string;
}

interface EditableElementProps {
  initialValue: string;
}

const EditableElement: React.FC<EditableElementProps> = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Add code here to save the changes
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  if (isEditing) {
    return (
      <div>
        <input type="text" value={value} onChange={handleChange} />
        <Button variant="contained" onClick={handleSaveClick}>Save</Button>
      </div>
    );
  }

  return (
    <div>
      <span>{value}</span>
      <Button variant="contained" onClick={handleEditClick}>Edit</Button>
    </div>
  );
};

const first50 = data.slice(0, 50);

function List(props: ProductProps) {
  const filteredData = props.input ? data.filter((el) => el.title.toLowerCase().includes(props.input)) : first50;
  return (
    <ul>
      {filteredData.map((item, index) => (
        <div key={index}>
          <li>
            <EditableElement initialValue={item.symbol} />
            <EditableElement initialValue={item.title} />
          </li>
        </div>
      ))}
    </ul>
  );
}

function App() {
  const [inputText, setInputText] = useState('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  return (
    <div className={styles.main}>
      <h1>Emojies Search</h1>
      <div className={styles.search}>
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
       
      </div>
      <List input={inputText} />
    </div>
  )
}

export default App;
