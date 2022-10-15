import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';

function App() {
  const [id, setId] = useState(0);

  useEffect(() => {
    Axios.get('http://127.0.0.1:3001/').then((response) => {
      setId(response.data[response.data.length - 1]['Personid']);
      //setCategoryList(response.data);
    });
  }, []);

  function pressButton() {
    setId(id + 1);
    Axios.post('http://127.0.0.1:3001/insert', { body: { lastName: 'Flintstone' } }).then(
      (response) => {
        console.log(id);
      },
    );
  }

  return (
    <div className="App">
      <h1>管理画面</h1>
      <div>
        <div>
          <Link to="/">患者検索</Link>
        </div>
        <div>
          <Link to="/">患者初期登録</Link>
        </div>
        <div>
          <Link to="/">カルテ作成</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
