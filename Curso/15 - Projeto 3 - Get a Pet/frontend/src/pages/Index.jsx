import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import makeRequest from '../utils/api'
import style from './Index.module.css'

function Index() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        (async function() {
            try {
                const res = await makeRequest('/pets', 'GET')
                const data = await res.json()
                if (data)
                    setPets(data.pets)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <section>
            <div className={style.pet_home_header}>
                <h1>Adote um Animal de Estimação</h1>
            </div>
            <div className={style.pet_container}>
                {pets.length > 0 &&
                    pets.map((pet, index) => (
                        <div className={style.pet_card} key={index}>
                            <div className={style.pet_card_image} style={{backgroundImage: `url(${import.meta.env.VITE_API}/data/pet/${pet.images[0]})`}}></div>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className="bold">Peso:</span> {pet.weight}kg
                            </p>
                            {pet.available ? 
                                <Link to={'pet/' + pet._id.toString()}>Mais detalhes</Link>
                             :
                                <p className={style.adopted_text}>Adotado</p>
                            }
                        </div>
                    ))
                }
                {pets.length == 0 &&
                    <p>Não há animais de estimação disponíveis para doação.</p>
                }
            </div>
        </section>
    )
}

export default Index