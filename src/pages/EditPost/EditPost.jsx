import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useCRUD} from '../../hooks/useCRUD'
import {useNavigate} from 'react-router-dom'

const EditPost = () =>{
    const navigate = useNavigate();
    const {postId} = useParams();
    const {documents, error, loading, updateDocument} = useCRUD('posts');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('')

    useEffect(()=>{
        if(!documents) return;
        const post = documents.find((doc) => doc.id === postId);

        if(post){
            setTitle(post.title || '')
            setImage(post.image || '')
            setBody(post.body ||'')
            setTags((post.tags || []).join(', '))
        }
    }, [documents, postId]);
    const handleUpdate = () =>{
        console.log("Updating post with ID", postId)
        console.log("Title:", title)
        console.log("Image:", image)
        console.log("Body:", body)
        console.log("Tags", tags)

        setFormError('');

        if(!window.confirm('Deseja atualizar o post?')){
            return;
        }
       
        try {
            new URL(image)
        }catch(error){
            setFormError('A imagem precisa ser uma URL.')
            return;
        }

        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

        if(!title || !image || !tags || !body){
            setFormError('Por favor, preencher todos os campos!')
            return;
        }

        updateDocument(postId,{
            title,
            image,
            body,
            tags: tagsArray,
        })
        alert('Post atualizado com sucesso!')
        navigate('/dashboard')
    }

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error:{error}</p>
    }

    return(
        <div>
            <h2>Edit Post</h2>
            <form>
                <label>
                    <span>Título:</span>
                    <input 
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Título da postagem"
                        onChange = {(e)=> setTitle(e.target.value)}
                        value = {title}
                        required/>
                    
                </label>
                <label>
                    <span>URL da imagem</span>
                    <input type="text"
                    name ="image"
                    id="image"
                    placeholder="Endereço da imagem do post"
                    onChange={(e)=> setImage(e.target.value)}
                    value ={image}
                    required />
                </label><label>
                    <span>Conteúdo da Postagem:</span>
                    <textarea
                        name="body"
                        id="body"
                        placeholder="Insira o conteúdo de sua postagem aqui"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        required>
                    </textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        placeholder="Insira suas tags separadas por vírgulas"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                        required />
                </label>
                {!loading && <button type ="button" className="btn" onClick={handleUpdate}>
                    Atualizar Post
                </button>}
                {loading && <button className="btn" disabled> Atualizando...</button>}
                {(error || formError) && <p className='error'>{error || formError}</p>}
            </form>
        </div>
    )
}

export default EditPost;