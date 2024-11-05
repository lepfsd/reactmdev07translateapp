import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Props {
    type: SectionType
    loading?: boolean,
    onChange: (value: string) => void
    value: string
}
const getPlaceholder = ({type, loading}: {type:SectionType, loading?: boolean}) => {
    if( type === SectionType.from ) return 'introducir texto'
    if( loading === true) return 'cargando...'
    return 'traduccion'
}
const commonStyles = { border: 0, height: '200px' }
export const TextArea = ({loading, type, value, onChange}: Props) => {
    const styles = type === SectionType.from 
        ? commonStyles 
        : { ...commonStyles, backgroundColor: '#f5f5f5' }
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }
    return (
        <Form.Control
            autoFocus={type === SectionType.from}
            as='textarea'
            placeholder={getPlaceholder({type, loading})}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}