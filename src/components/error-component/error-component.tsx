import { memo } from 'react';
import { Link } from 'react-router-dom';

function ErrorComponent() {
  return (
    <div>
      <h2 style={{
        marginTop: '40px',
        textAlign: 'center',
        fontSize: '76px'
      }}
      >Сервер временно недоступен. Вернитесь сюда позже
      </h2>
      <Link style={{
        display: 'block',
        textAlign: 'center',
        color: 'blue'
      }} to="/"
      >Нажмите сюда для перехода на главную страницу
      </Link>
    </div>
  );
}

const MemoizedErrorComponent = memo(ErrorComponent);
export default MemoizedErrorComponent;
