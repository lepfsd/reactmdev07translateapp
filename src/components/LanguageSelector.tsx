import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import {type FromLanguage, type Language, SectionType } from '../types.d'

type Props = 
    | { type: SectionType.from, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.to, value: Language, onChange: (language: Language) => void }
export const LanguageSelector = ({onChange, type, value}: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }
    return (
        <Form.Select aria-label="selecciona el idioma" onChange={handleChange} value={value}>
            {type === SectionType.from && 
                <option value={AUTO_LANGUAGE}>Auto</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
    )
}