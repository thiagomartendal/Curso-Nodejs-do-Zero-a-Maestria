import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import useMessage from '../../hooks/useMessage'
import makeRequest from '../../utils/api'
import Context from '../../context/Context'
import style from './PetDetail.module.css'

function PetDetail() {
    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setMessage} = useMessage()
    const {authenticated} = useContext(Context)

    useEffect(() => {
        (async function() {
            const res = await makeRequest('/pets/' + id.toString(), 'GET')
            const data = await res.json()

            if (data) {
                setPet(data.pet)
            }
        })()
    }, [id])

    const schedule = async () => {
        let msg = ''
        let type = 'success'

        try {
            const res = await makeRequest('/pets/schedule/' + pet._id.toString(), 'PATCH')
            const data = await res.json()

            if (data) {
                msg = data.message
                if (res.status != 200 && res.status != 201)
                    type = 'error'
            }
        } catch (error) {
            msg = error.message
            type = 'error'
        }

        setMessage(msg, type)
    }

    return (
        <>
            {pet.name && (
                <section className={style.pet_details_container}>
                    <div className={style.pet_details_header}>
                        <h1>{pet.name}</h1>
                    </div>
                    <div className={style.pet_images}>
                        {pet.images.map((img, index) => (
                            <img src={`${import.meta.env.VITE_API}/data/pet/${img}`} alt={pet.name} key={index} />
                        ))}
                    </div>
                    <p>
                        <span className="bold">Peso:</span> {pet.weight}kg
                    </p>
                    <p>
                        <span className="bold">Idade:</span> {pet.age} ano{pet.age > 1 && `s`}.
                    </p>
                    {authenticated.auth ? (
                        pet.user._id === authenticated.userId ? (
                            <p>Você cadastrou este animal.</p>
                        ) : (
                            <button onClick={schedule}>Solicitar Visita</button>
                        )
                    ) : (
                        <p>
                            Você precisa estar conectado em <Link to="/login">sua conta</Link> para agendar uma visita.
                        </p>
                    )}
                </section>
            )}
        </>
    )
}

export default PetDetail