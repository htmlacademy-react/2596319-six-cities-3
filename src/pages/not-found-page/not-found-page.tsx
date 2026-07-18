import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h2>Мы искали запрашиваемую вами страницу вдоль и поперёк, но её не оказалось.</h2>
      <Link to="/">Нажмите сюда для возвращения на главную страницу</Link>
    </div>
  );
}
