import React, {useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {useFetchDocument} from '../../hooks/userFetchDocument'

const PostDetails = () =>{
    const navigate = useNavigate()
    const {postId} = useParams()
    const{ document:post, error, loading} = useFetchDocument('posts', postId )

    useEffect(() => {
        //
    }, [post, error, loading])

    const handleGoBack =() =>{
        navigate(-1)
    }

    if(loading){
        return <p>Carregando detalhes do post...</p>
    }

    if(error){
        return <p>Ocorreu um erro no carregamento {error}</p>
    }
    
    if(!post){
        return <p>Nenhum post encontrado com este ID</p>
    }

    return(
        <div>
            <h1>Detalhes do Post</h1>
            <div>
                <img src={post.image} alt={`Imagem de ${post.title}`} />
                <h2>{post.title}</h2>
                <p>Criado por:{post.createdBy}</p>
                <p>Tags: {post.tags.join(', ')}</p>
                <p>Conteúdo: {post.body}</p>
                <button onClick={handleGoBack}>Voltar</button>
            </div>
        </div>
    )
}

export default PostDetails;