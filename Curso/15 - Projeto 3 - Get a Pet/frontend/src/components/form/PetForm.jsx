import { useState } from 'react'
import Input from './Input'
import Select from './Select'
import formStyle from './Form.module.css'

function PetForm({handleSubmit, petData, btnText}) {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado']

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: [...e.target.files]})
    }

    function handleChange(e) {
        setPet({...pet, [e.target.name]: [e.target.value]})
    }

    function handleColor(e) {
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(pet)
    }

    return (
        <form onSubmit={submit} className={formStyle.form_container}>
            <div className={formStyle.preview_pet_images}>
                {preview.length > 0
                    ? (
                        preview.map((img, index) => (
                            <img src={URL.createObjectURL(img)} alt={pet.name} key={index} />
                        ))
                    )
                    : (
                        pet.images && (
                            pet.images.map((img, index) => (
                                <img src={`${import.meta.env.VITE_API}/data/pet/${img}`} alt={pet.name} key={index} />
                            ))
                        )
                    )
                }
            </div>
            <Input
                text="Imagens"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome"
                type="text"
                name="name"
                placeholder="Digite o nome do animal de estimação"
                value={pet.name || ''}
                handleOnChange={handleChange}
            />
            <Input
                text="Idade"
                type="text"
                name="age"
                placeholder="Digite a idade do animal de estimação"
                value={pet.age || ''}
                handleOnChange={handleChange}
            />
            <Input
                text="Peso"
                type="number"
                name="weight"
                placeholder="Digite o peso do animal de estimação"
                value={pet.weight || ''}
                handleOnChange={handleChange}
            />
            <Select
                name="Color"
                text="Selecione a cor"
                options={colors}
                value={pet.color || ''}
                handleOnChange={handleColor}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default PetForm