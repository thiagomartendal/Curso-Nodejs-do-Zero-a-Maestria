import { useState, useEffect } from 'react'
import RoundedImage from '../../components/layout/RoundedImage'
import makeRequest from '../../utils/api'
import style from './Dashboard.module.css'

function MyAdoption() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        (async function() {
            try {
                const res = await makeRequest('/pets/myadoptions', 'GET')
                const data = await res.json()

                if (data && data.pets)
                    setPets(data.pets)
            } catch (error) {
                console.error(error.message)
            }
        })()
    }, [])

    return (
        <section>
            <div className={style.petlist_header}>
                <h1>Minhas Adoções</h1>
            </div>
            <div className={style.petlist_container}>
                {pets.length > 0 &&
                    pets.map(pet => (
                        <div className={style.petlist_row} key={pet._id}>
                            <RoundedImage src={`${import.meta.env.VITE_API}/data/pet/${pet.images[0]}`} alt={pet.name} width="px75" />
                            <span className="bold">{pet.name}</span>
                            <div className={style.contacts}>
                                <p>
                                    <span className="bold">Ligue para:</span> {pet.user.name} - {pet.user.phone}
                                </p>
                            </div>
                            <div className={style.actions}>
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Animal adotado</p>
                                )}
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 && <p>Ainda não foram feitas adoções.</p>}
            </div>
        </section>
    )
}

export default MyAdoption