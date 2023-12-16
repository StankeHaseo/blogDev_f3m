import React from "react"
import { useCRUD } from "../../hooks/useCRUD"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const {documents, error, loading, addDocument, updateDocument, deleteDocument } = useCRUD('posts');
  const navigate = useNavigate();

  const handlePostClick = (postId) =>{
    navigate(`/posts/${postId}`);
  }

  const handleEditClick = (docId) =>{
    navigate(`/edit-post/${docId}`)
  }

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>Error: {erro}</p>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {documents &&
          documents.map((doc) =>(
            <li key = {doc.id}>
              {doc.title} - {doc.content}
              <button onClick={() => handlePostClick(doc.id)}>Detalhes</button>
              <button onClick={() => handleEditClick(doc.id)}>
                Editar
              </button>
              <button onClick ={() => deleteDocument(doc.id)}>Excluir</button>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard