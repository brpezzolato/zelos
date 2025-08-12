'use client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import React from 'react';
import Select from 'react-select';
import './criar.css';
import Button from '@/components/BotaoCriar/BotaoCriar';

const opcoesTipos = [
  { value: '1', label: 'Externo' },
  { value: '2', label: 'Manutenção' },
  { value: '3', label: 'Apoio Técnico' },
  { value: '4', label: 'Limpeza' },
];

export default function CriarChamado() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [patrimonio, setPatrimonio] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [tipo, setTipo] = useState(null);
  const [resposta, setResposta] = useState('');

  async function chamado() {
    if (!titulo || !descricao || !patrimonio || !prioridade || !tipo) {
      return Swal.fire({
        imageUrl: '/error/erro_tomada.png',
        imageWidth: 310,
        imageHeight: 270,
        title: 'Ops...',
        text: `Preencha todos os campos obrigatórios!`,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }

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
        setTitulo('');
        setDescricao('');
        setPatrimonio('');
        setPrioridade('');
        setTipo(null);
      } else {
        Swal.fire({
          imageUrl: '/error/erro_tomada.png',
          imageWidth: 310,
          imageHeight: 270,
          title: 'Ops...',
          text: `${data.mensagem}`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    } catch (error) {
      setResposta('Erro:', error);
    }
  }

  return (
    <>
      <div className="p-5">
        <div className="inputs-criar mb-4">
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Título:
            </label>
            <input
              type="text"
              className="input-criar"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Descrição:
            </label>
            <input
              type="text"
              className="input-criar"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Número do Patrimônio:
            </label>
            <input
              type="text"
              className="input-criar"
              placeholder="Patrimônio"
              value={patrimonio}
              onChange={(e) => setPatrimonio(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Área para resolver o chamado:
            </label>
            <Select
              instanceId="tipo-select"
              classNamePrefix="select-tipo"
              options={opcoesTipos}
              value={
                opcoesTipos.find((option) => option.value === tipo) || null
              }
              onChange={(selected) => setTipo(selected?.value || '')}
              placeholder="Selecione..."
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="exampleInputEmail1" className="form-label mb-1">
              Grau de Prioridade:
            </label>
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
          </div>
        </div>

        <Button funcao={chamado} />

        {resposta && <h1>{resposta}</h1>}
      </div>
    </>
  );
}
