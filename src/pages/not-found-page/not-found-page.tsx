import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h2 style={{
        marginTop: '40px',
        textAlign: 'center',
        fontSize: '76px'
      }}
      >404
      </h2>
      <Link style={{
        display: 'block',
        textAlign: 'center',
        color: 'blue'
      }} to="/"
      >Нажмите сюда для возвращения на главную страницу
      </Link>
    </div>
  );
}
