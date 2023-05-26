import React, { useState } from 'react';
import data from './emojiList.json';
import { TextField, Button } from '@mui/material';
import styles from "../src/App.module.css";

interface ProductProps {
  input: string;
}

interface Emoji {
  symbol: string;
  title: string;
  keywords: string;
}

interface EditableElementProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const EditableElement: React.FC<EditableElementProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onChange(value);
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
}

const first50 = data.slice(0, 50);

function List(props: ProductProps) {
  const [editIndexes, setEditIndexes] = useState<number[]>([]);
  const [editedData, setEditedData] = useState<Emoji[]>(data);
  const filteredData = props.input
    ? editedData.filter((el) => el.keywords.toLowerCase().includes(props.input))
    : first50;

  const handleEditClick = (index: number) => {
    setEditIndexes([...editIndexes, index]);
  };

  const handleSaveClick = (index: number) => {
    const newEditIndexes = editIndexes.filter((editIndex) => editIndex !== index);
    setEditIndexes(newEditIndexes);
  };

  const handleChangeSymbol = (index: number, value: string) => {
    const newData = [...editedData];
    newData[index].symbol = value;
    setEditedData(newData);
  };

  const handleChangeTitle = (index: number, value: string) => {
    const newData = [...editedData];
    newData[index].title = value;
    setEditedData(newData);
  };

  return (
    <ul>
      {filteredData.map((item, index) => (
        <div key={index}>
          <li>
            {editIndexes.includes(index) ? (
              <div>
                <input type="text" value={item.symbol} onChange={(e) => handleChangeSymbol(index, e.target.value)} />
                <input type="text" value={item.title} onChange={(e) => handleChangeTitle(index, e.target.value)} />
                <Button variant="contained" onClick={() => handleSaveClick(index)}>Save</Button>
              </div>
            ) : (
              <div>
                {item.symbol} {item.title}
                <Button variant="contained" onClick={() => handleEditClick(index)}>Edit</Button>
              </div>
            )}
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
      <h1>Emojis Search</h1>
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
  );
}

export default App;


