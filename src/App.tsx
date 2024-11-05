
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const { fromLanguage, 
      toLanguage, 
      fromText, 
      setFromText, 
      interChangeLanguages, 
      setFromLanguage, 
      setToLanguage,
      result,
      setResult,
      loading
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 1000)

  useEffect(() => {
    if(debouncedFromText === null) return
    translate({ fromLanguage, toLanguage, text: fromText})
      .then(result => {
        if(result == null) return
        setResult(result)
      })
      .catch(() => setResult('error'))
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage as keyof typeof VOICE_FOR_LANGUAGE]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance) 
  }

  return (
    <Container fluid>
      <h2>Cohere LangChain translate</h2>
      <Row>
        <Col>
          <Stack gap={3}>
            <LanguageSelector 
              type={SectionType.from} 
              value={fromLanguage} 
              onChange={setFromLanguage} 
            />
            <TextArea
              type={SectionType.from}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interChangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
         <Stack gap={3}>
            <LanguageSelector 
              type={SectionType.to} 
              value={toLanguage}  
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.to}
                value={result}
                onChange={setResult}
                loading={loading}
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button
                  variant='link'
                  onClick={handleClipboard}>
                    <ClipboardIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleSpeak}>
                    <SpeakerIcon />
                </Button>
              </div>
              
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
