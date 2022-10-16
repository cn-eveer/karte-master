import * as React from 'react';
import image from './logo192.png';

export default function Profile(data) {
  const [userValues, setUserValues] = React.useState({
    user_id: 0,
    name: '',
    furigana: '',
    sex: '',
    age: '',
    birthdate: '',
  });

  React.useEffect(() => {
    setUserValues(data.values);
  }, [data]);

  const formatData = (data) => {
    return data !== undefined || data !== null ? data.split('T')[0] : '-';
  };

  return (
    <div className="profile" style={{ paddingTop: 15, minHeight: '70%' }}>
      <div className="profile__name">
        <div className="profile__name__read">{userValues.furigana}</div>
        <div className="profile__name__proper">
          <h2>{userValues.name}</h2>
        </div>
      </div>
      <div className="profile__avatar">
        <img src={image} alt="avatar_image" />
      </div>
      <div className="profile__info">
        <div className="profile__info__title">
          <h3>基本情報</h3>
        </div>
        <div className="profile__info__details" style={{ padding: 15 }}>
          <div className="profile__info__details__gender">性別:{userValues.sex}</div>
          <div className="profile__info__details__age">年齢: {userValues.age} 歳</div>
          <div className="profile__info__details__age">
            生年月日:{formatData(userValues.birthdate)}
          </div>
        </div>
      </div>
    </div>
  );
}
