import styles from './Home.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userFetchDocuments } from '../../hooks/userFetchDocuments';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { documents: posts, error, loading } = userFetchDocuments('posts', searchTerm);

  useEffect(() => {
  }, [posts, error, loading]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Últimas Postagens</h1>
      <div>
        <label>
          Pesquisar por tags:
          <input className='input' type="text" value={searchTerm} onChange={handleSearchChange} />
          <button className='btn'>Pesquisar</button>
        </label>
      </div>
      <div className={styles.home}>
        {loading && <p>Carregando postagens...</p>}
        {error && <p>Ocorreu um erro ao carregar as postagens: {error}</p>}
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <img src={post.image} alt={`Imagem de ${post.title}`} width={'300px'} />
              <h2>{post.title}</h2>
              <p>Criado por: {post.createdBy}</p>
              <p>Tags: # {post.tags.join(",")}</p>
              <button onClick={() => handlePostClick(post.id)}>Ver Detalhes</button>
            </div>
          ))
        ) : (
          <p>Nenhuma postagem disponível.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

