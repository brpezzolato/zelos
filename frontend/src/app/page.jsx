'use client';
import { useState } from 'react';

export default function ContactUs() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [patrimonio, setPatrimonio] = useState('');
  const [tipo, setTipo] = useState('');
  const [resposta, setResposta] = useState('');

  async function chamado() {
    const dados = JSON.stringify({
      titulo,
      descricao,
      patrimonio,
      tipo,
    });

    try {
      const response = await fetch('http://localhost:8080/criarchamado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dados,
      });

      const data = await response.json();

      if (response.ok) {
        setResposta(`Resposta: ${data.mensagem}`);
      } else {
        setResposta(`Resposta: ${data.mensagem}`);
      }
    } catch (error) {
      setResposta('Erro:', error);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Patrimônio"
        value={patrimonio}
        onChange={(e) => setPatrimonio(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <br />
      <button onClick={chamado}>Enviar</button>

      {resposta && <h1>{resposta}</h1>}
    </div>
  );
}
