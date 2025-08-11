'use client';
import { useState } from 'react';
import './criar.css';

export default function CriarChamado() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [patrimonio, setPatrimonio] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [tipo, setTipo] = useState('');
  const [resposta, setResposta] = useState('');

  async function chamado() {
    const dados = JSON.stringify({
      titulo,
      descricao,
      patrimonio,
      prioridade,
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
    <div className="p-5">
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
      <>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input input-azul"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="1"
            onChange={(e) => setPrioridade(e.target.value)}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Preventiva
            <i
              className="bi bi-exclamation-triangle-fill ms-2"
              style={{ color: '#417bd5' }}
            />
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input input-verde"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="2"
            onChange={(e) => setPrioridade(e.target.value)}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Sem Urgência
            <i
              className="bi bi-exclamation-triangle-fill ms-2"
              style={{ color: '#4cc78b' }}
            />
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input input-amarelo"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="3"
            onChange={(e) => setPrioridade(e.target.value)}
          />
          <label className="form-check-label" htmlFor="inlineRadio3">
            Prioritária
            <i
              className="bi bi-exclamation-triangle-fill ms-2"
              style={{ color: '#ff9d59' }}
            />
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input input-vermelho"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio4"
            value="4"
            onChange={(e) => setPrioridade(e.target.value)}
          />
          <label className="form-check-label" htmlFor="inlineRadio4">
            Imediata
            <i
              className="bi bi-exclamation-triangle-fill ms-2"
              style={{ color: '#d83d65' }}
            />
          </label>
        </div>
      </>

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